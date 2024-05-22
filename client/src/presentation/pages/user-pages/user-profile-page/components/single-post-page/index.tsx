import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSpecificPost } from "../../../../../../data/content/getSpecificPost";
import SetMetaInfo from "../../../../../../infra/utility/SetMetaInfo";

interface PostData {
  postTitle: string;
  postBody: string;
}

const SinglePostPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const title: string | null = searchParams.get('title');
  const [postData, setPostData] = useState<PostData>({ postTitle: '', postBody: '' });

  console.log(title);

  const getSpecificPostHandler = async () => {
    if (title) {
      try {
        const response = await getSpecificPost(title);
        console.log("Response for the post data->", response);
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching the post:", error);
      }
    }
  };

  useEffect(() => {
    getSpecificPostHandler();
  }, [title]);

  return (
    <div>
      <SetMetaInfo title={postData.postTitle} description={`Post named ${postData.postTitle}`} />
      <h1>{postData.postTitle}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.postBody }}></div>
    </div>
  );
};

export default SinglePostPage;