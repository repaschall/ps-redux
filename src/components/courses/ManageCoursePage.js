import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { newCourse } from "../../../tools/mockData";
import { loadAuthors } from "../../redux/actions/authorActions";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import Spinner from "../common/Spinner";
import CourseForm from "./CourseForm";

export function ManageCoursePage({
  authors,
  course: initialCourse,
  courses,
  history,
  loadAuthors,
  loadCourses,
  loading,
  saveCourse
}) {
  const [course, setCourse] = useState({ ...initialCourse });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => alert(`Loading courses failed ${error}`));
    } else {
      setCourse({ ...initialCourse });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => alert(`Loading authors failed ${error}`));
    }
  }, [initialCourse]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.authorId = "Author is required.";
    if (!category) errors.category = "Category is required.";

    setErrors(errors);

    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return loading ? (
    <Spinner />
  ) : (
    <CourseForm
      authors={authors}
      course={course}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saveCourse: PropTypes.func.isRequired
};

function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    authors: state.authors,
    course,
    courses: state.courses,
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = { loadAuthors, loadCourses, saveCourse };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
