import React, { useContext, useState, useEffect } from "react";
import { UidContext } from "../../components/AppContext";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../js/actions/postActions";
const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.postLikers.includes(uid)) setLiked(true);
  }, [uid, post.postLikers, liked]);
  return (
    <div className="likeContainer">
      {uid === null && (
        <Popup
          trigger={<FcLikePlaceholder />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}
      {uid && liked === false && <FcLikePlaceholder onClick={like} />}

      {uid && liked && <FcLike onClick={unlike} />}
      {post.postLikers.length}
    </div>
  );
};

export default LikeButton;
