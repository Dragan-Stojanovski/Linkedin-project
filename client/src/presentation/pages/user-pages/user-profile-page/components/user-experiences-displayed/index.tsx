import { IUserExperienceResponse } from "../../../../../../domain/usecases/content/userExperience";
import styles from './UserExperiencesDisplayed.module.css';

interface IUserExperiencesDisplayedProps {
  userExperiences: IUserExperienceResponse[];
}

const UserExperiencesDisplayed = ({ userExperiences }: IUserExperiencesDisplayedProps): JSX.Element => {
    const sortedExperiences = userExperiences.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() );

    return (
    <>
      {sortedExperiences.length ? (
        <div className={styles.user_experiences__wrapper}>
          {sortedExperiences.map((experience: IUserExperienceResponse) => (
            <div key={experience._id} className={styles.user_experience__box}>
              <h3>{experience.companyName}</h3>
              <p>{experience.position}</p>
              <p>{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
              <p>{experience.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default UserExperiencesDisplayed;