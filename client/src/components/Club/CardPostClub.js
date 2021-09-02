import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser } from "../Profil/utils";
import { AiOutlineComment } from "react-icons/ai";
import LikeButton from "../post/LikeButton";
import { updatePost } from "../../js/actions/postActions";
import { HiOutlinePencilAlt } from "react-icons/hi";

import CardComents from "../ThreadHome/CardComents";
import DeleteCard from "../ThreadHome/DeleteCard";

const CardPostClub = ({ post, clublist, idC }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };
  return (
    <div key={post._id}>
      <div className="cardPost">
        <div className="tetePostHome">
          <div className="circular--landscape">
            <img
              class="circular--photo"
              src={clublist.clubPicture}
              alt="user-pic"
            />
          </div>
          {/* <img src={clublist[i].clubPicture} /> */}
          <div>{clublist.clubName}</div>
          <div className="datePost">{dateParser(post.createdAt)}</div>
        </div>

        {isUpdated === false && <p>{post.postMessage}</p>}
        {isUpdated && (
          <div className="update-post">
            <textarea
              defaultValue={post.postMessage}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
            <div className="button-container">
              <button className="btn" onClick={updateItem}>
                Valider modification
              </button>
            </div>
          </div>
        )}
        {userData._id === post.posterId && (
          <div className="button-container">
            <div>
              <HiOutlinePencilAlt onClick={() => setIsUpdated(!isUpdated)} />
            </div>
            <DeleteCard id={post._id} />
          </div>
        )}

        {post.postVideo && (
          <iframe
            width="500"
            height="300"
            src={post.video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={post._id}
          ></iframe>
        )}

        {post.postPicture && (
          <img src={post.postPicture} alt="card-pic" className="card-pic" />
        )}

        <div className="card-footer">
          <div className="comment-icon">
            <AiOutlineComment onClick={() => setShowComments(!showComments)} />
            {post.postComments.length}
          </div>
          <LikeButton post={post} />
        </div>
        {showComments && <CardComents post={post} />}
      </div>
    </div>
  );
};

export default CardPostClub;
