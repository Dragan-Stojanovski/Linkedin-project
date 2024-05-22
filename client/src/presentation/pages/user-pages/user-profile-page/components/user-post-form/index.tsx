import { useForm } from 'react-hook-form';
import styles from './UserPostForm.module.css';
import TextField from '../../../../../components/base-ui/text-field';
import BaseButton from '../../../../../components/base-ui/base-button';
import { editUserInfo } from '../../../../../../data/user/editUserInfo';
// import { IRootState } from '../../../../../../domain/usecases/store/rootState';
import { useDispatch } from 'react-redux';
import { fetchUserDirectly } from '../../../../../../domain/store/actions/getUserOwn';
import { IoCloseSharp } from "react-icons/io5";
import { Dispatch, SetStateAction } from 'react';
import { addUserPost } from '../../../../../../data/content/addUserPost';
export interface IAddPostRequest {
    postTitle:string;
    postBody:string;
}

export interface IUserEditModalProps {
    setIsPostFormVisible: Dispatch<SetStateAction<boolean>>;
    getUserPostsHandler:any;
}

const UserPostForm = ({setIsPostFormVisible, getUserPostsHandler}:IUserEditModalProps):JSX.Element => {
    // const userData = useSelector((state: IRootState) => state.user);
    const { handleSubmit, control } = useForm<IAddPostRequest>({
        mode: "onChange",
    });

    const dispatch = useDispatch();

    async function addUserPostHandler (data:IAddPostRequest) {
             await addUserPost(data);
             getUserPostsHandler()
             setIsPostFormVisible(false) 
             console.log("Succes adding post")
    }

    return (
        <>
        <div className={styles.backdrop} onClick={() => setIsPostFormVisible(false)} />
        <div className={styles.user_editing_modal__wrapper}>
            <div className={styles.user_editing_modal_head__wrapper}>
            <div className={styles.user_editing_modal_head__box}>
             <h3> Add Post</h3>
                </div>
                <div className={styles.user_editing_modal_head__box}>
<button onClick={() => setIsPostFormVisible(false)}><IoCloseSharp /> </button>
</div>


            </div>
<form
        onSubmit={handleSubmit((formData) => {
            addUserPostHandler({
             postTitle: formData.postTitle,
             postBody: formData.postBody,
           });
        })}
      >
        <div className={styles.form_element}>
  <TextField
              name="postTitle"
              type="text"
              label="Title"
              control={control}
              rules={{
                required: "Username is required",
            }}
            />
            </div>

                  <div className={styles.form_element}>
  <TextField
              name="postBody"
              type="text"
              label="Body"
              control={control}
              rules={{
                required: "Username is required",
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

export default UserPostForm;