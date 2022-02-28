import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TableHeaders from "../common/TableHeaders";

const CourseList = ({ courses: initialCourses, onDeleteClick }) => {
  const [courses, setCourses] = useState([...initialCourses]);

  const courseFields = [
    {
      displayText: "Title",
      name: "title"
    },
    {
      displayText: "Author",
      name: "authorName"
    },
    {
      displayText: "Category",
      name: "category"
    }
  ];

  function handleCoursesChanged(newCourses) {
    setCourses(newCourses);
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <TableHeaders
            fields={courseFields}
            items={initialCourses}
            onItemsChanged={handleCoursesChanged}
          />
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
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseList;
