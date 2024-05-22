import { IAddUserPostResponse } from "../../../../../../domain/usecases/content/userPosts";

interface IUserPostsDisplayed{
    userPosts:IAddUserPostResponse[];
}

const UserPostsDisplayed = ({userPosts}:IUserPostsDisplayed  ):JSX.Element => {

    

    return(
        <>
        {userPosts.map((item:IAddUserPostResponse) => (
            <div>
                <h1>{item.postTitle}</h1>
                <div dangerouslySetInnerHTML={{ __html: item.postBody }}></div>
            </div>
        ))}
        </>
    )
}

export default UserPostsDisplayed;