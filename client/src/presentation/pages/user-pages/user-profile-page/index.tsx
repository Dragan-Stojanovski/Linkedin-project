import { useSelector } from "react-redux";
import { IRootState, IUserResponse } from "../../../../domain/usecases/store/rootState";
import SetMetaInfo from "../../../../infra/utility/SetMetaInfo";
import styles from './UserProfilePage.module.css';
import { MdModeEditOutline } from "react-icons/md";
import { useEffect, useState, useCallback } from "react";
import UserEditModal from "./components/user-edit-modal";
import UserPostForm from "./components/user-post-form";
import { IoMdAdd } from "react-icons/io";
import UserPostsDisplayed from "./components/user-posts-displayed";
import { getUserPosts } from "../../../../data/content/user-post/getUserPosts";
import { IAddUserPostResponse } from "../../../../domain/usecases/content/userPosts";
import UserExperienceForm from "./components/user-experience-form";
import UserExperiencesDisplayed from "./components/user-experiences-displayed";
import { IUserExperienceResponse } from "../../../../domain/usecases/content/userExperience";
import { getUserExperiences } from "../../../../data/content/user-experience/getUserExperiences";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../../../data/user/getUserOwnById";

const UserProfilePage = (): JSX.Element => {
  const { userId } = useParams<{ userId: string }>();
  const userData = useSelector((state: IRootState) => state.user);
  const [isEditModeVisible, setIsEditModeVisible] = useState(false);
  const [isPostFormVisible, setIsPostFormVisible] = useState(false);
  const [userExperiences, setUserExperiences] = useState<IUserExperienceResponse[]>([]);
  const [profileData, setProfileData] = useState<IUserResponse | undefined>();
  const [userPosts, setUserPosts] = useState<IAddUserPostResponse[]>([]);
  const [isExperienceFormVisible, setIsExperienceFormVisible] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    if (userId) {
      try {
        const result = await getUserProfile(userId);
        setProfileData(result);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  }, [userId]);

  const getUserPostsHandler = useCallback(async () => {
    if (userId) {
      try {
        const result = await getUserPosts(userId);
        setUserPosts(result);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    }
  }, [userId]);

  const getUserExperiencesHandler = useCallback(async () => {
    if (userId) {
      try {
        const result = await getUserExperiences(userId);
        setUserExperiences(result);
      } catch (error) {
        console.error('Error fetching user experiences:', error);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchUserProfile();
    getUserPostsHandler();
    getUserExperiencesHandler();
  }, [fetchUserProfile, getUserPostsHandler, getUserExperiencesHandler]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const isCurrentUser = userData._id === userId;

  return (
    <>
      <SetMetaInfo title={profileData.username} description={`Profile page of ${profileData.username}`} />
      {isEditModeVisible && (
        <UserEditModal 
          fetchUserProfile={fetchUserProfile} 
          setIsEditModeVisible={setIsEditModeVisible} 
        />
      )}
      {isPostFormVisible && (
        <UserPostForm 
          getUserPostsHandler={getUserPostsHandler} 
          setIsPostFormVisible={setIsPostFormVisible} 
        />
      )}
      {isExperienceFormVisible && (
        <UserExperienceForm 
          getUserExperiencesHandler={getUserExperiencesHandler} 
          setIsExperienceFormVisible={setIsExperienceFormVisible} 
        />
      )}

      <div className={styles.user_details__wrapper}>
        <div className={styles.user_details__box}>
          <h1>{profileData.username}</h1>
          <h3>{profileData.email}</h3>
        </div>
        {isCurrentUser && (
          <div className={styles.user_details__box}>
            <button onClick={() => setIsEditModeVisible(true)}>
              <MdModeEditOutline />
            </button>
          </div>
        )}
      </div>
      <br />
      <hr />
      <br />
      <section>
        <div className={styles.section_heading}>
          <h2>Posts</h2>
          {isCurrentUser && (
            <button onClick={() => setIsPostFormVisible(true)}>
              <IoMdAdd />
            </button>
          )}
        </div>
        <UserPostsDisplayed userPosts={userPosts} />
      </section>
      <br />
      <hr />
      <br />
      <section>
        <div className={styles.section_heading}>
          <h2>Experience</h2>
          {isCurrentUser && (
            <button onClick={() => setIsExperienceFormVisible(true)}>
              <IoMdAdd />
            </button>
          )}
        </div>
        <UserExperiencesDisplayed userExperiences={userExperiences} />
      </section>
    </>
  );
};

export default UserProfilePage;