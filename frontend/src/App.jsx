import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./common/Root/Root";
import DocumentList from "./pages/documentList/DocumentList/DocumentList";
import DocumentPage from "./pages/document/DocumentPage";
import HomePage from "./pages/home/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import AuthProvider from "./context/AuthContext";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ControversialComments from "./pages/comments/ControversialComments";
import DocumentForm from "./pages/documentList/DocumentCreate/DocumentCreate";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      id: "root",
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/president/:president",
          element: <DocumentList />,
        },
        {
          path: "/document/:executive_order_id",
          element: <DocumentPage />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/controversial-comments",
          element: <ControversialComments />,
        },
        {
          path: "/create_document",
          element: <DocumentForm/>
        }
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
