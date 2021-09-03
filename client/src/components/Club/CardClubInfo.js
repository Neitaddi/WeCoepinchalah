import React from "react";
import "./CardClubInfo.css";
import { IoMailOutline } from "react-icons/io5"; //emailIcon
import { BsAward } from "react-icons/bs"; //ctegori Icon
import { MdLocationOn } from "react-icons/md"; //locetion icon
import { FaPhone } from "react-icons/fa"; //phone Icon
import { AiOutlineGlobal } from "react-icons/ai"; //website icon

const CardClubInfo = ({ user, clublist, idC }) => {
  return (
    <div>
      <div className="CardInfo">
        <div className="ClubNameInfo">{clublist.clubName}</div>
        <div className="ClubCreaterInfo">
          {user.userName} {user.userLastName}
        </div>
        <div className="ClubDescInfo">{clublist.clubDescription}</div>
        <div className="pointInfoClub">
          <div className="contactClubInfo">
            <div className="ClubCategInfo">
              <BsAward className="catgIcon" />
              {clublist.clubCategorie}
            </div>
            <div className="ClubLocationInfo">
              <MdLocationOn className="locatIcon" />
              {clublist.clubLocatioun}
            </div>
          </div>
          <div className="labelContact">Contact</div>
          <div className="contactL">
            {" "}
            <div className="ClubEmailInfo">
              <IoMailOutline className="EmailIcon" />
              {clublist.clubEmail}
            </div>
            <div className="ClubPhoneInfo">
              <FaPhone className="phoneIcon" />
              {clublist.clubPhone}
            </div>
            <div className="ClubWebSiteInfo">
              {" "}
              <AiOutlineGlobal className="webIcon" />
              {clublist.clubWebSite}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClubInfo;
