import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import * as directions from "./sortDirections";

const TableHeaderSorter = ({ children, name, onSortDirectionChange }) => {
  const [sortDirection, setSortDirection] = useState("");

  function handleSortDirectionChange(event) {
    event.preventDefault();

    const newSortDirection = getNextSortDirection(sortDirection);
    setSortDirection(newSortDirection);

    event.target.name = name;
    event.target.value = newSortDirection;
    onSortDirectionChange(event);
  }

  function getNextSortDirection() {
    switch (sortDirection) {
      case directions.ASCENDING:
        return directions.DESCENDING;
      case directions.DESCENDING:
        return "";
      default:
        return directions.ASCENDING;
    }
  }

  return (
    <a onClick={handleSortDirectionChange}>
      {children}
      {sortDirection == directions.ASCENDING ||
      sortDirection == directions.DESCENDING ? (
        <span className="ms-0">
          {sortDirection === directions.ASCENDING ? (
            <FaSortUp />
          ) : sortDirection === directions.DESCENDING ? (
            <FaSortDown />
          ) : null}
        </span>
      ) : null}
    </a>
  );
};

TableHeaderSorter.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  onSortDirectionChange: PropTypes.func.isRequired
};

export default TableHeaderSorter;
