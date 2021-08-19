import React from "react";
import { FiHome } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";

export const sideBarData = [
  {
    title: "Acceuil",
    path: "/",

    icon: <FiHome />,
    cName: "side-text",
  },
  {
    title: "Clubs",
    path: "/reports",
    icon: <AiOutlineTeam />,
    cName: "side-text",
  },
];
