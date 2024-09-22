import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Root from "./components/Root";
import Home from "./components/Home";
import Error from "./components/Error";
import Gemini from "./components/Gemini";
import Azure from "./components/Azure";
import ImageGeneration from "./components/ImageGeneration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Carousel from "./components/Carousel";
export default function App() {

    const queryClient = new QueryClient();
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/gemini", element: <Gemini /> },
          { path: "/azure", element: <Azure /> },
          {path:"/image",element:<ImageGeneration/>},
          {path:"/history",element:<Carousel/>}
        ],
      },
    ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
