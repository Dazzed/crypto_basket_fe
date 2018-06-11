import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, asyncValidating },
  disabled,
  rows
}) =>
  (
    <Fragment>
      <label className={`${label ? 'label_input' : 'label_empty_input'}`}>{label}</label>
      <div className={`${asyncValidating ? 'async-validating' : 'w-100'}`}>
        <textarea
          className={
            'field_input' +
            `${error && touched ? ' error_input' : ''}` +
            `${(input.name === 'username' && !asyncValidating && !error && touched) ? ' avaliable_user' : ''}` +
            `${disabled ? ' field_read_only' : ''}`
          }
          {...input}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          style={disabled ? { cursor: 'not-allowed', height: 'auto' } : { height: 'auto' }}
          rows={rows || 2}
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

TextArea.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
};

export default TextArea;
