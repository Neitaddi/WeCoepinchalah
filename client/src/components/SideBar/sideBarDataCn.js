import React from "react";
import { FiHome } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";

export const sideBarDataCn = [
  {
    title: "Profil",
    path: "/profil",

    icon: <IoPersonOutline />,
    cName: "side-text",
  },
  {
    title: "Acceuil",
    path: "/",

    icon: <FiHome />,
    cName: "side-text",
  },
  {
    title: "Clubs",
    path: "/clubs",
    icon: <AiOutlineTeam />,
    cName: "side-text",
  },
];
