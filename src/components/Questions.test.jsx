import React from "react";
import { shallow } from "enzyme";
import Questions from "./Questions";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Questions component", () => {
  let wrapper;
  const questions = [    {      id: 1,      title: "Question 1",      body: "Body of question 1",      skills: [{ label: "skill1" }, { label: "skill2" }],
      votes: [{ up: 1, down: 0 }],
    },
    {
      id: 2,
      title: "Question 2",
      body: "Body of question 2",
      skills: [{ label: "skill1" }, { label: "skill3" }],
      votes: [{ up: 3, down: 1 }],
    },
    {
      id: 3,
      title: "Question 3",
      body: "Body of question 3",
      skills: [{ label: "skill2" }, { label: "skill3" }],
      votes: [{ up: 2, down: 2 }],
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    wrapper = shallow(<Questions />);
  });

  it("should render without errors", () => {
    expect(wrapper.length).toBe(1);
  });

  it("should render the correct number of questions", () => {
    localStorage.setItem("questionList", JSON.stringify(questions));
    wrapper.update();
    expect(wrapper.find('div[data-testid="list"]').length).toBe(3);
  });

  it("should show the correct number of pages based on the number of questions and page size", () => {
    localStorage.setItem("questionList", JSON.stringify(questions));
    wrapper.update();
    expect(wrapper.find(".page-item").length).toBe(2);
    wrapper.find(".page-item").at(1).simulate("click");
    expect(wrapper.find(".question").length).toBe(1);
  });

  xit("should show the correct number of pages based on the number of questions and page size", () => {
    localStorage.setItem("questionList", JSON.stringify(questions));
    wrapper.instance().setState({ pageSize: 2 });
    wrapper.update();
    expect(wrapper.find(".page-item").length).toBe(2); 
    wrapper.find(".page-item").at(1).simulate("click"); 
    expect(wrapper.find(".question").length).toBe(1);
  });

  xit("should update the page size and reset to page 1 when page size is changed", () => {
    localStorage.setItem("questionList", JSON.stringify(questions));
    wrapper.instance()?.setState({ pageSize: 2 }); 
    wrapper.update();
    expect(wrapper.find(".page-item").length)?.toBe(2); 
    wrapper.find(".page-item").at(1).simulate("click");
    expect(wrapper.find(".question").length).toBe(1); 
    wrapper.find(".page-size-select").simulate("change", { target: { value: 2 } }); 
    expect(wrapper.instance().state.currentPage).toBe(1); 
    expect(wrapper.find(".page-item").length).toBe(2); 
    expect(wrapper.find(".question").length).toBe(2);
  });
});
