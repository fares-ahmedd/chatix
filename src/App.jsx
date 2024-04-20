import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalStyles from "./styles.js";
import Home from "./pages/Home.jsx";
import { AuthContextProvider } from "./context/AppDataContext.jsx";
import ProtectedPage from "./features/ProtectedPage.jsx";
import NotFoundPage from "./ui/PageNotFound.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";

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
    element: <Signup />,
  },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {
  return (
    <>
      <DarkModeProvider>
        <AuthContextProvider>
          <GlobalStyles />
          <RouterProvider router={router} />
        </AuthContextProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
