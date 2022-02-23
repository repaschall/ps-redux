import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import TableHeaderInputFilter from "./TableHeaderFilter";
import TableHeaderSorter from "./TableHeaderSorter";
import "./TableHeader.scss";

const TableHeader = forwardRef(
  ({ name, onFilterChange, onSortDirectionChange, title }, filterRef) => {
    const allowFiltering = onFilterChange !== null;
    const allowSorting = onSortDirectionChange !== null;

    let titleElement = <span className="th-title">{title}</span>;
    if (allowSorting) {
      titleElement = (
        <TableHeaderSorter
          displayText={title}
          name={name}
          onSortDirectionChange={onSortDirectionChange}
        >
          {titleElement}
        </TableHeaderSorter>
      );
    }

    let filterElement = allowFiltering ? (
      <TableHeaderInputFilter
        name={name}
        onFilterChange={onFilterChange}
        ref={filterRef}
      />
    ) : null;

    return (
      <th className={allowFiltering ? "position-relative" : null}>
        {titleElement}
        {filterElement}
      </th>
    );
  }
);

TableHeader.displayName = "TableHeader";

TableHeader.propTypes = {
  name: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func,
  onSortDirectionChange: PropTypes.func,
  title: PropTypes.string.isRequired
};

TableHeader.defaultProps = {
  name: "",
  onFilterChange: null,
  onSortDirectionChange: null,
  title: ""
};

export default TableHeader;
