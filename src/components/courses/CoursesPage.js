import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { loadAuthors } from "../../redux/actions/authorActions";
import { deleteCourse, loadCourses } from "../../redux/actions/courseActions";
import Spinner from "../common/Spinner";
import CourseList from "./CourseList";

export function CoursesPage({
  authors,
  courses,
  deleteCourse,
  history,
  loadAuthors,
  loadCourses,
  loading
}) {
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => alert(`Loading courses failed ${error}`));
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => alert(`Loading authors failed ${error}`));
    }
  }, []);

  const handleDeleteCourse = async course => {
    toast.success("Course deleted");
    try {
      await deleteCourse(course);
    } catch (error) {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    }
  };

  return (
    <>
      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="btn btn-primary mb-3 add-course"
            onClick={() => history.push("/course")}
          >
            Add Course
          </button>
          <CourseList courses={courses} onDeleteClick={handleDeleteCourse} />
        </>
      )}
    </>
  );
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(i => i.id === course.authorId).name
            };
          }),
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = { deleteCourse, loadAuthors, loadCourses };

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
