// FormContext.js
import React, { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FormContext = createContext();

/**
 * Higher-order component providing form state and functionality.
 *
 * @component
 * @param {Object} props - React component props.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 * @returns {JSX.Element} The JSX element representing the form wrapper.
 */
export const FormWrapper = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /**
   * Handles the submission of multiple entries by updating the URL with query parameters.
   *
   * @function
   * @param {Object} params - Query parameters for multi-entry submission.
   */
  const handleMultiEntrySubmit = (params) => {
    const queryString = new URLSearchParams(params).toString();
    navigate(`/?${queryString}`);
  };

  /**
   * useEffect hook to update form data based on URL search parameters. Useful for multi step forms
   *
   * @function
   */
  useEffect(() => {
    const newFormData = {};
    let hasNewData = false;

    for (let [key, value] of searchParams.entries()) {
      newFormData[key] = value;
      hasNewData = true;
    }

    if (hasNewData) {
      setFormData((prev) => ({ ...prev, ...newFormData }));
    }
  }, [searchParams]);

  /**
   * Validates the input value based on provided validators.
   *
   * @function
   * @param {string} name - The name of the input field.
   * @param {string} value - The value of the input field.
   * @param {Array} validators - Array of validation functions and error messages.
   * @returns {boolean} True if validation passes, false otherwise.
   */
  const validateInput = useCallback((name, value, validators) => {
    if (validators && validators.length > 0) {
      for (let validator of validators) {
        if (!validator.test(value)) {
          setValidationErrors((prev) => ({ ...prev, [name]: validator.message }));
          return false;
        }
      }
    }
    setValidationErrors((prev) => ({ ...prev, [name]: null }));
    return true;
  }, []);

  /**
   * Handles input change events, updating form data and performing validation.
   *
   * @function
   * @param {Object} event - The change event object.
   * @param {Array} validators - Array of validation functions and error messages.
   */
  const handleChange = useCallback(
    (event, validators) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateInput(name, value, validators);
    },
    [validateInput],
  );

  const contextValue = {
    formData,
    setFormData,
    handleChange,
    validationErrors,
    handleMultiEntrySubmit,
    searchParams,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {/* TODO: form should be broken out into `compoennts/RadFishForm` */}
      <form
        // TODO: styles should be broken out into `components/RadfishForm/styles.css
        className="radfish-form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.(formData);
        }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

/**
 * Custom hook for accessing the form state from the context. Can be used by a child of FormWrapper
 *
 * @function
 * @returns {Object} Form state and functions.
 * @throws {Error} Throws an error if used outside of a FormWrapper.
 */
export const useFormState = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormState must be used within a FormWrapper");
  }
  return context;
};
