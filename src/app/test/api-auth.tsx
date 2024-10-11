"use client";
import Button from "../components/button";
import { login } from "../request/auth";

const ApiAuth = () => {
  return (
    <div className="flex flex-row gap-4">
      {/** user 8 post 4  content userId postId*/}
      <span>auth api</span>
      <Button onClick={login}>Login</Button>
    </div>
  );
};

export default ApiAuth;
