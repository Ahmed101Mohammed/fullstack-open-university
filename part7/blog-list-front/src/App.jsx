import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginServices from "./services/login";
import Blogs from "./components/Blogs";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
import Toggler from "./components/Toggler";
import { useDispatch, useSelector } from "react-redux";
import { exposeNotification } from "./reducers/notificationReducer";
import { initBlogs } from "./reducers/blogsReducer";
import { setUser } from "./reducers/userReducer";
import Users from "./components/Users";
import { Route, Routes } from "react-router-dom";
import { Button, Container, Link } from "@mui/material";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await loginServices.login({ username, password });
      dispatch(setUser(user));
      window.localStorage.setItem("userLoggedInfo", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(exposeNotification([false, "Wrong with credintials"]));
      setTimeout(() => dispatch(exposeNotification(null), 5000));
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("userLoggedInfo");
    dispatch(setUser(null));
  };

  useEffect(() => {
    const userLoggedInfo = window.localStorage.getItem("userLoggedInfo");
    if (!userLoggedInfo) return;
    const user = JSON.parse(userLoggedInfo);
    if (userLoggedInfo) dispatch(setUser(user));
    blogService.setToken(user.token);
  }, []);

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  return (
    <Container fixed>
      <nav>
        <Link style={{ margin: "5px" }} href="/blogs">
          Blogs
        </Link>
        <Link href="/users">Users</Link>
      </nav>
      <Notification />
      <LoginForm
        loginSubmitHandler={loginSubmitHandler}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      {user ? (
        <>
          <h3>{user.name} logged-in</h3>
          <Button variant="outlined" color="error" onClick={logoutHandler}>
            logout
          </Button>
          <br />
        </>
      ) : null}
      <Toggler buttonLable="new blog" ref={blogFormRef}>
        <CreateBlogForm blogFormRef={blogFormRef} user={user} />
      </Toggler>
      <Routes>
        {/* <Route path="/users/:username" element={<h1>Match</h1>} /> */}
        <Route path="/blogs/*" element={<Blogs />} />
        <Route path="/users/*" element={<Users />} />
      </Routes>
    </Container>
  );
};

export default App;
