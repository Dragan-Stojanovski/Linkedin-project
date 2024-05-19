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
import LoginPageForm from "./login-page-form";

/**
 * Represents the login page component where users can enter their credentials
 * to log in. This component manages the login state including success and error
 * messages and uses the {@link loginUserFn} to perform the actual login operation.
 * It makes use of `react-hook-form` for form handling and validation.
 *
 * @returns The JSX.Element representing the login page.
 */
const LoginPage: React.FC = (): JSX.Element => {



  return (
    <>
    <SetMetaInfo title="Login Page" description="Welcome Get Started"/>
     <div className={styles.login_page__container}>
      <LoginPageForm />
      </div>
    </>
  );
};

export default LoginPage;
