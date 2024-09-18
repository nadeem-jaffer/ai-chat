import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Root from "./components/Root";
import Home from "./components/Home";
import Error from "./components/Error";
import Gemini from "./components/Gemini";
import Azure from "./components/Azure";
export default function App() {

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/gemini", element: <Gemini /> },
          { path: "/azure", element: <Azure /> },
        ],
      },
    ]);

  return <RouterProvider router={router} />;
}
