import React from "react";
import { FiHome } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";

export const DataSideBarProfilClub = [
  {
    title: "Acceuil",
    path: "/club",
    icon: <FiHome />,
    cName: "side-text",
  },
  {
    title: "Profil",
    path: "/club",
    icon: <IoPersonOutline />,
    cName: "side-text",
  },
  {
    title: "Départements",
    path: "/club",
    icon: <AiOutlineTeam />,
    cName: "side-text",
  },
  {
    title: "Tâches",
    path: "/club",
    icon: <HiOutlineClipboardList />,
    cName: "side-text",
  },
];
