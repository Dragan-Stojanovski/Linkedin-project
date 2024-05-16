import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";
import BaseButton from "../../../components/base-ui/base-button";
import TextField from "../../../components/base-ui/text-field";
import { loginUser } from "../../../../data/user/loginUser";
import { ILoginRequest } from "../../../../domain/user/loginRequest";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { fetchUserDirectly } from "../../../../domain/store/actions/getUserOwn";
import { useDispatch } from "react-redux";
import SetMetaInfo from "../../../../infra/utility/SetMetaInfo";

/**
 * Represents the login page component where users can enter their credentials
 * to log in. This component manages the login state including success and error
 * messages and uses the {@link loginUserFn} to perform the actual login operation.
 * It makes use of `react-hook-form` for form handling and validation.
 *
 * @returns The JSX.Element representing the login page.
 */
const LoginPage: React.FC = (): JSX.Element => {
  const { handleSubmit, control } = useForm<ILoginRequest>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();
    const dispatch = useDispatch();

  /**
   * Asynchronously authenticates a user based on provided credentials.
   * On successful authentication, stores the JWT in localStorage and
   * navigates to the home page after displaying a success message.
   * In case of an error, sets an error message.
   *
   * @param data - {@link ILoginRequest} The login credentials of the user.
   */
  const loginUserFn = useCallback(
    async (data: ILoginRequest) => {
      try {
        let result = await loginUser(data);
        localStorage.setItem("jwt", result.data.token);
        setSuccessMessage("Success!");
        fetchUserDirectly(dispatch);
        setTimeout(() => {
          setSuccessMessage(undefined);
          navigate("/");
        }, 3000);
      } catch (error: any) {
        setErrorMessage(error.response?.data.message || "An error occurred");
      }
    },
    [navigate]
  );

  return (
    <>
    <SetMetaInfo title="Login Page" description="Welcome Get Started"/>
      {successMessage !== undefined ? (
        <div className={styles.login_page_wrapper}>
          <h3>{successMessage}</h3>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit((formData) => {
            loginUserFn({
              username: formData.username,
              password: formData.password,
            });
          })}
        >
          <div className={styles.login_page_wrapper}>
            {errorMessage !== undefined && (
              <div className={styles.login_page_errormsg}>
                <h3>{errorMessage}</h3>
              </div>
            )}
            <div className={styles.login_page_field}>
              <TextField
                name="username"
                type="text"
                label="Username"
                testId="loginUsernameField"
                control={control}
                rules={{
                  required: "Required",
                }}
              />
            </div>
            <div className={styles.login_page_field}>
              <TextField
                name="password"
                type="password"
                label="Password"
                testId="loginPasswordField"
                control={control}
                rules={{
                  required: "Required",
                }}
              />
            </div>

            <div className={styles.register_page_btn}>
              <BaseButton type="submit" content="Log In" />
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default LoginPage;
