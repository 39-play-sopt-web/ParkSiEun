import { createPortal } from 'react-dom';
import { Backdrop, ModalBox, Message, Time, ConfirmButton } from './ResultModal.styles';

const ResultModal = ({level, time, onClose}) => {
    return createPortal(
        <Backdrop>
            <ModalBox>
                <Message>🎉 Level {level} 클리어!</Message>
                <Time>{time.toFixed(2)}초</Time>
                <ConfirmButton onClick={onClose}>확인</ConfirmButton>
            </ModalBox>
        </Backdrop>,
        document.body
    );
}

export default ResultModal;