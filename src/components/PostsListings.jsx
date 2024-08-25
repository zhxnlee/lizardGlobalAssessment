import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import styles from './PostsListings.module.css';
import logo from "../logo.png"

function PostsListings() {
    // State to hold all posts after fetched from the API
    const [posts, setPosts] = useState([]);

    // State to hold all the unique categories retrieved from the API
    const [categories, setCategories] = useState([]);

    // State to hold the selected categories for filtering posts
    const [selectedCategories, setSelectedCategories] = useState([]);

    // State to toggle the visibility of the filter categories
    const [showFilter, setShowFilter] = useState(false);

    // State to handle the number of posts rendered in each section
    const [visiblePosts, setVisiblePosts] = useState(5);

    // State to handle loading status
    const [loading, setLoading] = useState(true);

    console.log(showFilter);

    // Fetch the posts and categories from the API
    useEffect(() => {
        fetch('/api/posts')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.posts);
                
                // Extract all categories from the posts
                const allCategories = data.posts.flatMap(post => post.categories.map(category => category.name));
                
                // Extract all the unique categories
                const uniqueCategories = [...new Set(allCategories)];

                // Set the categories
                setCategories(uniqueCategories);

                // Select all the categories by default to show all posts
                setSelectedCategories(uniqueCategories);

                // Set loading to false once data is fetched
                setLoading(false);

            }).catch((error) => {
                console.error("Error fetching posts", error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    // Handle category click to filter posts
    const handleCategoryClick = (category) => {
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(cat => cat !== category) // Deselect the category
                : [...prevCategories, category] // Select the category
        );
    };

    // Filter the posts based on the selected categories
    const filteredPosts = selectedCategories.length === 0 
        ? posts 
        : posts.filter(post =>
            post.categories.some(category => selectedCategories.includes(category.name))
        );

    // Handle the load more button to render more posts
    const handleLoadMore = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5);
    };

    // If loading, display a loading indicator
    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            {/* Display Lizard Global logo with the link */}
            <div className={styles.logo}>
                <a href="https://www.lizard.global/"><img src={logo} alt="lizardlogo" /></a>
            </div>

            <div className={styles.content}>
                {/* Button used to toggle the visibility of filter categories */}
                <div className={styles.filter}>
                    <button onClick={() => { setShowFilter(!showFilter) }}
                        className={`${styles.filterButton} ${showFilter ? styles.activeButton : ''}`}>Filter</button>
                </div>

                {/* Used to conditionally render the filter categories on toggle of the filter button */}
                {showFilter &&
                    <div className={styles.filterPosts}>
                        <div className={styles.filterPostsForm}>
                            {/* Iterate all the unique categories to create a filter button for each category */}
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`${styles.categoryButton} ${selectedCategories.includes(category) ? styles.selected : ''}`}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {(selectedCategories.includes(category)) && (
                                        <span className={styles.tick}>✔  </span>
                                    )}
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                }

                {/* Render the posts */}
                <div className={styles.posts}>
                    {filteredPosts.slice(0, visiblePosts).map(post => (
                        <Posts key={post.id} post={post} />
                    ))}
                </div>

                {/* Button to load more posts given that there are more posts to display */}
                {visiblePosts < filteredPosts.length && (
                    <div className={styles.loadMore}>
                        <button onClick={handleLoadMore}>
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostsListings;
