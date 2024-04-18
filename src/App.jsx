import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalStyles from "./styles.js";
import Home from "./pages/Home.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import ProtectedPage from "./features/ProtectedPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedPage>
        <Home />
      </ProtectedPage>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
