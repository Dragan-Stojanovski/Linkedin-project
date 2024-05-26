import BaseButton from "../../../../../../../components/base-ui/base-button";
import styles from './ConfirmationWindow.module.css';
interface IConfirmationWindow {
    onClick:() => void;
    onModalClose: () => void;
}

const ConfirmationWindow = ({onClick, onModalClose}:IConfirmationWindow ):JSX.Element => {
    return(
    <div className={styles.confirmation_form__wrapper}>
    <h3>Are you Sure?</h3>
        <BaseButton type="button" content="Yes" onClick={onClick}/>
        <BaseButton type="button" content="No" onClick={onModalClose}/>
    </div>)
}

export default ConfirmationWindow;