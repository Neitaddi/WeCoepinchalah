import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../js/actions/userActions";
import "./uploadeImg.css";
import { BsPersonBoundingBox } from "react-icons/bs";
const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userName", userData.userName);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <div>
        <label className="labelImg" htmlFor="file">
          Changer l'image
        </label>
        <input
          className="changeImg"
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <div>
        <label className="labelAddImg" htmlFor="submit">
          <BsPersonBoundingBox />
        </label>
        <input
          className="ajouterImg"
          type="submit"
          value="Envoyer"
          id="submit"
          name="submit"
        />
      </div>
    </form>
  );
};

export default UploadImg;
