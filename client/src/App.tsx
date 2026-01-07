import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";

import "./App.css";
import Landing from "./pages/Landing";
import { AdminLayout, Layout } from "./components/layouts/layout";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/Posts";
import Users from "./pages/admin/Users";
import Post from "./pages/admin/Post";
import Settings from "./pages/admin/Settings";
import Login from "./pages/Login";
import CreatePost from "./pages/admin/CreatePost";
import PublicPosts from "./pages/PublicPosts";
import SinglePost from "./pages/SinglePost";
import UpdatePost from "./pages/admin/UpdatePost";
import UpdateUser from "./pages/admin/UpdateUser";

function App() {
  const AdminProtected = ({ children }: { children: React.ReactNode }) => {
    const data = localStorage.getItem("user") || "{}";

    const currentUser = JSON.parse(data);

    if (!currentUser) {
      return <Navigate to="/" replace />;
    }

    if (currentUser.role !== "admin" && currentUser.role !== "staff") {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/all-posts",
          element: <PublicPosts />,
        },
        {
          path: "/all-posts/:id",
          element: <SinglePost />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <AdminProtected>
          <AdminLayout />
        </AdminProtected>
      ),
      children: [
        {
          path: "/admin",
          element: <Dashboard />,
        },
        {
          path: "posts",
          element: <Posts />,
        },
        {
          path: "posts/:id",
          element: <Post />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "update-user/:id",
          element: <UpdateUser />,
        },
        {
          path: "create-post",
          element: <CreatePost />,
        },
        {
          path: "update-post/:id",
          element: <UpdatePost />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return (
    <div className="h-screen w-full">
      <Toaster position="bottom-right" richColors />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
