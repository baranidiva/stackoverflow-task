import React, { useState, useEffect } from "react";
import "./Questions.css";
import questions from "./Question-data";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Questions() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const pageSizeOptions = [15, 30, 50];

  const handleChangePageSize = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("questionList"));
    if (storedList) {
      setList(storedList);
    } else {
      localStorage.setItem("questionList", JSON.stringify(questions));
      setList(questions);
    }
  }, []);

  const totalPages = Math.ceil(list.length / pageSize);
  const visiblePages = 5; // number of pagination buttons to show

  const getPageRange = () => {
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);
    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    return [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i);
  };

  const paginatedList = list.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <div id="mainbar">
        <div className="d-flex mb12">
          <h1 className="fs-headline1">All Questions</h1>
          <div className="margin-top-10 aside-cta mb12">
            <Link to={`/addquestion`} className="btn btn-primary">
              Ask Question
            </Link>
          </div>
        </div>
        <div className="d-flex mb12">
          <div className="fs-body3 fl1">{questions.length} questions</div>
          <div className="uql-nav ">
            <div className="d-flex">
              <div className="btn-group">
                <a className="btn sm-btn-border sm-btn d-flex is-selected">
                  {" "}
                  Newest{" "}
                </a>
                <a className="btn sm-btn-border sm-btn d-flex"> Active </a>
                <a className="btn sm-btn-border sm-btn d-flex uql-nav--expanded-item">
                  Bountied
                  <div className="s-badge">212</div>
                </a>
                <a className="btn sm-btn-border sm-btn d-flex">Unanswered</a>
                <button className="btn sm-btn-border sm-btn border-right-inset">
                  More
                </button>
              </div>
              <div>
                <button className="btn filter-button sm-btn btn-icon">
                  <svg className="svg-icon" width="18" height="18">
                    <path d="M2 4h14v2H2V4Zm2 4h10v2H4V8Zm8 4H6v2h6v-2Z"></path>
                  </svg>
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="list-margin" data-testid='list'>
        {paginatedList.map((question) => (
          <div className="question" id='list'>
            <div className="question-stats">
              <div className="question-stats-item question-stats-item__emphasized">
                <span className="question-stats-item-number">
                  {question?.votes[0]?.up + question?.votes[0]?.down}
                </span>
                <span className="question-stats-item-unit">votes</span>
              </div>
              <div className="question-stats-item">
                <span className="question-stats-item-number">0</span>
                <span className="question-stats-item-unit">answers</span>
              </div>
              <div className="question-stats-item" title="2 views">
                <span className="question-stats-item-number">2</span>
                <span className="question-stats-item-unit">views</span>
              </div>
            </div>
            <div className="question-content">
              <h3 className="question-content-title">
                <Link to={`/question/${question.id}`} className="s-link">
                  {question.title}
                </Link>
              </h3>
              <div className="question-content-excerpt">
                <div dangerouslySetInnerHTML={{ __html: question.body }} />
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
                        Erik_90x{" "}
                        <time className="user-card-time">
                          asked 1 min ago
                        </time>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
       <div className="pagination site1 themed page-sizer float-right">
        {pageSizeOptions.map((size) => (
          <a
            key={size}
            onClick={() => handleChangePageSize(size)}
            title={`Show ${size} items per page`}
            className={`pagination-content ${pageSize === size ? "is-selected" : ""}`}
          >
            {size}
          </a>
        ))}
        <span className="pagination-content pagination-content-clear">per page</span>
      </div>
      <div className="pagination site1 themed pager float-left">
        {/* <div className="pagination-content is-selected" aria-current="page">
          {currentPage}
        </div> */}
        {getPageRange().map((page) => (
          <a
            key={page}
            href="#"
            onClick={() => handlePageClick(page)}
            className={`pagination-content jpagination-item ${
              currentPage === page ? "is-selected" : ""
            }`}
          >
            {page}
          </a>
        ))}
        {currentPage < totalPages && (
          <a
            onClick={() => handlePageClick(currentPage + 1)}
            className="pagination-content jpagination-item"
            rel="next"
            title="Go to next page"
          >
            Next
          </a>
        )}
      </div>
      </div>
    </div>
  );
}

export default Questions;
