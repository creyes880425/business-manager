import { useState, useEffect } from "react";

import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "./components/Sidenav";

import theme from "./assets/theme";

import routes from "./routes";

import { useMaterialUIController, setMiniSidenav } from "./context/style-context";

import brandWhite from "./assets/images/logo-ct.png";
import brandDark from "./assets/images/logo-ct-dark.png";
import UserContext from "./context/user-context";

import axios from "axios";
import Swal from "sweetalert2";
import BusinessContext from "./context/business-context";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const SESSION_USER = 'SESSION_USER';
  const SESSION_BUSINESS = 'SESSION_BUSINESS';

  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);

  const login = (inputs) => {
    axios.post('/api/login', inputs)
      .then(async resp => {
        if (resp.data.ok) {
          setUser(resp.data.data);
          sessionStorage.setItem(SESSION_USER, JSON.stringify(resp.data.data));
          //#endregion Buscar la empresa del Usuario
          await axios.get(`/api/business/user/${resp.data.data.id}`)
            .then(resp => {
              if (resp.data.data[0]) {
                setBusiness(resp.data.data[0]);
                sessionStorage.setItem(SESSION_BUSINESS, JSON.stringify(resp.data.data[0]));
              }
            })
            .catch(error =>
              Swal.fire('Error', error.message, 'error'));
          //#endregion
          navigate('/');
        } else {
          Swal.fire('Login', resp.data.message, 'error');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const logout = () => {
    setUser(null);
    setBusiness(null);
    sessionStorage.clear();
    navigate('/authentication/sign-in');
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_USER)) {
      setUser(JSON.parse(sessionStorage.getItem(SESSION_USER)));
      navigate('/');
    } else {
      navigate('/authentication/sign-in');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Business Manager"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      {layout === "vr"}
      <UserContext.Provider value={{ user, setUser, login, logout }}>
        <BusinessContext.Provider value={{ business, setBusiness }}>
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </BusinessContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}
