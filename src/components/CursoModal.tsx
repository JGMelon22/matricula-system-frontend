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
import type { Curso, CursoRequest } from '../types';
import { cursoService } from '../services/cursoService';

interface CursoModalProps {
    isOpen: boolean;
    toggle: () => void;
    curso?: Curso | null;
    onSuccess: () => void;
}

const CursoModal = ({ isOpen, toggle, curso, onSuccess }: CursoModalProps) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [errors, setErrors] = useState<{ nome?: string; descricao?: string }>({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const isEditing = !!curso;

    // Preencher form quando for edição
    useEffect(() => {
        if (curso) {
            setNome(curso.nome);
            setDescricao(curso.descricao);
        } else {
            setNome('');
            setDescricao('');
        }
        setErrors({});
        setApiError('');
    }, [curso, isOpen]);

    const validate = (): boolean => {
        const newErrors: { nome?: string; descricao?: string } = {};

        if (!nome || nome.trim().length < 3) {
            newErrors.nome = 'O nome deve ter no mínimo 3 caracteres';
        } else if (nome.length > 200) {
            newErrors.nome = 'O nome deve ter no máximo 200 caracteres';
        }

        if (!descricao || descricao.trim().length < 10) {
            newErrors.descricao = 'A descrição deve ter no mínimo 10 caracteres';
        } else if (descricao.length > 1000) {
            newErrors.descricao = 'A descrição deve ter no máximo 1000 caracteres';
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

            if (isEditing) {
                const data: CursoRequest = { nome: nome.trim(), descricao: descricao.trim() };
                await cursoService.update(curso!.id, data);
            } else {
                const data: CursoRequest = { nome: nome.trim(), descricao: descricao.trim() };
                await cursoService.create(data);
            }

            onSuccess();
            toggle();
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Erro ao salvar curso';
            setApiError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader toggle={toggle}>
                    {isEditing ? 'Editar Curso' : 'Novo Curso'}
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
                        <Label for="descricao">Descrição *</Label>
                        <Input
                            id="descricao"
                            name="descricao"
                            type="textarea"
                            rows={4}
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            invalid={!!errors.descricao}
                            disabled={loading}
                        />
                        {errors.descricao && <FormFeedback>{errors.descricao}</FormFeedback>}
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

export default CursoModal;