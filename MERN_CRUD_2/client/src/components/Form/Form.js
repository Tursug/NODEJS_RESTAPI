import React, {useState} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './Styles';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';


const Form = () => {

    const [postData, setPostData] = useState({
        creator:'', title:'', message:'', tags: '', selectedFile:''
    });

    const clear = () => {
    
    };

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postData));

      };

    return(
        <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >
            <Typography variant="h6"></Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} />
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} />
            <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} />
            <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags}  />
            <div className={classes.fileInput}><FileBase type="file" multiple={false}  /></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
    </Paper>
    );
}

export default Form;