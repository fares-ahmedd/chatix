import { lazy, Suspense } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles.js";
import { AuthContextProvider } from "./context/AppDataContext.jsx";
import NotFoundPage from "./ui/PageNotFound.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import Loader from "./ui/LoadingSpinner.jsx";

const Login = lazy(() => import("./pages/login/Login.jsx"));
const SignUp = lazy(() => import("./pages/signup/Signup.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const ProtectedPage = lazy(() => import("./features/ProtectedPage.jsx"));

const router = createBrowserRouter([
  {
    element: <ProtectedPage />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {
  return (
    <>
      <DarkModeProvider>
        <AuthContextProvider>
          <GlobalStyles />
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </AuthContextProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
