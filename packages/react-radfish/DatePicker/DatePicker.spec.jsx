import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DatePicker } from "./index";

describe("DatePicker Component", () => {
  test("renders DatePicker, uncontrolled input has its value reset", () => {
    render(
      <form>
        <DatePicker label="Select Date" defaultValue="2024-08-01" />
        <button type="reset">Reset</button>
      </form>,
    );

    const dateInput = screen.getByLabelText("Select Date");
    const resetButton = screen.getByText("Reset");

    // Initial render test
    expect(dateInput).toHaveValue("2024-08-01");

    // Change the input value
    fireEvent.change(dateInput, { target: { value: "2024-08-02" } });
    expect(dateInput).toHaveValue("2024-08-02");

    // Trigger form reset
    fireEvent.click(resetButton);
    expect(dateInput).toHaveValue("2024-08-01");
  });

  test("renders DatePicker, controlled input has its value reset", () => {
    const FormWithControlledDatePicker = () => {
      const [date, setDate] = useState("2024-08-01");

      const handleReset = (event) => {
        event.preventDefault();
        setDate("2024-08-01");
      };

      const handleChange = (event) => {
        setDate(event.target.value);
      };

      return (
        <form onReset={handleReset}>
          <DatePicker label="Select Date" value={date} onChange={handleChange} />
          <button type="reset">Reset</button>
        </form>
      );
    };

    render(<FormWithControlledDatePicker />);

    const dateInput = screen.getByLabelText("Select Date");
    const resetButton = screen.getByText("Reset");

    // Initial render test
    expect(dateInput).toHaveValue("2024-08-01");

    // Change the input value
    fireEvent.change(dateInput, { target: { value: "2024-08-02" } });
    expect(dateInput).toHaveValue("2024-08-02");

    // Trigger form reset
    fireEvent.click(resetButton);
    expect(dateInput).toHaveValue("2024-08-01");
  });
});
