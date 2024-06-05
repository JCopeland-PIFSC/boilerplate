import "../styles/theme.css";
import React, { useState } from "react";
import {
  FormGroup,
  Grid,
  TextInput,
  Button,
  Label,
  ErrorMessage,
  Form,
} from "@trussworks/react-uswds";
import { CONSTANTS } from "../config/form";
import { fullNameValidators } from "../utilities/fieldValidators";

const { fullName } = CONSTANTS;

const FieldValidatorForm = () => {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };
      return updatedForm;
    });
  };

  const handleBlur = (event, validators) => {
    const { name, value } = event.target;
    setValidationErrors((prev) => ({
      ...prev,
      ...handleInputValidationLogic(name, value, validators),
    }));
  };

  const handleInputValidationLogic = (name, value, validators) => {
    if (validators && validators.length > 0) {
      for (let validator of validators) {
        if (!validator.test(value)) {
          return { [name]: validator.message };
        }
      }
    }
    return { [name]: null };
  };

  return (
    <Form className="maxw-full margin-205 padding-205 bg-white radius-8px shadow-2">
      <FormGroup>
        <Label className="text-bold" htmlFor={fullName}>
          Full Name
        </Label>
        <TextInput
          id={fullName}
          name={fullName}
          type="text"
          placeholder="Full Name"
          value={formData[fullName] || ""}
          aria-invalid={validationErrors[fullName] ? "true" : "false"}
          validationStatus={validationErrors[fullName] ? "error" : undefined}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e, fullNameValidators)}
        />
        {validationErrors[fullName] && <ErrorMessage>{validationErrors[fullName]}</ErrorMessage>}
        <Grid className="display-flex flex-justify">
          <Button
            disabled={validationErrors[fullName]}
            type="submit"
            className="margin-top-1 margin-right-0 order-last"
          >
            Submit
          </Button>
        </Grid>
      </FormGroup>
    </Form>
  );
};

export { FieldValidatorForm };
