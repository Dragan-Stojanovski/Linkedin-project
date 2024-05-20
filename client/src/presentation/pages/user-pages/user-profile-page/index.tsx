import { useSelector } from "react-redux";
import { IRootState } from "../../../../domain/usecases/store/rootState";
import SetMetaInfo from "../../../../infra/utility/SetMetaInfo";
import styles from './UserProfilePage.module.css';
import { MdModeEditOutline } from "react-icons/md";
import { useState } from "react";
import UserEditModal from "./components/user-edit-modal";

const UserProfilePage = ():JSX.Element => {
    const userData = useSelector((state: IRootState) => state.user);
    const [isEditModeVisible,setIsEditModeVisible] = useState(false)
   
    return(
    <> 
    <SetMetaInfo title={userData.username} description={`Profile page of the player ${userData.username} `}/> 
    {isEditModeVisible && <UserEditModal setIsEditModeVisible={setIsEditModeVisible} />}
    <div className={styles.user_details__wrapper}>
    <div className={styles.user_details__box}>
    <h1>{userData.username}</h1>
    <h3>{userData.email}</h3>
    </div>
    <div className={styles.user_details__box}>
        <button onClick={() => setIsEditModeVisible(!isEditModeVisible)}><MdModeEditOutline /></button>
    </div>
    </div>
    </>
    )
}

export default UserProfilePage;