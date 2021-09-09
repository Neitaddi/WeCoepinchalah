import axios from "axios";
import {
  GET_TACHES,
  UPDATE_TACHE,
  DELETE_TACHE,
} from "../constatnts/tacheActionTypes";
export const getTaches = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/tache/`)
      .then((res) => {
        dispatch({ type: GET_TACHES, payload: res.data });
        console.log("getTaches", res);
      })
      .catch((err) => console.log(err));
  };
};

export const addTache = (
  createrId,
  tacheClub,
  tacheDepartment,
  tacheMembre,
  tacheObjet,
  tacheDescription,
  tacheStart,
  tacheEnd
) => {
  const data = {
    createrId,
    tacheClub,
    tacheDepartment,
    tacheMembre,
    tacheObjet,
    tacheDescription,
    tacheStart,
    tacheEnd,
  };

  return axios
    .post(`${process.env.REACT_APP_API_URL}api/tache/${tacheClub}`, data)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTache = (
  tacheId,
  tacheDepartment,
  tacheMembre,
  tacheObjet,
  tacheDescription,
  tacheStart,
  tacheEnd
) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/tache/` + tacheId,
      data: {
        tacheDepartment,
        tacheMembre,
        tacheObjet,
        tacheDescription,
        tacheStart,
        tacheEnd,
      },
    })
      .then((res) => {
        dispatch({ type: UPDATE_TACHE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteTache = (tacheId, tacheClub) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/department/${tacheId}`,
      data: { id: tacheClub },
    })
      .then((res) => {
        dispatch({ type: DELETE_TACHE, payload: { tacheId } });
      })
      .catch((err) => console.log(err));
  };
};
