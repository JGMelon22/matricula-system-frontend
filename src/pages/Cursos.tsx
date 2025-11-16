import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardText, CardTitle, Col, Row, Spinner, Alert } from 'reactstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import type { Curso } from '../types';
import { cursoService } from '../services/cursoService';
import CursoModal from '../components/CursoModal';

const Cursos = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);

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
        if (!window.confirm('Tem certeza que deseja excluir este curso?')) {
            return;
        }

        try {
            await cursoService.delete(id);
            loadCursos();
        } catch (err: any) {
            alert('Erro ao excluir curso: ' + (err.response?.data?.message || err.message));
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
        </div>
    );
};

export default Cursos;