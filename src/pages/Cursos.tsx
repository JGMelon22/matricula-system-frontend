import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardText, CardTitle, Col, Row, Spinner, Alert } from 'reactstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import type { Curso } from '../types';
import { cursoService } from '../services/cursoService';
import CursoModal from '../components/CursoModal';
import ErrorModal from '../components/ErrorModal';
import ConfirmModal from '../components/ConfirmModal';

const Cursos = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [cursoToDelete, setCursoToDelete] = useState<string | null>(null);

    useEffect(() => {
        loadCursos();
    }, []);

    const loadCursos = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await cursoService.getAll();
            setCursos(data);
        } catch (err: any) {
            setError('Erro ao carregar cursos. Verifique se a API está rodando.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setCursoToDelete(id);
        setConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!cursoToDelete) return;

        try {
            await cursoService.delete(cursoToDelete);
            loadCursos();
        } catch (err: any) {
            const errorMsg = 'Erro ao excluir curso: ' + (err.response?.data?.message || err.message);
            setErrorMessage(errorMsg);
            setErrorModalOpen(true);
        }
    };

    const handleOpenCreate = () => {
        setSelectedCurso(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (curso: Curso) => {
        setSelectedCurso(curso);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCurso(null);
    };

    const handleSuccess = () => {
        loadCursos();
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner color="primary" />
                <p className="mt-2">Carregando cursos...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Cursos</h2>
                <Button color="success" onClick={handleOpenCreate}>
                    <FaPlus className="me-2" />
                    Novo Curso
                </Button>
            </div>

            {error && <Alert color="danger">{error}</Alert>}

            {cursos.length === 0 ? (
                <Alert color="info">Nenhum curso cadastrado ainda.</Alert>
            ) : (
                <Row>
                    {cursos.map((curso) => (
                        <Col md={6} lg={4} key={curso.id} className="mb-3">
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">{curso.nome}</CardTitle>
                                    <CardText>{curso.descricao}</CardText>
                                    <div className="d-flex gap-2">
                                        <Button
                                            size="sm"
                                            color="primary"
                                            onClick={() => handleOpenEdit(curso)}
                                        >
                                            <FaEdit className="me-1" />
                                            Editar
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="danger"
                                            onClick={() => handleDelete(curso.id)}
                                        >
                                            <FaTrash className="me-1" />
                                            Excluir
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <CursoModal
                isOpen={modalOpen}
                toggle={handleCloseModal}
                curso={selectedCurso}
                onSuccess={handleSuccess}
            />

            <ErrorModal
                isOpen={errorModalOpen}
                toggle={() => setErrorModalOpen(false)}
                message={errorMessage}
            />

            <ConfirmModal
                isOpen={confirmModalOpen}
                toggle={() => setConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                message="Tem certeza que deseja excluir este curso?"
                confirmText="Excluir"
            />
        </div>
    );
};

export default Cursos;