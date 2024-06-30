import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/user';

function Profile() {
  const { data, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, dispatch);

  return (
    <>
      {loading ? (
        <h1>data is loading</h1>
      ) : (
        <div>
          <h1>Admin</h1>
          <h4>{data.name}</h4>
          <h4>{data.email}</h4>
        </div>
      )}
    </>
  );
}

export default Profile;
