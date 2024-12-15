import { useSelector } from "react-redux";
import Blog from "./Blog";
import { Route, Routes, useMatch } from "react-router-dom";
import { BlogDetails } from "./Blog";
import { List } from "@mui/material";

const Blogs = (props) => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const match = useMatch("/blogs/:id");
  console.log({match, blogs})
  const blog = match
    ? blogs.find((blog) =>
    {
      console.log(
        `blogId: ${blog.id}, paramId: ${match.params.id}, Truth: ${blog.id === match.params.id}`,
      );
      if (blog.id === match.params.id)
      {
        return blog
      }
    })
    : null;
  console.log({blog})
  if (!user) return;
  return (
    <Routes>
      <Route path="/:id" element={<BlogDetails blog={blog} />} />
      <Route
        path="/"
        element={
          <>
            <h2>blogs</h2>
            <List>
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </List>
          </>
        }
      />
    </Routes>
  );
};

export default Blogs;
