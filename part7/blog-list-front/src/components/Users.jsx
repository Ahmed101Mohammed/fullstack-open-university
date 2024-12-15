import { useEffect, useState } from "react";
import usersService from "../services/users";
import User from "./User";
import { Route, Routes, useMatch } from "react-router-dom";
import UserDetails from "./UserDetails";

const Users = () => {
  const [ users, setUsers ] = useState([])
  useEffect(() => {
    usersService.getAllUsers()
      .then(data => setUsers(data))
  }, []);

  const match = useMatch('/users/:username')
  const user = match
    ? users.find(user => user.username === match.params.username)
    : null
  if(!user && match) return null
  return (
    <>
      <Routes>
        <Route path="/:username" element={<UserDetails user={user}/>} />
        <Route
          path="/"
          element={
            <div>
              <h2>Users</h2>
              <table>
                <thead>
                  <tr>
                    <th>user</th>
                    <th>blogs created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <User key={user.username} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default Users
