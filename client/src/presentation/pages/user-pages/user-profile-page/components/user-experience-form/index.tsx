import { useForm } from 'react-hook-form';
import styles from './UserExperienceForm.module.css';
import TextField from '../../../../../components/base-ui/text-field';
import BaseButton from '../../../../../components/base-ui/base-button';
import { IoCloseSharp } from "react-icons/io5";
import { Dispatch, SetStateAction } from 'react';
import { addUserExperience } from '../../../../../../data/content/user-experience/addUserExperience';
import { IUserExperienceRequest, IUserExperienceResponse } from '../../../../../../domain/usecases/content/userExperience';

export interface IUserExperienceFormProps {
  setIsExperienceFormVisible: Dispatch<SetStateAction<boolean>>;
  getUserExperiencesHandler?: any;
  defaultValues?: IUserExperienceRequest;
}

const UserExperienceForm = ({ defaultValues, setIsExperienceFormVisible, getUserExperiencesHandler }: IUserExperienceFormProps): JSX.Element => {
  const { handleSubmit, control } = useForm<IUserExperienceRequest>({
    mode: "onChange",
    defaultValues: defaultValues || { companyName: '', position: '', startDate: '', endDate: '', description: '' },
  });

  async function addUserExperienceHandler(data: IUserExperienceRequest) {
    try {
      const response: IUserExperienceResponse = await addUserExperience(data);
      getUserExperiencesHandler();
      setIsExperienceFormVisible(false);
      console.log("Success adding experience", response);
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  }

  return (
    <>
      <div className={styles.backdrop} onClick={() => setIsExperienceFormVisible(false)} />
      <div className={styles.user_experience_modal__wrapper}>
        <div className={styles.user_experience_modal_head__wrapper}>
          <div className={styles.user_experience_modal_head__box}>
            <h3>Add Experience</h3>
          </div>
          <div className={styles.user_experience_modal_head__box}>
            <button onClick={() => setIsExperienceFormVisible(false)}><IoCloseSharp /></button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit((formData) => {
            addUserExperienceHandler({
              companyName: formData.companyName,
              position: formData.position,
              startDate: formData.startDate,
              endDate: formData.endDate,
              description: formData.description,
            });
          })}
        >
          <div className={styles.form_element}>
            <TextField
              name="companyName"
              type="text"
              label="Company Name"
              control={control}
              rules={{ required: "Company Name is required" }}
            />
          </div>
          <div className={styles.form_element}>
            <TextField
              name="position"
              type="text"
              label="Position"
              control={control}
              rules={{ required: "Position is required" }}
            />
          </div>
          <div className={styles.form_element}>
            <TextField
              name="startDate"
              type="date"
              label="Start Date"
              control={control}
              rules={{ required: "Start Date is required" }}
            />
          </div>
          <div className={styles.form_element}>
            <TextField
              name="endDate"
              type="date"
              label="End Date"
              control={control}
            />
          </div>
          <div className={styles.form_element}>
            <TextField
              name="description"
              type="text"
              label="Description"
              control={control}
            />
          </div>
          <div className={styles.form_button_element}>
            <BaseButton type="submit" content="Save" />
          </div>
        </form>
      </div>
    </>
  );
}

export default UserExperienceForm;