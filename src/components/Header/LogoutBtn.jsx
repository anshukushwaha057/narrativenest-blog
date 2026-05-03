import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.js';
import { logout } from '../../store/AuthSlice.js';

export const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };
  return (
    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300" onClick={logoutHandler}>
      Logout
    </button>
  );
};
