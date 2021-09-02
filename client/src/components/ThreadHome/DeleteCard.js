import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deletePost } from "../../js/actions/postActions";
const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));
  return (
    <div>
      <div>
        <AiOutlineDelete
          onClick={() => {
            if (window.confirm("Voulez-vous supprimer cet article ?")) {
              deleteQuote();
            }
          }}
        />
      </div>
    </div>
  );
};

export default DeleteCard;
