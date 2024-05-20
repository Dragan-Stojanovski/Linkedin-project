import styles from "./LoginPage.module.css";
import SetMetaInfo from "../../../../infra/utility/SetMetaInfo";
import LoginPageForm from "./login-page-form";

/**
 * Represents the login page 
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
