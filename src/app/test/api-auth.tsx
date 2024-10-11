"use client";
import Button from "../components/button";
import { login, logout } from "../request/auth";
import userRequest from "../request/user";

const ApiAuth = () => {
  return (
    <div className="flex flex-row gap-4">
      <span>auth api</span>
      <Button onClick={login}>Login</Button>
      <Button onClick={() => userRequest.getMe()}>get me</Button>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default ApiAuth;
