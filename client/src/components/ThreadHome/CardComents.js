import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../js/actions/postActions";
import { isEmpty, timestampParser } from "../Profil/utils";
import "./CardComents.css";
import EditDeleteComment from "./EditDeleteComment";
const CardComents = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.userName))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };

  return (
    <div className="postComments-container">
      {post.postComments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="comment-C">
              <div className="left-part-C">
                <div className="circular--landscape">
                  <img
                    class="circular--photo"
                    src={
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === comment.commenterId)
                            return user.userPicture;
                          else return null;
                        })
                        .join("")
                    }
                    alt="commenter-pic"
                  />
                </div>
              </div>
              {/* .........................right */}
              <div className="right-part-C">
                <div className="comment-header">
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === comment.commenterId)
                          return user.userName;
                        else return null;
                      })
                      .join("")}
                  <span className="time-C">
                    {timestampParser(comment.commentTimestamp)}
                  </span>
                </div>
                <p>{comment.commentText}</p>
                <EditDeleteComment comment={comment} postId={post._id} />
              </div>
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComents;
