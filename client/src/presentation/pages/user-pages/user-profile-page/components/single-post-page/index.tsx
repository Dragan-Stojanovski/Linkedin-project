import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSpecificPost } from "../../../../../../data/content/user-post/getSpecificPost";
import SetMetaInfo from "../../../../../../infra/utility/SetMetaInfo";
import { deleteUserPost } from "../../../../../../data/content/user-post/deleteUserPost";
import UserPostForm from "../user-post-form";
import { IRootState } from "../../../../../../domain/usecases/store/rootState";
import { useSelector } from "react-redux";
import BaseButton from "../../../../../components/base-ui/base-button";
import styles from './SinglePostPage.module.css';
import ConfirmationWindow from "./components/confirmation-window";
interface PostData {
  postTitle: string;
  postBody: string;
  userId:string;
  _id:string;
}

const SinglePostPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
  const id: string | null = searchParams.get('id');
  const [postData, setPostData] = useState<PostData>({ userId:'',postTitle: '', postBody: '', _id:'' });
  const [isEditing, setIsEditing] = useState(false);
  const userId = useSelector((state: IRootState) => state.user?._id);
  const navigate = useNavigate();

  const getSpecificPostHandler = async () => {
    if (id) {
      try {
        const response = await getSpecificPost(id);
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching the post:", error);
      }
    }
  };

  useEffect(() => {
    getSpecificPostHandler();
  }, [id]);


  const handleDelete = async (postId: string) => {
    try {
      await deleteUserPost(postId);
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  

  
  return (
    <div>
      <SetMetaInfo title={postData.postTitle} description={`Post named ${postData.postTitle}`} />
        {isEditing && <UserPostForm defaultValues={postData} getUserPostsHandler={getSpecificPostHandler} id={postData._id} isEditing={isEditing} setIsPostFormVisible={setIsEditing} />}
   <div className={styles.single_user_post__wrapper}>
     <h1>{postData.postTitle}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.postBody }}></div>
      
     {postData.userId === userId &&   <div className={styles.single_post_operations}>
     <BaseButton type="button" content="Delete" onClick={() => setIsDeleteModalActive(true)} />
     <BaseButton type="button" content="Edit" onClick={() => setIsEditing(true)} />
      </div> }</div>
      {isDeleteModalActive && <ConfirmationWindow onModalClose={() => setIsDeleteModalActive(false)} onClick={() => handleDelete(postData._id)} /> }
    </div>
  );
};

export default SinglePostPage;