import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Posts from './Posts'; 
import styles from "./PostDetail.module.css";
import logo from "../logo.png"


function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Post not found');
        }
        return response.json();
      })
      .then(data => {
        setPost(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className = {styles.container}>
        <div className = {styles.logo}>
            <a href = "https://www.lizard.global/"><img src = {logo} alt = "lizardlogo" /></a>
        </div>
        <div className = {styles.post}>
            <Posts post={post} showSummary={true} /> 
            <div className = {styles.backButton}>
                <button onClick = {()=> navigate('/')}>Back</button>  
            </div>     
        </div>

        
    </div>

  );
}

export default PostDetail;
