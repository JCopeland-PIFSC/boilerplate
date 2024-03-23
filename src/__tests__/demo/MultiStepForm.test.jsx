import React from "react";
import { render, fireEvent, getAllByRole, queryAllByRole, screen } from "@testing-library/react";
import * as formWrapper from "../../contexts/FormWrapper";
import * as useMultiFormState from "../../hooks/useMultiStepForm";
import * as reactRouter from "react-router-dom";
import { MultiStepForm } from "../../demos/MultiStepForm";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
}));

describe("Multistep Form", () => {
  it("renders children and passes context values correctly", async () => {
    const mockedFormData = { currentStep: 2 };
    const mockedValidationErrors = {};
    const mockedHandleChange = vi.fn();
    const mockedHandleBlur = vi.fn();
    const mockedUseFormState = vi.fn(() => ({
      formData: mockedFormData,
      validationErrors: mockedValidationErrors,
      handleChange: mockedHandleChange,
      handleBlur: mockedHandleBlur,
    }));
    vi.spyOn(formWrapper, "useFormState").mockImplementation(mockedUseFormState);

    const TestComponent = () => {
      const { formData, handleChange, handleBlur, validationErrors, handleMultiEntrySubmit } =
        formWrapper.useFormState();

      if (formData.currentStep === 1) {
        return <div>Step One</div>;
      }
      return <div>Step 2</div>;
    };
    const { getByText, getByTestId } = render(
      <formWrapper.FormWrapper>
        <TestComponent />
      </formWrapper.FormWrapper>,
    );

    screen.debug();

    expect(getByText("Step 2")).toBeTruthy();
  });
});
