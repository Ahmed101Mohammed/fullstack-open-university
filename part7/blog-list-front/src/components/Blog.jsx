import { useDispatch } from "react-redux";
import { incrementBlogLikes } from "../reducers/blogsReducer";
import { exposeNotification } from "../reducers/notificationReducer";
import { deleteBlog } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";
import AddCommentForm from "./AddCommentForm";
import { Button, ListItem } from "@mui/material";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import DeleteIcon from "@mui/icons-material/Delete";

export const BlogDetails = (props) => {
  const { blog } = props;
  // console.log({blog, props})
  const { url, likes, user } = blog;
  const dispatch = useDispatch();
  const removeBlog = async (blogId) => {
    try {
      dispatch(deleteBlog(blogId));
    } catch {
      dispatch(
        exposeNotification([
          "You don' have the permision to delete this blog",
          false,
        ]),
      );

      setTimeout(() => dispatch(exposeNotification(null)), 5000);
    }
  };

  const removeBlogHandler = async () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );
    if (confirm) await removeBlog(blog.id);
  };

  return (
    <div>
      <a href={url} target="_blank" rel="noopener">
        {url}
      </a>
      <p>
        Likes: {likes}{" "}
        <button onClick={() => dispatch(incrementBlogLikes(blog))}>
          <ThumbUpAltRoundedIcon ></ThumbUpAltRoundedIcon>
        </button>
      </p>
      <p>
        <strong>{user ? user.name : null}</strong>
      </p>
      {user ? <Button onClick={removeBlogHandler}><DeleteIcon color="error"></DeleteIcon></Button> : null}
      <h3>add comment</h3>
      <AddCommentForm blogId={blog.id} />
      <ul>
        {blog.comments
          ? blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))
          : null}
      </ul>
    </div>
  );
};
const Blog = ({ blog }) => {
  const { title } = blog;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <ListItem style={blogStyle} className="blog-item">
      <div>
        <Link to={`/blogs/${blog.id}`}>{title}</Link>
      </div>
    </ListItem>
  );
};

export default Blog;
