import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const RenderDatePicker = ({
  label,
  selected,
  onSelect,
  onChangeRaw,
  meta: { touched, error, asyncValidating }
}) =>
  (
    <Fragment>
      <label className={`${label ? 'label_input' : 'label_empty_input'}`}>{label}</label>
      <div className={`${asyncValidating ? 'async-validating' : 'w-100'}`}>
        <DatePicker
          dateFormat="YYYY-MM-DD"
          selected={selected}
          onChange={onSelect}
          className="melotic-datepicker"
          onChangeRaw={onChangeRaw}
          maxDate={moment()}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
        />
      </div>
      {touched &&
        (error &&
          <small className="float-left mt-1 text-muted">
            {error}
          </small>
        )
      }
    </Fragment>
  );

RenderDatePicker.propTypes = {
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChangeRaw: PropTypes.func.isRequired,
};

export default RenderDatePicker;
