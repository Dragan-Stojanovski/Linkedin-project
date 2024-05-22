import { useSelector } from "react-redux";
import { IRootState } from "../../../../domain/usecases/store/rootState";
import SetMetaInfo from "../../../../infra/utility/SetMetaInfo";
import styles from './UserProfilePage.module.css';
import { MdModeEditOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import UserEditModal from "./components/user-edit-modal";
import UserPostForm from "./components/user-post-form";
import { IoMdAdd } from "react-icons/io";
import UserPostsDisplayed from "./components/user-posts-displayed";
import { getUserPosts } from "../../../../data/content/getUserPosts";

const UserProfilePage = ():JSX.Element => {
    const userData = useSelector((state: IRootState) => state.user);
    const [isEditModeVisible,setIsEditModeVisible] = useState(false)
    const [isPostFormVisible,setIsPostFormVisible] = useState(false)
    const [userPosts, setUserPosts]= useState([])

    async function getUserPostsHandler (){
        const result = await getUserPosts(); 
        setUserPosts(result.data);
            }
        
            useEffect(() => {
                getUserPostsHandler();
            }, [])
            
    return(
    <> 
    <SetMetaInfo title={userData.username} description={`Profile page of the player ${userData.username} `}/> 
    {isEditModeVisible && <UserEditModal setIsEditModeVisible={setIsEditModeVisible} />}
    {isPostFormVisible && <UserPostForm getUserPostsHandler={getUserPostsHandler}  setIsPostFormVisible={setIsPostFormVisible} />}
        
     <div className={styles.user_details__wrapper}>
    <div className={styles.user_details__box}>
    <h1>{userData.username}</h1>
    <h3>{userData.email}</h3>
    </div>
    <div className={styles.user_details__box}>
        <button onClick={() => setIsEditModeVisible(true)}><MdModeEditOutline /></button>
    </div>
    </div>
    <br></br>
    <hr></hr>
    <br></br>
    <div className={styles.user_profile_posts__heading}>
        <h2>Posts</h2>
        <button onClick={() =>  setIsPostFormVisible(true) }><IoMdAdd /></button>
    </div>
       <UserPostsDisplayed userPosts={userPosts}/>

    </>
    )
}

export default UserProfilePage;