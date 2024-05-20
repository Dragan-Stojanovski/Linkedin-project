import { useForm } from 'react-hook-form';
import styles from './UserEditModal.module.css';
import TextField from '../../../../../components/base-ui/text-field';
import BaseButton from '../../../../../components/base-ui/base-button';
import { editUserInfo } from '../../../../../../data/user/editUserInfo';
import { IRootState } from '../../../../../../domain/usecases/store/rootState';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDirectly } from '../../../../../../domain/store/actions/getUserOwn';
import { IoCloseSharp } from "react-icons/io5";
import { Dispatch, SetStateAction } from 'react';
export interface IEditUserRequest {
    username:string;
    email:string;
}

export interface IUserEditModalProps {
    setIsEditModeVisible: Dispatch<SetStateAction<boolean>>;
}

const UserEditModal = ({setIsEditModeVisible}:IUserEditModalProps):JSX.Element => {
    const userData = useSelector((state: IRootState) => state.user);
    const { handleSubmit, control } = useForm<IEditUserRequest>({
        mode: "onChange",
        defaultValues: {
            username: userData.username,
            email: userData.email
        }
    });

    const dispatch = useDispatch();

    async function editUserDetails (data:IEditUserRequest) {
             await editUserInfo(data);
             fetchUserDirectly(dispatch);
             setIsEditModeVisible(false) 
    }

    return (
        <>
        <div className={styles.backdrop} onClick={() => setIsEditModeVisible(false)} />
        <div className={styles.user_editing_modal__wrapper}>
            <div className={styles.user_editing_modal_head__wrapper}>
            <div className={styles.user_editing_modal_head__box}>
             <h3> Edit Info</h3>
                </div>
                <div className={styles.user_editing_modal_head__box}>
<button onClick={() => setIsEditModeVisible(false)}><IoCloseSharp /> </button>
</div>


            </div>
<form
        onSubmit={handleSubmit((formData) => {
            editUserDetails({
             username: formData.username,
             email: formData.email,
           });
        })}
      >
        <div className={styles.form_element}>
  <TextField
              name="username"
              autoComplete="username"
              type="text"
              label="Username"
              testId="editUserUsernameField"
              control={control}
              rules={{
                required: "Username is required",
                minLength: {
                    value: 6,
                    message: "At least 6 characters"
                },
                maxLength: {
                    value: 32,
                    message: "Cannot exceed 32 characters"
                }
            }}
            />
            </div>
            <div className={styles.form_element}>

<TextField
              name="email"
              autoComplete="email"
              type="text"
              label="Email"
              testId="editUserEmailField"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address"
                }
            }}
            />
                </div>
                <div className={styles.form_button_element}>

 <BaseButton type="submit" content="Save" />
 </div>

        </form>
        </div>
        </>
    )
}

export default UserEditModal;