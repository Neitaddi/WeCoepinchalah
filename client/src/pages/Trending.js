import React from "react";
import "./Trending.css";
import { useSelector } from "react-redux";
const Trending = () => {
  const userData = useSelector((state) => state.userReducer);
  return (
    <div>
      <img src={userData.userPicture} />
    </div>
  );
};

export default Trending;
// {clublist &&
//   clublist
//     .filter((club) => club._id === id)
//     .map((club, index) => (
//       <div key={index}>
//         <div className="bgAcceuilCb">
//           <div role="navigation" className="navLeftCb">
//             {" "}
//             <Link to="/">
//               <img
//                 className="logoClub"
//                 src="/img/wecoepiLogo.png"
//                 alt="logo wecoepi"
//               />
//             </Link>

//             <div className="divImg">
//               <img src={club.clubPicture} />
//               <UploadImgClub />
//             </div>

//             <div>{club.clubName}</div>
//             <SideBarProfilClub />
//           </div>
//           <div role="main" className="navMiddleCb">
//             {" "}
//             <div role="main" className="topCb"></div>
//             <div role="main" className="buttomCb">
//               {" "}
//               <img src={club.createrId.clubPicture} alt="userpicture" />
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
