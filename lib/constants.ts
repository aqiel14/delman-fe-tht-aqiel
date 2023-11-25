import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

import { LuUsers } from "react-icons/lu";
import { PiUserPlus } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { FaBeer } from "react-icons/fa";

export const menuConstants = [
  { title: "Menu", path: "/", icon: React.createElement(HiOutlineMenuAlt2) },
  {
    title: "Dashboard",
    path: "/sales",
    icon: React.createElement(MdDashboard),
  },
  { title: "Users", path: "/users", icon: React.createElement(LuUsers) },
  {
    title: "Registration",
    path: "/register",
    icon: React.createElement(PiUserPlus),
  },
  { title: "Search", path: "/search", icon: React.createElement(CiSearch) },
];
