import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardText, CardTitle, Col, Row, Spinner, Alert } from 'reactstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import type { Curso, PaginatedResponse } from '../types';
import { cursoService } from '../services/cursoService';
import CursoModal from '../components/CursoModal';
import ErrorModal from '../components/ErrorModal';
import ConfirmModal from '../components/ConfirmModal';
import PaginationComponent from '../components/PaginationComponent';

const Cursos = () => {
    const [paginatedData, setPaginatedData] = useState<PaginatedResponse<Curso> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [cursoToDelete, setCursoToDelete] = useState<string | null>(null);

    const pageSize = 9;

    useEffect(() => {
        loadCursos();
    }, [currentPage]);

    const loadCursos = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await cursoService.getAll(currentPage, pageSize);
            setPaginatedData(data);
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

            // Se deletar o último item da página e não for a primeira página, voltar
            if (paginatedData && paginatedData.data.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner color="primary" />
                <p className="mt-2">Carregando cursos...</p>
            </div>
        );
    }

    const cursos = paginatedData?.data || [];

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
                <>
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

                    {/* Paginacao */}
                    {paginatedData && paginatedData.totalPages > 1 && (
                        <div className='d-flex justify-content-between align-items-center mt-4'>
                            <div className='text-muted'>
                                Mostrando {cursos.length} de {paginatedData.totalRecords} cursos
                            </div>

                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={paginatedData.totalPages}
                                onPageChange={handlePageChange}>

                            </PaginationComponent>
                        </div>
                    )}
                </>
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