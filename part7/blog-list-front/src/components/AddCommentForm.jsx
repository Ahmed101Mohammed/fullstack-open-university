import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCommentToBlog } from '../reducers/blogsReducer'
const AddCommentForm = (props) => {
  const [comment, setComment] = useState("");
  const { blogId } = props;
  const dipatch = useDispatch()
  const addCommentHandler = (event) => {
    event.preventDefault();
    dipatch(addCommentToBlog(blogId, comment));
    setComment('')
  };
  return (
    <form onSubmit={addCommentHandler}>
      <input
        type="text"
        name=""
        id=""
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Input your comment"
      />
      <button type="submit">comment</button>
    </form>
  );
};

export default AddCommentForm;
