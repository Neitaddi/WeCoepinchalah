import {
  GET_POSTES,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
  DELETE_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../constatnts/postActionTypes";
const initialState = { postes: [] };

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTES:
      return { postes: action.payload };

    case LIKE_POST:
      return state.postes.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            postLikers: [action.payload.userId, ...post.postLikers],
          };
        }
        return post;
      });

    case UNLIKE_POST:
      return state.postes.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            postLikers: post.postLikers.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return post;
      });

    case UPDATE_POST:
      return state.postes.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            postMessage: action.payload.postMessage,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.postes.filter((post) => post._id !== action.payload.postId);

    case EDIT_COMMENT:
      return state.postes.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            postComments: post.postComments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  commentText: action.payload.commentText,
                };
              } else {
                return comment;
              }
            }),
          };
        } else return post;
      });

    case DELETE_COMMENT:
      return state.postes.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            postComments: post.postComments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    default:
      return state;
  }
}
