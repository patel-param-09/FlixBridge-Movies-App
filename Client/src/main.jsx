import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import About from "./components/About";
import { Provider } from "react-redux";
import store from "./app/store.js";
import Watchlater from "../src/components/Watchlater.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:movie",
    element: <About />,
  },
  {
    path: "/watchlater",
    element: <Watchlater />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </Provider>
);
