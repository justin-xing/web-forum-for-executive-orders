import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./common/Root/Root";
import HomePage from "./pages/home/HomePage/HomePage";
// import theme from "./theme";
// import { ThemeProvider } from "@mui/system";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      id: "root",
      children: [{ index: true, element: <HomePage /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
