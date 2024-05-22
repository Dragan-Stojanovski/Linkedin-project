import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import HomePage from "./presentation/pages/home-page";
import NavBar from "./presentation/components/nav-bar";
import RegisterPage from "./presentation/pages/user-pages/register-page";
import LoginPage from "./presentation/pages/user-pages/login-page";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDirectly } from "./domain/store/actions/getUserOwn";
import { IRootState } from "./domain/usecases/store/rootState";
import FeedPage from "./presentation/pages/feed-page";
import UserProfilePage from "./presentation/pages/user-pages/user-profile-page";
import RequireAuth from "./infra/utility/RequireAuth";

const App = () => {
  const userData = useSelector((state: IRootState) => state.user?.username);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchUserDirectly(dispatch);
  }, [dispatch]);

  const redirectPath = searchParams.get('redirect') || '/';
  const renderHomePage = userData ? <Navigate to="/feed" /> : <HomePage />;
  const renderRegisterPage = userData ? <Navigate to="/" /> : <RegisterPage />;
  const renderLoginPage = userData ? <Navigate to={redirectPath} /> : <LoginPage />;
  const renderFeedPage = userData ? <FeedPage /> : <Navigate to="/login" />;
  const renderProfilePage = <RequireAuth> <UserProfilePage /></RequireAuth> ;
  return (
    <Fragment>
      <NavBar/>
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