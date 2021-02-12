import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './Styles';

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    return(
        <div>
            <h1>POSTS</h1>
            <Post />
            <Post />
        </div>
    );
}

export default Posts;