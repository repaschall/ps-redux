import * as courseApi from "../../api/courseApi";
import * as types from "./actionTypes";
import { beginApiCall, endApiCall } from "./apiStatusActions";

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourse(course) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // or apiCallError actions since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        dispatch(endApiCall());
      });
  };
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      })
      .finally(() => {
        dispatch(endApiCall());
      });
  };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}
