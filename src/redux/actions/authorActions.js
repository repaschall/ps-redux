import * as authorApi from "../../api/authorApi";
import * as types from "./actionTypes";
import { beginApiCall, endApiCall } from "./apiStatusActions";

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function deleteAuthor(author) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // or apiCallError actions since we're not showing the loading status for this.
    dispatch(deleteAuthorOptimistic(author));
    return authorApi.deleteAuthor(author.id);
  };
}

export function deleteAuthorOptimistic(author) {
  return { type: types.DELETE_AUTHOR_OPTIMISTIC, author };
}

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        dispatch(endApiCall());
      });
  };
}

export function saveAuthor(author) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .saveAuthor(author)
      .then(savedAuthor => {
        author.id
          ? dispatch(updateAuthorSuccess(savedAuthor))
          : dispatch(createAuthorSuccess(savedAuthor));
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        dispatch(endApiCall());
      });
  };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}
