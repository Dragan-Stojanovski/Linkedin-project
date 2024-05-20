import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./presentation/pages/home-page";
import NavBar from "./presentation/components/nav-bar";
import RegisterPage from "./presentation/pages/user-pages/register-page";
import LoginPage from "./presentation/pages/user-pages/login-page";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDirectly } from "./domain/store/actions/getUserOwn";
import { IRootState } from "./domain/usecases/store/rootState";
import FeedPage from "./presentation/pages/feed-page";
import UserProfilePage from "./presentation/pages/user-pages/user-profile-page";

const App = () => {
  const userData = useSelector((state: IRootState) => state.user?.username);
  const dispatch = useDispatch();

  // store.subscribe(() => {
  //   console.log("Store updated:", store.getState());
  // });

  useEffect(() => {
    fetchUserDirectly(dispatch);
  }, [dispatch]);

  useEffect(() => {
  console.log("userData", userData);
  }, [userData]);

  const renderHomePage = userData ? <Navigate to="/feed" /> : <HomePage />;
  const renderRegisterPage = userData ? <Navigate to="/" /> : <RegisterPage />;
  const renderLoginPage = userData ? <Navigate to="/" /> : <LoginPage />;
  const renderFeedPage = userData ? <FeedPage /> : <Navigate to="/login" />;
  const renderProfilePage = userData  ? <UserProfilePage /> : <Navigate to="/home" />;
  return (
    <Fragment>
      <NavBar />
      <Routes>
      <Route path="/home" element={renderHomePage} />
        <Route path="/register" element={renderRegisterPage} />
        <Route path="/login" element={renderLoginPage} />
        <Route path="/feed" element={renderFeedPage} />
        <Route path="/profile" element={renderProfilePage} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Fragment>
  );
};

export default App;