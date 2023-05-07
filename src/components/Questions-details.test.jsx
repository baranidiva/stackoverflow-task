import React from "react";
import { render, fireEvent } from "@testing-library/react";
import QuestionDetail from "./Questions-details";

// Mock questions data
const questions = [
  {
    id: 1,
    title: "Test Question",
    body: "<p>This is a test question.</p>",
    skills: [{ label: "React" }],
    votes: [{ up: 0, down: 0, id: [] }],
  },
];

describe("QuestionDetail", () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    // Clear localStorage after each test
    window.localStorage.setItem.mockClear();
    window.localStorage.getItem.mockClear();
  });

  it("renders the question title and body", () => {
    const { getByText } = render(<QuestionDetail questions={questions} />);
    expect(getByText("Test Question")).toBeInTheDocument();
    expect(getByText("This is a test question.")).toBeInTheDocument();
  });

  it("increments the upvote count when the upvote button is clicked", () => {
    const { getByTestId, getByText } = render(
      <QuestionDetail questions={questions} />
    );
    fireEvent.click(getByTestId("upvote-button"));
    expect(getByText("1")).toBeInTheDocument();
  });

  it("decrements the downvote count when the downvote button is clicked", () => {
    const { getByTestId, getByText } = render(
      <QuestionDetail />
    );
    fireEvent.click(getByTestId("downvote-button"));
    expect(getByText("-1")).toBeInTheDocument();
  });

  it("does not allow a user to upvote a question more than once", () => {
    const { getByTestId } = render(<QuestionDetail questions={questions} />);
    fireEvent.click(getByTestId("upvote-button"));
    fireEvent.click(getByTestId("upvote-button"));
    expect(window.alert).toHaveBeenCalledWith("already voted");
  });

  it("does not allow a user to downvote a question more than once", () => {
    const { getByTestId } = render(<QuestionDetail questions={questions} />);
    fireEvent.click(getByTestId("downvote-button"));
    fireEvent.click(getByTestId("downvote-button"));
    expect(window.alert).toHaveBeenCalledWith("already voted");
  });
});
