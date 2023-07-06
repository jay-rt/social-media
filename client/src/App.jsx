import "./variables.scss";
import "./app.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./layout/ProtectedRoute";
import AuthRoute from "./layout/AuthRoute";
import { lazy, Suspense } from "react";
import Loading from "./components/loading/Loading";

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Profile = lazy(() => import("./pages/profile/Profile"));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<AuthRoute />}>
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            }
          />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
