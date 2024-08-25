import React from "react";
import PostsListings from "./PostsListings";
import styles from "./Root.module.css";

function Root(){
    return(

    <div className = {styles.container} >
      
        <PostsListings className = {styles.postsListings}/>
        
    </div>

    
    );
}

export default Root;