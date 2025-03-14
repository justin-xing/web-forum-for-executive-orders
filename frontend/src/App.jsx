import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./common/Root/Root";
import DocumentList from "./pages/documentList/DocumentList/DocumentList";
import DocumentPage from "./pages/document/DocumentPage";
import HomePage from "./pages/home/HomePage";
// import theme from "./theme";
// import { ThemeProvider } from "@mui/system";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
