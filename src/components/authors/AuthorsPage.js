import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { deleteAuthor, loadAuthors } from "../../redux/actions/authorActions";
import { loadCourses } from "../../redux/actions/courseActions";
import Spinner from "../common/Spinner";
import AuthorList from "./AuthorList";

export function AuthorsPage({
  authors,
  courses,
  deleteAuthor,
  history,
  loadAuthors,
  loadCourses,
  loading
}) {
  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => alert(`Loading authors failed ${error}`));
    }

    if (courses.length === 0) {
      loadCourses().catch(error => alert(`Loading courses failed ${error}`));
    }
  }, []);

  const handleDeleteAuthor = async author => {
    const authorCourses = courses.filter(
      course => course.authorId === author.id
    );
    if (authorCourses.length > 0) {
      toast.error(`Cannot delete author with courses.`);
      return;
    }

    toast.success("Author deleted");
    try {
      await deleteAuthor(author);
    } catch (error) {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    }
  };

  return (
    <>
      <h2>Authors</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="btn btn-primary mb-3 add-author"
            onClick={() => history.push("/author")}
          >
            Add Author
          </button>
          <AuthorList authors={authors} onDeleteClick={handleDeleteAuthor} />
        </>
      )}
    </>
  );
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors:
      state.courses.length === 0
        ? []
        : state.authors.map(author => {
            return {
              ...author,
              courseCount:
                state.courses.filter(course => course.authorId === author.id)
                  ?.length || 0
            };
          }),
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = { deleteAuthor, loadAuthors, loadCourses };

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
