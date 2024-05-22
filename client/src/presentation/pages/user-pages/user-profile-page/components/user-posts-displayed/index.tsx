import { Link } from "react-router-dom";
import {  IAddUserPostResponseData } from "../../../../../../domain/usecases/content/userPosts";
import styles from './UserPostsDisplayed.module.css';
interface IUserPostsDisplayed{
    userPosts:IAddUserPostResponseData[];
}

const UserPostsDisplayed = ({userPosts}:IUserPostsDisplayed  ):JSX.Element => {
    return(
        <>
      {userPosts.length ? (
        <div className={styles.user_posts__wrapper}>
          {userPosts.map((item: IAddUserPostResponseData) => (
            <Link
              key={item.postTitle}
              to={`/post?id=${item._id}`}
              className={styles.user_posts__box}
            >
              <h1>{item.postTitle}</h1>
              <div dangerouslySetInnerHTML={{ __html: item.postBody }}></div>
            </Link>
          ))}
        </div>
      ) : null}
        </>
    )
}

export default UserPostsDisplayed;