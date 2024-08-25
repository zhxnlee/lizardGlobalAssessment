import React, {useState} from "react";
import styles from "./Posts.module.css";
import { Link } from "react-router-dom";

function Posts({ post, showSummary = false }){

    // State to handle the display of more details, true to show details and false to hide.
    const [moreDetails, setMoreDetails] = useState(false);

    // State to handle the display of "published on" before the date.
    const [publishedOn, setPublishedOn] = useState(false);
    
    return(
        <div className = {styles.container}>
            {/* Display post author's name and avatar image*/}
            <div className = {styles.name}>
                <img src = {post.author.avatar} alt = {post.author.name}/>
                <h3>{post.author.name}</h3> 
                
            </div>

            {/* Display post published date with hover effect */}
            <div className = {styles.publishedDate}> 
                <p onMouseEnter={() => setPublishedOn(true)} onMouseLeave={() => setPublishedOn(false)}>
                    {publishedOn && <span>Published on: </span>}
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                </p>
            </div>
            
            {/* Display the post's title with the link to navigate to the post with more details */}
            <div className = {styles.titleContainer}  onMouseEnter={()=> setMoreDetails(true)} onMouseLeave={()=> setMoreDetails(false)}>
                <Link to={`/posts/${post.id}`}>
                    <h1 className={styles.title}>{post.title} </h1>
                </Link>
                <div className = {styles.moreDetails}>

                    {(moreDetails && !showSummary) &&<Link to={`/posts/${post.id}`}><h3>{`More details →`}</h3></Link>}
                </div>
                
      </div>
      
            {/* The details of each posts is shown only in the respective post's pages */}
            {showSummary && (
                <div>
            <div className={styles.summary}>
                <p>{post.summary}</p>
            </div>
            <div className = {styles.categories}>
                <ul>
                    {post.categories.map(category =>(
                        <li key = {category.id}>{category.name}</li>
                    ))}
                </ul>
            </div>
                </div>

            

      )}

        
        </div>
    )
}

export default Posts;