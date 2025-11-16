import { useEffect, useState } from 'react';
import { Button, Table, Spinner, Alert } from 'reactstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import type { Aluno } from '../types';
import { alunoService } from '../services/alunoService';
import AlunoModal from '../components/AlunoModal';
import { format } from 'date-fns';

const Alunos = () => {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
    const [showOnlyMatriculados, setShowOnlyMatriculados] = useState(false);

    useEffect(() => {
        loadAlunos();
    }, [showOnlyMatriculados]);

    const loadAlunos = async () => {
        try {
            setLoading(true);
            setError('');
            const data = showOnlyMatriculados
                ? await alunoService.getMatriculados()
                : await alunoService.getAll();
            setAlunos(data);
        } catch (err: any) {
            setError('Erro ao carregar alunos. Verifique se a API está rodando.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Tem certeza que deseja excluir este aluno?')) {
            return;
        }

        try {
            await alunoService.delete(id);
            loadAlunos();
        } catch (err: any) {
            alert('Erro ao excluir aluno: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleOpenCreate = () => {
        setSelectedAluno(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (aluno: Aluno) => {
        setSelectedAluno(aluno);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedAluno(null);
    };

    const handleSuccess = () => {
        loadAlunos();
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner color="primary" />
                <p className="mt-2">Carregando alunos...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Alunos</h2>
                <div className="d-flex gap-2">
                    <Button
                        color={showOnlyMatriculados ? 'secondary' : 'info'}
                        outline={!showOnlyMatriculados}
                        onClick={() => setShowOnlyMatriculados(!showOnlyMatriculados)}
                    >
                        {showOnlyMatriculados ? 'Mostrar Todos' : 'Apenas Matriculados'}
                    </Button>
                    <Button color="success" onClick={handleOpenCreate}>
                        <FaPlus className="me-2" />
                        Novo Aluno
                    </Button>
                </div>
            </div>

            {error && <Alert color="danger">{error}</Alert>}

            {alunos.length === 0 ? (
                <Alert color="info">
                    {showOnlyMatriculados
                        ? 'Nenhum aluno matriculado ainda.'
                        : 'Nenhum aluno cadastrado ainda.'}
                </Alert>
            ) : (
                <Table responsive striped hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Data de Nascimento</th>
                            <th>Cadastrado em</th>
                            <th className="text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>{formatDate(aluno.dataNascimento)}</td>
                                <td>{formatDate(aluno.createdAt)}</td>
                                <td className="text-end">
                                    <Button
                                        size="sm"
                                        color="primary"
                                        className="me-2"
                                        onClick={() => handleOpenEdit(aluno)}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="danger"
                                        onClick={() => handleDelete(aluno.id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <AlunoModal
                isOpen={modalOpen}
                toggle={handleCloseModal}
                aluno={selectedAluno}
                onSuccess={handleSuccess}
            />
        </div>
    );
};

export default Alunos;