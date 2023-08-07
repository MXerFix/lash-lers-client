import React, { createRef } from "react";
import { AboutMe } from "./pages/AboutMe/AboutMe";
import { Admin } from "./pages/Admin/Admin";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home/Home";
import { OnlineEntry } from "./pages/OnlineEntry/OnlineEntry";
import { Portfolio } from "./pages/Portfolio/Portfolio";
import { PriceList } from "./pages/PriceList/PriceList";
import { Profile } from "./pages/Profile/Profile";
import { Support } from "./pages/Support/Support";
import { ABOUT_ROUTE, ADMIN_ROUTE, AUTH_ROUTE, ENTRY_ROUTE, HOME_ROUTE, PORTFOLIO_ROUTE, PRICELIST_ROUTE, PROFILE_ROUTE, SUPPORT_ROUTE } from "./utils/consts";


export const publicRoutes = [
  {
    path: HOME_ROUTE,
    element: <Home />,
    nodeRef: createRef()
  },
  {
    path: ABOUT_ROUTE,
    element: <AboutMe />,
    nodeRef: createRef()
  },
  {
    path: PRICELIST_ROUTE,
    element: <PriceList />,
    nodeRef: createRef()
  },
  {
    path: PORTFOLIO_ROUTE,
    element: <Portfolio />,
    nodeRef: createRef()
  },
  {
    path: ENTRY_ROUTE,
    element: <OnlineEntry />,
    nodeRef: createRef()
  },
  {
    path: SUPPORT_ROUTE,
    element: <Support />,
    nodeRef: createRef()
  },
  {
    path: AUTH_ROUTE,
    element: <Auth />,
    nodeRef: createRef()
  },
  {
    path: PROFILE_ROUTE,
    element: <Auth />,
    nodeRef: createRef()
  },
  // {
  //   path: ADMIN_ROUTE,
  //   element: <Admin />,
  //   nodeRef: createRef()
  //   // FIXME: DELETE THIS ON PRODUCTION OR ADD THE ADMIN MIDDLEWARE INTO SERVER ROUTER
  // }
]

export const authRoutes = [
  {
    path: HOME_ROUTE,
    element: <Home />,
    nodeRef: createRef()
  },
  {
    path: ABOUT_ROUTE,
    element: <AboutMe />,
    nodeRef: createRef()
  },
  {
    path: PRICELIST_ROUTE,
    element: <PriceList />,
    nodeRef: createRef()
  },
  {
    path: PORTFOLIO_ROUTE,
    element: <Portfolio />,
    nodeRef: createRef()
  },
  {
    path: PROFILE_ROUTE,
    element: <Profile />,
    nodeRef: createRef()
  },
  {
    path: AUTH_ROUTE,
    element: <Profile />,
    nodeRef: createRef()
  },
  {
    path: ENTRY_ROUTE,
    element: <OnlineEntry />,
    nodeRef: createRef()
  },
  {
    path: SUPPORT_ROUTE,
    element: <Support />,
    nodeRef: createRef()
  },
  // {
  //   path: ADMIN_ROUTE,
  //   element: <Admin />,
  //   nodeRef: createRef()
  //   // FIXME: DELETE THIS ON PRODUCTION OF ADD THE ADMIN MIDDLEWARE INTO SERVER ROUTER
  // }
]