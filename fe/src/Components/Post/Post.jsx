import React from 'react';
import { Col } from 'react-bootstrap';

const Post = ({ title, author, imgUrl, content, readTime, category }) => {
  return (
    <Col md={6} className="d-flex align-items-stretch">
    <div className="card my-2 w-100 mx-auto">
      <div className="card-header">
        <h4> '{title}'</h4>
        <h4>By {author}</h4>
      </div>
      <div className="card-body">
        <img src= {imgUrl} alt="img" className='w-100'/>
        <h4>Description:</h4>
        <p>{content}</p>
        
      </div>
      <div className="card-footer">
        <p>Genre: {category}</p>
        <p>Read Time: {readTime}</p>
        <button className="btn btn-secondary">Add Your Review</button>
      </div>
    </div>
    </Col>
  );
};

export default Post;
