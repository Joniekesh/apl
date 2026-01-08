import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { createBrowserRouter, Navigate, RouterProvider, } from "react-router-dom";
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
    const AdminProtected = ({ children }) => {
        const data = localStorage.getItem("user") || "{}";
        const currentUser = JSON.parse(data);
        if (!currentUser) {
            return _jsx(Navigate, { to: "/", replace: true });
        }
        if (currentUser.role !== "admin" && currentUser.role !== "staff") {
            return _jsx(Navigate, { to: "/", replace: true });
        }
        return _jsx(_Fragment, { children: children });
    };
    const router = createBrowserRouter([
        {
            path: "/",
            element: _jsx(Layout, {}),
            children: [
                {
                    path: "/",
                    element: _jsx(Landing, {}),
                },
                {
                    path: "/login",
                    element: _jsx(Login, {}),
                },
                {
                    path: "/all-posts",
                    element: _jsx(PublicPosts, {}),
                },
                {
                    path: "/all-posts/:id",
                    element: _jsx(SinglePost, {}),
                },
            ],
        },
        {
            path: "/admin",
            element: (_jsx(AdminProtected, { children: _jsx(AdminLayout, {}) })),
            children: [
                {
                    path: "/admin",
                    element: _jsx(Dashboard, {}),
                },
                {
                    path: "posts",
                    element: _jsx(Posts, {}),
                },
                {
                    path: "posts/:id",
                    element: _jsx(Post, {}),
                },
                {
                    path: "users",
                    element: _jsx(Users, {}),
                },
                {
                    path: "update-user/:id",
                    element: _jsx(UpdateUser, {}),
                },
                {
                    path: "create-post",
                    element: _jsx(CreatePost, {}),
                },
                {
                    path: "update-post/:id",
                    element: _jsx(UpdatePost, {}),
                },
                {
                    path: "settings",
                    element: _jsx(Settings, {}),
                },
            ],
        },
    ]);
    return (_jsxs("div", { className: "h-screen w-full", children: [_jsx(Toaster, { position: "bottom-right", richColors: true }), _jsx(RouterProvider, { router: router })] }));
}
export default App;
