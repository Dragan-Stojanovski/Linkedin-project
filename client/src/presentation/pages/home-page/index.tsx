import { Fragment } from "react";
import SetMetaInfo from "../../../infra/utility/SetMetaInfo";
import styles from './HomePage.module.css';
import LoginPageForm from "../user-pages/login-page/login-page-form";
const HomePage = () => {
  return <Fragment>
        <SetMetaInfo title="Home Page" description="Home page"/>
        <section className={styles.home_page__hero_wrapper}>
        <div className={styles.home_page__hero_box}>
          <h1>Welcome to your <br></br> professional community</h1>
        <LoginPageForm />
        </div>
        <div className={styles.home_page__hero_box}>
          <img src="./src/assets/images/home_hero_section.svg" alt="Man working on laptop"/>
        </div>
        </section>
    </Fragment>
};

export default HomePage;
