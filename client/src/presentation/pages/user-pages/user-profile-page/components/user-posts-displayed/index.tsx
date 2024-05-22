import { Link } from "react-router-dom";
import { IAddUserPostResponse } from "../../../../../../domain/usecases/content/userPosts";
import styles from './UserPostsDisplayed.module.css';
interface IUserPostsDisplayed{
    userPosts:IAddUserPostResponse[];
}

const UserPostsDisplayed = ({userPosts}:IUserPostsDisplayed  ):JSX.Element => {
    return(
        <>
      <div></div>
        {userPosts.length ? <div className={styles.user_posts__wrapper}> {userPosts.map((item:IAddUserPostResponse) => (
            <Link to={`/post?title=${item.postTitle}`} className={styles.user_posts__box}>
                <h1>{item.postTitle}</h1>
                <div dangerouslySetInnerHTML={{ __html: item.postBody }}></div>
            </Link>
        )) }</div>: null}
        </>
    )
}

export default UserPostsDisplayed;