import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import { Chip } from "@material-ui/core";
import "@material-ui/core/styles";
import "./Questions-add.css";
import headerImage from "../assets/header_question_add.svg";
import { useNavigate } from "react-router-dom";

const options = [
  { value: "react", label: "React" },
  { value: "javascript", label: "JavaScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "nodejs", label: "Node.js" },
];

const AddQuestion = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const existingData = JSON.parse(localStorage.getItem("questionList")) || [];
    const newItem = {
      id: existingData.length + 1,
      title: title,
      body: body,
      skills: selectedSkills,
      votes: [{ up: 0, down: 0 }],
    };

    if (newItem) {
      existingData.push(newItem);
      localStorage.setItem("questionList", JSON.stringify(existingData));
      alert("Question added successfuly...");
      navigate("/");
    }

    setTitle("");
    setBody("");
    setSelectedSkills([]);
  }

  function handleSkillsChange(selectedOptions) {
    setSelectedSkills(selectedOptions);
  }

  return (
    <div className="add-question">
      <header class="ask-question-header">
        <div class="ask-question-title-wrapper">
          <h1 class="ask-question-title">Ask a public question</h1>
        </div>
        <div class="ask-question-image-wrapper">
          <img
            src={headerImage}
            alt="Question illustration"
            class="ask-question-image"
          />
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <span className="help-text">
            Be specific and imagine you’re asking a question to another person.
          </span>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <span className="help-text">
            Include all the information someone would need to answer you
            question
          </span>
          <Editor
            apiKey="YOUR_API_KEY"
            initialValue="<p>Enter question details here...</p>"
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            value={body}
            onEditorChange={(content) => setBody(content)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Tags</label>
          <span className="help-text">
            Add up to 5 tags to describe what your question is about
          </span>
          <Select
            isMulti
            options={options}
            value={selectedSkills}
            onChange={handleSkillsChange}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select tags..."
          />
          {selectedSkills.map((skill) => (
            <Chip
              key={skill.value}
              label={skill.label}
              color="primary"
              variant="outlined"
              style={{ margin: "5px" }}
            />
          ))}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
