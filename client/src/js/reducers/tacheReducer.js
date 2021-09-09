import {
  GET_TACHES,
  UPDATE_TACHE,
  DELETE_TACHE,
} from "../constatnts/tacheActionTypes";
const initialState = { taches: [] };

export default function tacheReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TACHES:
      return {
        ...state,
        taches: action.payload,
      };
    case UPDATE_TACHE:
      return state.taches.map((tache) => {
        if (tache._id === action.payload.tacheId) {
          return {
            ...tache,
            tacheClub: action.payload.tacheClub,
            tacheDepartment: action.payload.tacheDepartment,
            tacheMembre: action.payload.tacheMembre,
            tacheObjet: action.payload.tacheObjet,
            tacheDescription: action.payload.tacheDescription,
            tacheStart: action.payload.tacheStart,
            tacheEnd: action.payload.tacheEnd,
          };
        } else return tache;
      });
    case DELETE_TACHE:
      return state.taches.filter(
        (tache) => tache._id !== action.payload.tacheId
      );

    default:
      return state;
  }
}
