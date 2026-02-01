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
import { makeRequest } from "./lib/makeRequest";
import { useQuery } from "@tanstack/react-query";
import type { IUser } from "./types";
import MeteringSpecs from "./pages/MeteringSpecs";
import MeterPrices from "./pages/MeterPrices";
import TarrifReview from "./pages/TarrifReview";
import TarrifPlan from "./pages/TarrifPlan";
import About from "./pages/About";
import RefundSummary from "./pages/RefundSummary";
import MeterInitialization from "./pages/MeterInitialization";
import CustomerDetails from "./pages/CustomerDetails";
import NewConnection from "./pages/NewConnection";
import NewConnectionPdf from "./pages/NewConnectionPdf";
import Faqs from "./pages/Faqs";
import { SpinnerCustom } from "./components/spinner/Spinner";
import NotFound from "./pages/NotFound";
import TidTokens from "./pages/TidTokens";
import Privacy from "./pages/Privacy";
import TermsAndConditions from "./pages/TermsAndConditions";

function App() {
  const fetchProfile = async () => {
    const res = await makeRequest.get("/user/me");
    return res.data;
  };

  const AdminProtected = ({ children }: { children: React.ReactNode }) => {
    const {
      data: profile,
      isLoading,
      isError,
    } = useQuery<IUser>({
      queryKey: ["profile"],
      queryFn: fetchProfile,
      retry: false,
    });

    if (isLoading) {
      return <SpinnerCustom />;
    }

    if (isError || !profile) {
      return <Navigate to="/login" replace />;
    }

    if (profile.role !== "admin" && profile.role !== "staff") {
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
        {
          path: "/metering-specs-for-map",
          element: <MeteringSpecs />,
        },
        {
          path: "/metering-prices",
          element: <MeterPrices />,
        },
        {
          path: "/tarrif-review",
          element: <TarrifReview />,
        },
        {
          path: "/tarrif-plan",
          element: <TarrifPlan />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/refund-summary",
          element: <RefundSummary />,
        },
        {
          path: "/meter-initialization",
          element: <MeterInitialization />,
        },
        {
          path: "/customer-details",
          element: <CustomerDetails />,
        },

        {
          path: "/new-connection",
          element: <NewConnection />,
        },
        {
          path: "/new-connection-pdf",
          element: <NewConnectionPdf />,
        },
        {
          path: "/faqs",
          element: <Faqs />,
        },
        {
          path: "/tid-tokens",
          element: <TidTokens />,
        },
        {
          path: "/privacy",
          element: <Privacy />,
        },
        {
          path: "/terms",
          element: <TermsAndConditions />,
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
          index: true,
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
    {
      path: "*",
      element: <NotFound />,
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
