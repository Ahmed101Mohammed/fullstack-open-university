import { createSlice } from "@reduxjs/toolkit";
import blogsServices from "../services/blogs";

const blogs = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      let blogs = action.payload;
      blogs = blogs.sort((a, b) => b.likes - a.likes);
      return blogs;
    },
    addBlog(state, action) {
      const newBlog = action.payload;
      const newState = state.concat(newBlog);
      return newState;
    },
    addCommentToBlogState(state, action) {
      const blogId = action.payload.id;
      const newComment = action.payload.comment;
      const oldState = state;
      const newState = state.map((blog) => {
        if (blog.id === blogId) {
          const newComments = blog.comments.concat(newComment);
          blog = { ...blog, comments: newComments };
        }
        return blog;
      });
      return newState;
    },
  },
});

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogsServices.deleteBlog(blogId);
    dispatch(initBlogs());
  };
};
export const incrementBlogLikes = (blogObj) => {
  return async (dispatch) => {
    await blogsServices.updateBlog(blogObj.id, { likes: blogObj.likes + 1 });
    dispatch(initBlogs());
  };
};
export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsServices.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (blogObj) => {
  return async (dispatch) => {
    const newBlog = await blogsServices.createBlog(blogObj);
    dispatch(addBlog(newBlog));
  };
};

export const addCommentToBlog = (blogId, comment) => {
  return async (dispatch) => {
    const newComment = await blogsServices.postNewBlogComment(blogId, comment);
    dispatch(addCommentToBlogState({
        id: blogId,
        comment: comment
    }));
  };
};

export const { setBlogs, addBlog, addCommentToBlogState } = blogs.actions;
export default blogs.reducer;
