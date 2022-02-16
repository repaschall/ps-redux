import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const CourseList = ({ courses, onDeleteClick, onFilterChange }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const filterInput = useRef(null);

  useEffect(() => {
    if (filterVisible) {
      filterInput.current.focus();
    }
    return () => {};
  }, [filterVisible]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th className="position-relative">
            <span style={{ verticalAlign: "middle" }}>Title</span>
            <button
              className="btn btn-outline-secondary ms-2 p-2 py-0"
              onClick={() => setFilterVisible(true)}
              disabled={filterVisible}
            >
              <FaFilter size="0.66em" />
            </button>
            {filterVisible && (
              <div
                style={{
                  boxSizing: "border-box",
                  width: "100%"
                }}
                className="position-absolute bottom-100 start-0 bg-light border border-secondary rounded p-1"
              >
                <input
                  type="text"
                  name="title"
                  className="form-control form-control-sm"
                  onChange={onFilterChange}
                  onBlur={() => setFilterVisible(false)}
                  ref={filterInput}
                />
              </div>
            )}
          </th>
          <th>Author</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {courses.map(course => {
          return (
            <tr key={course.id}>
              <td>
                <a
                  className="btn btn-light"
                  href={"http://pluralsight.com/courses/" + course.slug}
                >
                  Watch
                </a>
              </td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorName}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(course)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default CourseList;
