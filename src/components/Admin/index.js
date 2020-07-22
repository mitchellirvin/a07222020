import React, { useState } from 'react';
import { withFirebase } from '../Firebase';

const AdminPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  props.firebase.users().on('value', snapshot => {
    const usersObject = snapshot.val();
    const usersList = Object.keys(usersObject).map(key => ({
      ...usersObject[key],
      uid: key
    }));
    setLoading(false);
    setUsers(usersList);
  });

  return (
    <div>
      <h1 style={{ paddingLeft: "1em" }}>Admin</h1>
      {loading && <div>Loading...</div>}
      <UserList users={users} />
    </div>
  );
};

const UserList = ( users ) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.id}
          </span>
          <span>
            <strong>Email:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default withFirebase(AdminPage);