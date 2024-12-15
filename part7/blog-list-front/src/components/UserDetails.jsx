const UserDetails = (props) => {
  const { user } = props;

  return (
    <div>
        <h3>{user.name}</h3>
        <h4>Added blogs</h4>
        <ul>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
    </div>
  )
};

export default UserDetails