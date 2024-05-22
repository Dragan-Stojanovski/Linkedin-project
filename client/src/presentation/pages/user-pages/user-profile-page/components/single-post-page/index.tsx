import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSpecificPost } from "../../../../../../data/content/getSpecificPost";
import SetMetaInfo from "../../../../../../infra/utility/SetMetaInfo";
import { deleteUserPost } from "../../../../../../data/content/deleteUserPost";
import UserPostForm from "../user-post-form";

interface PostData {
  postTitle: string;
  postBody: string;
  _id:string;
}

const SinglePostPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const id: string | null = searchParams.get('id');
  const [postData, setPostData] = useState<PostData>({ postTitle: '', postBody: '', _id:'' });
  const [isEditing, setIsEditing] = useState(false);

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
      
      <h1>{postData.postTitle}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.postBody }}></div>
      <button onClick={() => handleDelete(postData._id)}>Delete</button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );
};

export default SinglePostPage;