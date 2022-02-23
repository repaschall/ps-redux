import PropTypes from "prop-types";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { FaFilter } from "react-icons/fa";

const TableHeaderInputFilter = forwardRef(
  ({ inputType, name, onFilterChange }, ref) => {
    const [filterText, setFilterText] = useState("");
    const [filterVisible, setFilterVisible] = useState(false);
    const filterInput = useRef(null);

    useImperativeHandle(ref, () => {
      return {
        doesFilterPass(value) {
          const passed =
            value.toString().toLowerCase().indexOf(filterText.toLowerCase()) >=
            0;
          return passed;
        },
        getFilterText() {
          return filterText;
        },
        isFilterActive() {
          return filterText !== null && filterText !== "";
        }
      };
    });

    useEffect(() => {
      if (filterVisible) filterInput.current.focus();
      return () => {};
    }, [filterVisible]);

    function handleFilterChange(event) {
      const { value } = event.target;
      setFilterText(value);
      onFilterChange(event);
    }

    return (
      <>
        <button
          className="btn btn-outline-secondary text-dark ms-2 p-2 py-0"
          onClick={() => setFilterVisible(true)}
          disabled={filterVisible}
        >
          <FaFilter size="0.66em" />
        </button>
        {filterVisible && (
          <div className="th-filter-handle position-absolute bottom-100 start-0 bg-light border border-secondary rounded p-1">
            <input
              type={inputType}
              name={name}
              className="form-control form-control-sm"
              onChange={handleFilterChange}
              onBlur={() => setFilterVisible(false)}
              ref={filterInput}
              value={filterText}
            />
          </div>
        )}
      </>
    );
  }
);

TableHeaderInputFilter.displayName = "TableHeaderInputFilter";

TableHeaderInputFilter.propTypes = {
  inputType: PropTypes.string,
  name: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

TableHeaderInputFilter.defaultProps = {
  inputType: "text",
  name: null,
  onFilterChange: null
};

export default TableHeaderInputFilter;
