import React, {useState} from 'react';
import {Translate} from "react-jhipster";

const AskQuestion = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
   toast.success("Sent successfully!");
  };


  return (
    <>
      <div className="feedback-form">
        <h3>
          {' '}
          <Translate contentKey={'questions.title'} />{' '}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <Translate contentKey={'questions.name'} />:
            </label>
            <input type="text" id="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <Translate contentKey={'questions.email'} />:
            </label>
            <input type="email" id="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="message">
              <Translate contentKey={'questions.message'} />:
            </label>
            <textarea id="message" className="form-control" rows={4}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            <Translate contentKey={'compliance.submit'} />
          </button>
        </form>
      </div>

    </>
  )
};

export default AskQuestion;
