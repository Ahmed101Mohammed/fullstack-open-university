import { useState } from "react";
import { createNewBlog } from "../reducers/blogsReducer";
import { exposeNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
const CreateBlogForm = (props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const {
    // createBlog,
    blogFormRef,
    user,
  } = props;

  const createBlog = async (blogObj) => {
    dispatch(createNewBlog(blogObj));
    blogFormRef.current.flipVisibility();
    dispatch(
      exposeNotification([
        true,
        `a new blog ${blogObj.title} by ${blogObj.author} added`,
      ]),
    );
    setTimeout(() => dispatch(exposeNotification(null)), 5000);
  };

  const creatingBlogHandler = async (event) => {
    event.preventDefault();
    try {
      const blogObj = { title, url, author };
      await createBlog(blogObj);
      setTitle("");
      setUrl("");
      setAuthor("");
    } catch (error) {
      console.log({ error });
      dispatch(exposeNotification([false, "Invalid token"]));
      setTimeout(() => dispatch(exposeNotification(null), 5000));
    }
  };
  if (!user) return;

  return (
    <>
      <h2>create new blog item</h2>
      <form onSubmit={(event) => creatingBlogHandler(event)}>
        <TextField
          label="Title"
          variant="standard"
          type="text"
          id="title"
          placeholder="blog title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <TextField
          label="URL"
          variant="standard"
          type="text"
          id="url"
          value={url}
          placeholder="blog url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />

        <TextField
          label="Author"
          variant="standard"
          type="text"
          id="author"
          value={author}
          placeholder="blog author"
          onChange={({ target }) => setAuthor(target.value)}
        />

        <br />

        <Button variant="contained" color="success" type="submit">
          create
        </Button>
      </form>
    </>
  );
};

export default CreateBlogForm;
