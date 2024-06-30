import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const { data, loading } = useSelector((state) => state.user);

  return (
    <div>
      <h1>Admin</h1>
      <h4>{data.name}</h4>
      <h4>{data.email}</h4>
    </div>
  );
}

export default Profile;
