import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col, Spinner, Alert } from 'reactstrap';
import { FaGraduationCap, FaUserGraduate, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { cursoService } from '../services/cursoService';
import { alunoService } from '../services/alunoService';

const Home = () => {
    const [stats, setStats] = useState({
        totalCursos: 0,
        totalAlunos: 0,
        totalAlunosMatriculados: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            setError('');

            const [cursos, alunos, alunosMatriculados] = await Promise.all([
                cursoService.getAll(),
                alunoService.getAll(),
                alunoService.getMatriculados()
            ]);

            setStats({
                totalCursos: cursos.length,
                totalAlunos: alunos.length,
                totalAlunosMatriculados: alunosMatriculados.length
            });
        } catch (err: any) {
            setError('Erro ao carregar estatísticas. Verifique se a API está rodando.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner color="primary" />
                <p className="mt-2">Carregando...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="text-center mb-5">
                <h1 className="display-4">
                    <FaGraduationCap className="me-3" />
                    Sistema de Gerenciamento de Matrículas
                </h1>
                <p className="lead text-muted">
                    Gerencie cursos, alunos e matrículas de forma simples e eficiente
                </p>
            </div>

            {error && <Alert color="danger">{error}</Alert>}

            <Row className="mb-4">
                <Col md={4}>
                    <Card className="text-center shadow-sm" tag={Link} to="/cursos" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <CardBody>
                            <FaClipboardList size={48} className="text-primary mb-3" />
                            <CardTitle tag="h3">{stats.totalCursos}</CardTitle>
                            <CardText className="text-muted">Cursos Cadastrados</CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="text-center shadow-sm" tag={Link} to="/alunos" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <CardBody>
                            <FaUserGraduate size={48} className="text-success mb-3" />
                            <CardTitle tag="h3">{stats.totalAlunos}</CardTitle>
                            <CardText className="text-muted">Alunos Cadastrados</CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="text-center shadow-sm" tag={Link} to="/matriculas" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <CardBody>
                            <FaGraduationCap size={48} className="text-info mb-3" />
                            <CardTitle tag="h3">{stats.totalAlunosMatriculados}</CardTitle>
                            <CardText className="text-muted">Alunos Matriculados</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <CardBody>
                            <CardTitle tag="h5">Como Usar</CardTitle>
                            <CardText>
                                <ol>
                                    <li><strong>Cursos:</strong> Cadastre os cursos disponíveis na instituição</li>
                                    <li><strong>Alunos:</strong> Cadastre os alunos (apenas maiores de 18 anos)</li>
                                    <li><strong>Matrículas:</strong> Matricule os alunos nos cursos desejados</li>
                                </ol>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Home;