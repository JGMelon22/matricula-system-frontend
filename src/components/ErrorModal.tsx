import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorModalProps {
    isOpen: boolean;
    toggle: () => void;
    title?: string;
    message: string;
}

const ErrorModal = ({ isOpen, toggle, title = 'Erro', message }: ErrorModalProps) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                <FaExclamationTriangle className="me-2 text-danger" />
                {title}
            </ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>
                    Fechar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ErrorModal;
