import { Link } from "react-router-dom";



const User = (props) => {
  const { user } = props;
  return (
    <tr>
      <td><Link to={`/users/${user.username}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

export default User
