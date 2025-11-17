import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FaQuestionCircle } from 'react-icons/fa';

interface ConfirmModalProps {
    isOpen: boolean;
    toggle: () => void;
    onConfirm: () => void;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: string;
}

const ConfirmModal = ({
    isOpen,
    toggle,
    onConfirm,
    title = 'Confirmar',
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    confirmColor = 'danger'
}: ConfirmModalProps) => {
    const handleConfirm = () => {
        onConfirm();
        toggle();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                <FaQuestionCircle className="me-2 text-warning" />
                {title}
            </ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    {cancelText}
                </Button>
                <Button color={confirmColor} onClick={handleConfirm}>
                    {confirmText}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmModal;
