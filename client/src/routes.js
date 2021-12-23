import Dashboard from "./layouts/dashboard";
import Empresa from "./layouts/business";
import SignIn from "./layouts/authentication/sign-in";
import SignUp from "./layouts/authentication/sign-up";
import Reservations from "./layouts/reservations";

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Reservaciones",
    key: "reservaciones",
    icon: <Icon fontSize="small">eventavailablesharpicon</Icon>,
    route: "/reservaciones",
    component: <Reservations />,
  },
  {
    type: "collapse",
    name: "Empresa",
    key: "empresa",
    icon: <Icon fontSize="small">settingsicon</Icon>,
    route: "/empresa",
    component: <Empresa />,
  },
  {
    type: "none",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "none",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
