import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import { getPosts } from "../../js/actions/postActions";
import { getUsers } from "../../js/actions/usersActions";
import { dateParser } from "../Profil/utils";
import { AiOutlineComment } from "react-icons/ai";

import LikeButton from "../post/LikeButton";
import Card from "./Card";
import "./ThreadHome.css";
const ThreadHome = () => {
  const dispatch = useDispatch();

  const [loadPost, setLoadPost] = useState(true);
  const postes = useSelector((state) => state.postes.postes);
  const usersData = useSelector((state) => state.usersReducer);
  const clubsData = useSelector((state) => state.clubs.clubs);
  console.log("clubsData", clubsData);
  console.log("usersData", usersData);

  console.log("posts", postes);
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());

      setLoadPost(false);
    }
  }, [loadPost, dispatch]);
  useEffect(() => {
    if (loadPost) {
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <div>
      <ul>
        {postes &&
          postes.map((post) => {
            for (let i = 0; i < clubsData.length; i++) {
              if (post.posterClub === clubsData[i]._id) {
                return (
                  <Card post={post} key={post._id} clubsData={clubsData[i]} />
                  // <div className="cardPost">
                  //   <div className="tetePostHome">
                  //     <div className="circular--landscape">
                  //       <img
                  //         class="circular--photo"
                  //         src={clubsData[i].clubPicture}
                  //         alt="user-pic"
                  //       />
                  //     </div>
                  //     {/* <img src={clubsData[i].clubPicture} /> */}
                  //     <div>{clubsData[i].clubName}</div>
                  //     <div className="datePost">
                  //       {dateParser(post.createdAt)}
                  //     </div>
                  //   </div>
                  //   <div className="MessagePost">{post.postMessage}</div>
                  //   {post.postVideo && (
                  //     <iframe
                  //       width="500"
                  //       height="300"
                  //       src={post.video}
                  //       frameBorder="0"
                  //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  //       allowFullScreen
                  //       title={post._id}
                  //     ></iframe>
                  //   )}
                  //   <div>img</div>
                  //   <div>
                  //     <div clubName="coment">
                  //       <div clubName="nembreCmt">
                  //         <AiOutlineComment /> {post.postComments.length}
                  //       </div>
                  //       <div></div>
                  //       <LikeButton post={post} />
                  //     </div>
                  //   </div>
                  // </div>
                );
              }
            }
          })}
      </ul>
    </div>
  );
};

export default ThreadHome;
