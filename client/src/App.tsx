import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./presentation/pages/home-page";
import NavBar from "./presentation/components/nav-bar";
import RegisterPage from "./presentation/pages/user-pages/register-page";
import LoginPage from "./presentation/pages/user-pages/login-page";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDirectly } from "./domain/store/actions/getUserOwn";
import { IRootState } from "./domain/usecases/store/rootState";

const token = localStorage.getItem("jwt");

const App = () => {
  const userData = useSelector((state: IRootState) => state.user);
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

  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
      </Routes>
    </Fragment>
  );
};

export default App;
