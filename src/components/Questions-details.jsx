import { useParams } from "react-router-dom";
import questions from "./Question-data";
import "./Questions-details.css";
import "./Questions.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function QuestionDetail() {
  const { id } = useParams();
  const question = questions.find((q) => q.id === parseInt(id));

  function updatedQuestion() {
    const updatedQuestion = questions.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          votes: question.votes,
        };
      }
      return item;
    });
    localStorage.setItem("questionList", JSON.stringify(updatedQuestion));
    alert("Voted Successfuly..");
  }

  function handleUpClick() {
    if (!question.votes[0].id.includes(question.id)) {
      question.votes[0].up = question.votes[0].up + 1;
      question.votes[0].id.push(question.id);
      updatedQuestion();
    } else {
      alert("already voted");
    }
  }

  function handleDownClick() {
    if (!question.votes[0].id.includes(question.id)) {
      question.votes[0].down = question.votes[0].down - 1;
      question.votes[0].id.push(question.id);
      updatedQuestion();
    } else {
      alert("already voted");
    }
  }

  return (
    <div className="list-margin">
      <div className="d-flex mb12">
        <h1 className="fs-headline1">View Questions</h1>
        <div className="margin-top-10 aside-cta mb12">
          <Link to={`/`} className="btn btn-primary">
            View Questions
          </Link>
        </div>
      </div>
      <div className="question list-margin">
        <div className="question-stats">
          <button className="arrow-button" onClick={handleUpClick}>
            <svg
              aria-hidden="true"
              class="svg-icon iconArrowUpLg"
              width="36"
              height="36"
            >
              <path d="M2 25h32L18 9 2 25Z"></path>
            </svg>
          </button>
          <div class="vote-count">1</div>
          <button className="arrow-button" onClick={handleDownClick}>
            <svg
              aria-hidden="true"
              class="svg-icon iconArrowDownLg"
              width="36"
              height="36"
            >
              <path d="M2 11h32L18 27 2 11Z"></path>
            </svg>
          </button>
        </div>
        <div className="question-content">
          <h3 className="question-content-title">{question?.title}</h3>
          <div class="question-content-excerpt">
            <div>
              <span>
                Asked <b>today</b>
              </span>
              <span className="tab">
                Modified <b>today</b>
              </span>
              <span className="tab">
                Viewed <b>6 times</b>
              </span>
            </div>
          </div>
          <div className="question-content-excerpt">
            <div dangerouslySetInnerHTML={{ __html: question?.body }} />
          </div>
          <div className="">
            <div>
              {question.skills.map((chipText) => (
                <div className="chip">{chipText.label}</div>
              ))}
            </div>
            <div className="user-card  float-right ">
              <div className="user-card-info">
                <div className="user-card-link d-flex gs4">
                  <a >
                    users{" "}
                    <time className="user-card-time">asked 1 min ago</time>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
