import { useForm } from 'react-hook-form';
import styles from './UserPostForm.module.css';
import TextField from '../../../../../components/base-ui/text-field';
import BaseButton from '../../../../../components/base-ui/base-button';
import { IoCloseSharp } from "react-icons/io5";
import { Dispatch, SetStateAction } from 'react';
import { addUserPost } from '../../../../../../data/content/addUserPost';
import QuillEditor from '../../../../../components/base-ui/quil-editor';
import { editUserPost } from '../../../../../../data/content/editUserPost';
import { IAddUserPostRequest } from '../../../../../../domain/usecases/content/userPosts';
export interface IAddPostRequest {
    postTitle:string;
    postBody:string;
}

export interface IUserEditModalProps {
    setIsPostFormVisible: Dispatch<SetStateAction<boolean>>;
    getUserPostsHandler?:any;
    isEditing?:boolean;
    id?:string;
    defaultValues?: IAddPostRequest;
}

const UserPostForm = ({defaultValues, id,setIsPostFormVisible, getUserPostsHandler,isEditing}:IUserEditModalProps):JSX.Element => {
    const { handleSubmit, control } = useForm<IAddPostRequest>({
        mode: "onChange",
        defaultValues: defaultValues || { postTitle: '', postBody: '' },
    });

    async function addUserPostHandler (data:IAddPostRequest) {
             await addUserPost(data);
             getUserPostsHandler()
             setIsPostFormVisible(false) 
             console.log("Succes adding post")
    }

    const handleEdit = async (postId: string, data:IAddUserPostRequest) => {
        try {
          await editUserPost(postId, data);
          console.log('Post edited successfully');
          setIsPostFormVisible(false);
          console.log(postId, data)
          getUserPostsHandler(); 
        } catch (error) {
          console.error('Error editing post:', error);
        }
      };
      
    return (
        <>
        <div className={styles.backdrop} onClick={() => setIsPostFormVisible(false)} />
        <div className={styles.user_editing_modal__wrapper}>
            <div className={styles.user_editing_modal_head__wrapper}>
            <div className={styles.user_editing_modal_head__box}>
             <h3>{isEditing ? <h3>Edit Post</h3> : <h3>Add Post</h3>}</h3>
                </div>
                <div className={styles.user_editing_modal_head__box}>
<button onClick={() => setIsPostFormVisible(false)}><IoCloseSharp /> </button>
</div>


            </div>
            <form
          onSubmit={handleSubmit((formData) => {
            if (isEditing && id) {
              handleEdit(id, {
                postTitle: formData.postTitle,
                postBody: formData.postBody,
              });
            } else {
              addUserPostHandler({
                postTitle: formData.postTitle,
                postBody: formData.postBody,
              });
            }
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
                  <QuillEditor
              name="postBody"
              control={control}
              rules={{ required: 'Body is required' }}
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