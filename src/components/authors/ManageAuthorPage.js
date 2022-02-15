import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { newAuthor } from "../../../tools/mockData";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";
import AuthorForm from "./AuthorForm";

export function ManageAuthorPage({
  author: initialAuthor,
  authors,
  history,
  loadAuthors,
  loading,
  saveAuthor
}) {
  const [author, setAuthor] = useState({ ...initialAuthor });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => alert(`Loading authors failed ${error}`));
    } else {
      setAuthor({ ...initialAuthor });
    }
  }, [initialAuthor]);

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      [name]: value
    }));
  }

  function formIsValid() {
    const { name } = author;
    const errors = {};

    if (!name) errors.title = "Name is required.";

    setErrors(errors);

    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveAuthor(author)
      .then(() => {
        toast.success("Author saved.");
        history.push("/authors");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return loading ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saveAuthor: PropTypes.func.isRequired
};

function getAuthorBySlug(authors, slug) {
  return authors.find(author => author.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const author =
    slug && state.authors.length > 0
      ? getAuthorBySlug(state.authors, slug)
      : newAuthor;
  return {
    author: author,
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = { loadAuthors, saveAuthor };

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
