import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
         path: "/",
         element: <Home />
      },
      {
        path: "instructors",
        element: <Instructors />
      },
      {
        path: "classes",
        element: <Classes />
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: "/class/:id",
        element: <SingleClass/>,
        loader: ({params}) => fetch(`http://localhost:3000/class/${params.id}`)
      }
    ]
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      }
    ]
  }

]);