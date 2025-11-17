import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Spinner,
    Alert,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { FaPlus, FaTrash, FaUserGraduate } from 'react-icons/fa';
import type { Aluno, Curso } from '../types';
import { cursoService } from '../services/cursoService';
import { alunoService } from '../services/alunoService';
import { matriculaService } from '../services/matriculaService';
import ErrorModal from '../components/ErrorModal';
import ConfirmModal from '../components/ConfirmModal';

const Matriculas = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
    const [alunosDoCurso, setAlunosDoCurso] = useState<Aluno[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingAlunos, setLoadingAlunos] = useState(false);
    const [error, setError] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAlunoId, setSelectedAlunoId] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [alunoToRemove, setAlunoToRemove] = useState<string | null>(null);
    const [validationErrorOpen, setValidationErrorOpen] = useState(false);

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (selectedCurso) {
            loadAlunosDoCurso(selectedCurso.id);
        }
    }, [selectedCurso]);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            setError('');
            const [cursosData, alunosData] = await Promise.all([
                cursoService.getAll(),
                alunoService.getAll()
            ]);
            setCursos(cursosData);
            setAlunos(alunosData);

            if (cursosData.length > 0) {
                setSelectedCurso(cursosData[0]);
            }
        } catch (err: any) {
            setError('Erro ao carregar dados. Verifique se a API está rodando.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadAlunosDoCurso = async (cursoId: string) => {
        try {
            setLoadingAlunos(true);
            const data = await matriculaService.getAlunosByCurso(cursoId);
            setAlunosDoCurso(data);
        } catch (err: any) {
            console.error('Erro ao carregar alunos do curso:', err);
            setAlunosDoCurso([]);
        } finally {
            setLoadingAlunos(false);
        }
    };

    const handleOpenModal = () => {
        setSelectedAlunoId('');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedAlunoId('');
    };

    const handleMatricular = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedAlunoId || !selectedCurso) {
            setErrorMessage('Selecione um aluno');
            setValidationErrorOpen(true);
            return;
        }

        try {
            setSubmitting(true);
            await matriculaService.create({
                alunoId: selectedAlunoId,
                cursoId: selectedCurso.id
            });

            handleCloseModal();
            loadAlunosDoCurso(selectedCurso.id);
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || err.message || 'Erro ao matricular aluno';
            setErrorMessage(errorMsg);
            setErrorModalOpen(true);
        } finally {
            setSubmitting(false);
        }
    };

    const handleRemoverMatricula = async (alunoId: string) => {
        if (!selectedCurso) return;

        setAlunoToRemove(alunoId);
        setConfirmModalOpen(true);
    };

    const confirmRemoveMatricula = async () => {
        if (!alunoToRemove || !selectedCurso) return;

        try {
            await matriculaService.remove({
                alunoId: alunoToRemove,
                cursoId: selectedCurso.id
            });
            loadAlunosDoCurso(selectedCurso.id);
        } catch (err: any) {
            const errorMsg = 'Erro ao remover matrícula: ' + (err.response?.data?.message || err.message);
            setErrorMessage(errorMsg);
            setErrorModalOpen(true);
        }
    };

    // Filtrar alunos que NÃO estão matriculados no curso selecionado
    const alunosDisponiveis = alunos.filter(
        aluno => !alunosDoCurso.some(a => a.id === aluno.id)
    );

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner color="primary" />
                <p className="mt-2">Carregando...</p>
            </div>
        );
    }

    if (cursos.length === 0) {
        return (
            <Alert color="warning">
                Nenhum curso cadastrado. Por favor, cadastre cursos primeiro.
            </Alert>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Matrículas</h2>
            </div>

            {error && <Alert color="danger">{error}</Alert>}

            <Row>
                {/* Lista de Cursos */}
                <Col md={4}>
                    <h5>Cursos</h5>
                    <ListGroup>
                        {cursos.map((curso) => (
                            <ListGroupItem
                                key={curso.id}
                                active={selectedCurso?.id === curso.id}
                                onClick={() => setSelectedCurso(curso)}
                                style={{ cursor: 'pointer' }}
                                tag="button"
                                action
                            >
                                {curso.nome}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>

                {/* Alunos Matriculados no Curso Selecionado */}
                <Col md={8}>
                    {selectedCurso && (
                        <Card>
                            <CardBody>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5>{selectedCurso.nome}</h5>
                                    <Button
                                        color="success"
                                        size="sm"
                                        onClick={handleOpenModal}
                                        disabled={alunosDisponiveis.length === 0}
                                    >
                                        <FaPlus className="me-2" />
                                        Matricular Aluno
                                    </Button>
                                </div>
                                <p className="text-muted">{selectedCurso.descricao}</p>

                                <hr />

                                <h6 className="mb-3">
                                    <FaUserGraduate className="me-2" />
                                    Alunos Matriculados ({alunosDoCurso.length})
                                </h6>

                                {loadingAlunos ? (
                                    <div className="text-center">
                                        <Spinner size="sm" />
                                    </div>
                                ) : alunosDoCurso.length === 0 ? (
                                    <Alert color="info">Nenhum aluno matriculado neste curso.</Alert>
                                ) : (
                                    <ListGroup>
                                        {alunosDoCurso.map((aluno) => (
                                            <ListGroupItem key={aluno.id} className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong>{aluno.nome}</strong>
                                                    <br />
                                                    <small className="text-muted">{aluno.email}</small>
                                                </div>
                                                <Button
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => handleRemoverMatricula(aluno.id)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                )}
                            </CardBody>
                        </Card>
                    )}
                </Col>
            </Row>

            {/* Modal para Matricular Aluno */}
            <Modal isOpen={modalOpen} toggle={handleCloseModal}>
                <Form onSubmit={handleMatricular}>
                    <ModalHeader toggle={handleCloseModal}>
                        Matricular Aluno em {selectedCurso?.nome}
                    </ModalHeader>
                    <ModalBody>
                        {alunosDisponiveis.length === 0 ? (
                            <Alert color="warning">
                                Todos os alunos já estão matriculados neste curso ou não há alunos cadastrados.
                            </Alert>
                        ) : (
                            <FormGroup>
                                <Label for="aluno">Selecione o Aluno *</Label>
                                <Input
                                    id="aluno"
                                    name="aluno"
                                    type="select"
                                    value={selectedAlunoId}
                                    onChange={(e) => setSelectedAlunoId(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {alunosDisponiveis.map((aluno) => (
                                        <option key={aluno.id} value={aluno.id}>
                                            {aluno.nome} - {aluno.email}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={handleCloseModal} disabled={submitting}>
                            Cancelar
                        </Button>
                        {alunosDisponiveis.length > 0 && (
                            <Button color="primary" type="submit" disabled={submitting}>
                                {submitting ? <Spinner size="sm" /> : 'Matricular'}
                            </Button>
                        )}
                    </ModalFooter>
                </Form>
            </Modal>

            <ErrorModal
                isOpen={errorModalOpen}
                toggle={() => setErrorModalOpen(false)}
                message={errorMessage}
            />

            <ErrorModal
                isOpen={validationErrorOpen}
                toggle={() => setValidationErrorOpen(false)}
                title="Validação"
                message={errorMessage}
            />

            <ConfirmModal
                isOpen={confirmModalOpen}
                toggle={() => setConfirmModalOpen(false)}
                onConfirm={confirmRemoveMatricula}
                message="Tem certeza que deseja remover esta matrícula?"
                confirmText="Remover"
            />
        </div>
    );
};

export default Matriculas;