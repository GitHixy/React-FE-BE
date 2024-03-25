import React, { useEffect } from "react";
import MyNav from "../Nav/MyNav";
import MyFooter from "../Footer/MyFooter";
import Post from "../Post/Post";
import {useDispatch, useSelector} from 'react-redux';
import { allPosts, getAllPosts } from "../../redux/BlogPosts/blogPostsSlice";
import { Row } from "react-bootstrap";
import BlogPostForm from "../Form/Form";



const Main = () => {
    const posts = useSelector(allPosts);
    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(getAllPosts())    
    }, [dispatch]);

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    const displayPosts = (posts) => {
         return posts.map((post, i) => (
            <Post 
                key={i}
                title={post.title}
                author={`${post.author.name} ${post.author.surname}`}
                imgUrl={post.cover}
                content={post.content}
                category={post.category}
                readTime={`${post.readTime.value} ${post.readTime.unit}`}
            />
        ));
    }

    return(
        <>
        <MyNav/>
        <BlogPostForm />
        <div className="container">
            <Row>
        {posts && (displayPosts(posts))}
         </Row>
        </div>
        <MyFooter/>
        </>
    );
}

export default Main;