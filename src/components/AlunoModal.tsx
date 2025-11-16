
import { useState, useEffect } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Spinner
} from 'reactstrap';
import type { Aluno, AlunoRequest } from '../types';
import { alunoService } from '../services/alunoService';
import { format } from 'date-fns';

interface AlunoModalProps {
    isOpen: boolean;
    toggle: () => void;
    aluno?: Aluno | null;
    onSuccess: () => void;
}

const AlunoModal = ({ isOpen, toggle, aluno, onSuccess }: AlunoModalProps) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [errors, setErrors] = useState<{ nome?: string; email?: string; dataNascimento?: string }>({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const isEditing = !!aluno;

    useEffect(() => {
        if (aluno) {
            setNome(aluno.nome);
            setEmail(aluno.email);
            const date = new Date(aluno.dataNascimento);
            setDataNascimento(format(date, 'yyyy-MM-dd'));
        } else {
            setNome('');
            setEmail('');
            setDataNascimento('');
        }
        setErrors({});
        setApiError('');
    }, [aluno, isOpen]);

    const validate = (): boolean => {
        const newErrors: { nome?: string; email?: string; dataNascimento?: string } = {};

        // Validar nome
        if (!nome || nome.trim().length < 3) {
            newErrors.nome = 'O nome deve ter no mínimo 3 caracteres';
        } else if (nome.length > 200) {
            newErrors.nome = 'O nome deve ter no máximo 200 caracteres';
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            newErrors.email = 'E-mail inválido';
        } else if (email.length > 100) {
            newErrors.email = 'O e-mail deve ter no máximo 100 caracteres';
        }

        // Validar data de nascimento e maioridade
        if (!dataNascimento) {
            newErrors.dataNascimento = 'A data de nascimento é obrigatória';
        } else {
            const hoje = new Date();
            const nascimento = new Date(dataNascimento);
            let idade = hoje.getFullYear() - nascimento.getFullYear();
            const mes = hoje.getMonth() - nascimento.getMonth();

            if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
                idade--;
            }

            if (idade < 18) {
                newErrors.dataNascimento = 'O aluno deve ter no mínimo 18 anos';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);
            setApiError('');

            const dataISO = new Date(dataNascimento).toISOString();

            if (isEditing) {
                const data: AlunoRequest = {
                    nome: nome.trim(),
                    email: email.trim(),
                    dataNascimento: dataISO
                };
                await alunoService.update(aluno!.id, data);
            } else {
                const data: AlunoRequest = {
                    nome: nome.trim(),
                    email: email.trim(),
                    dataNascimento: dataISO
                };
                await alunoService.create(data);
            }

            onSuccess();
            toggle();
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Erro ao salvar aluno';
            setApiError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader toggle={toggle}>
                    {isEditing ? 'Editar Aluno' : 'Novo Aluno'}
                </ModalHeader>
                <ModalBody>
                    {apiError && (
                        <div className="alert alert-danger">{apiError}</div>
                    )}

                    <FormGroup>
                        <Label for="nome">Nome *</Label>
                        <Input
                            id="nome"
                            name="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            invalid={!!errors.nome}
                            disabled={loading}
                        />
                        {errors.nome && <FormFeedback>{errors.nome}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">E-mail *</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            invalid={!!errors.email}
                            disabled={loading}
                        />
                        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="dataNascimento">Data de Nascimento *</Label>
                        <Input
                            id="dataNascimento"
                            name="dataNascimento"
                            type="date"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            invalid={!!errors.dataNascimento}
                            disabled={loading}
                        />
                        {errors.dataNascimento && <FormFeedback>{errors.dataNascimento}</FormFeedback>}
                        <small className="text-muted">O aluno deve ter no mínimo 18 anos</small>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button color="primary" type="submit" disabled={loading}>
                        {loading ? <Spinner size="sm" /> : (isEditing ? 'Salvar' : 'Criar')}
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default AlunoModal;