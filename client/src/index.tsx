import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/style.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Catalog from "./features/catalog/Catalog";
import ProductDetails from "./features/catalog/ProductDetails";
import AboutPage from "./features/about/AboutPage";
import ContactPage from "./features/contact/ContactPage";
import ServerError from "./app/errors/ServerError";

export const history = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={history} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
