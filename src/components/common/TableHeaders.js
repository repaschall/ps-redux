import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import TableHeader from "./TableHeader";
import * as directions from "../common/sortDirections";

const TableHeaders = ({ fields, items, onItemsChanged }) => {
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

  let filterRefs = {};
  fields.map(field => {
    filterRefs = { ...filterRefs, [field.name]: useRef(null) };
  });

  const handleFilterChange = event => {
    const { name, value } = event.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleSortDirectionChange = event => {
    const { name, value } = event.target;
    setSortDirections({ ...sortDirections, [name]: value });
  };

  useEffect(() => {
    const newItems = items.filter(item => {
      let passed = true;
      Object.getOwnPropertyNames(filterRefs).forEach(name => {
        const filterRef = filterRefs[name].current;
        if (!filterRef.isFilterActive()) return;
        passed = passed && filterRef.doesFilterPass(item[name]);
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

      newItems.sort((a, b) => {
        a = a[name].toUpperCase();
        b = b[name].toUpperCase();
        if (a < b) return sortDirection === directions.ASCENDING ? -1 : 1;
        if (a > b) return sortDirection === directions.ASCENDING ? 1 : -1;
        return 0;
      });
    });

    onItemsChanged(newItems);
  }, [filterValues, sortDirections]);

  return (
    <>
      {fields.map(field => {
        return (
          <TableHeader
            key={field.name}
            title={field.displayText}
            name={field.name}
            onSortDirectionChange={handleSortDirectionChange}
            onFilterChange={handleFilterChange}
            ref={filterRefs[field.name]}
          />
        );
      })}
    </>
  );
};

TableHeaders.propTypes = {
  fields: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  onItemsChanged: PropTypes.func.isRequired
};

export default TableHeaders;
