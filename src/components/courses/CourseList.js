import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TableHeader from "../common/TableHeader";
import * as directions from "../common/sortDirections";

const CourseList = ({ courses: initialCourses, onDeleteClick }) => {
  const [courses, setCourses] = useState([...initialCourses]);
  const [filterValues, setFilterValues] = useState({
    authorName: null,
    category: null,
    title: null
  });
  const [sortDirections, setSortDirections] = useState({
    authorName: null,
    category: null,
    title: null
  });

  const filterRefs = {
    authorName: useRef(null),
    category: useRef(null),
    title: useRef(null)
  };

  const handleFilterChange = event => {
    const { name, value } = event.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleSortDirectionChange = event => {
    const { name, value } = event.target;
    setSortDirections({ ...sortDirections, [name]: value });
  };

  useEffect(() => {
    const newCourses = initialCourses.filter(course => {
      let passed = true;
      Object.getOwnPropertyNames(filterRefs).forEach(name => {
        const filterRef = filterRefs[name].current;
        if (!filterRef.isFilterActive()) return;
        passed = passed && filterRef.doesFilterPass(course[name]);
      });
      return passed;
    });

    Object.getOwnPropertyNames(sortDirections).forEach(name => {
      const sortDirection = sortDirections[name];
      if (
        sortDirection !== directions.ASCENDING &&
        sortDirection !== directions.DESCENDING
      )
        return;

      newCourses.sort((a, b) => {
        a = a[name].toUpperCase();
        b = b[name].toUpperCase();
        if (a < b) {
          return sortDirection === directions.ASCENDING ? -1 : 1;
        }
        if (a > b) {
          return sortDirection === directions.ASCENDING ? 1 : -1;
        }
        return 0;
      });
    });

    setCourses(newCourses);
  }, [filterValues, sortDirections]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <TableHeader
            title="Title"
            name="title"
            onSortDirectionChange={handleSortDirectionChange}
            onFilterChange={handleFilterChange}
            ref={filterRefs.title}
          />
          <TableHeader
            title="Author"
            name="authorName"
            onSortDirectionChange={handleSortDirectionChange}
            onFilterChange={handleFilterChange}
            ref={filterRefs.authorName}
          />
          <TableHeader
            title="Category"
            name="category"
            onSortDirectionChange={handleSortDirectionChange}
            onFilterChange={handleFilterChange}
            ref={filterRefs.category}
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
