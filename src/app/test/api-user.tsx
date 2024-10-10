"use client";
import Button from "../components/button";
import userRequest from "../request/user";

const ApiUser = () => {
  return (
    <div className="flex flex-row gap-4">
      <span>user api</span>
      <Button
        variant="outline"
        onClick={() => {
          userRequest.addUser({
            userId: "test2",
            password: "test",
            profile: "test",
            role: "test",
            nickname: "test2",
          });
        }}
      >
        Create User
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          userRequest.getUsers();
        }}
      >
        get Users
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          userRequest.getUser("1");
        }}
      >
        get User
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          userRequest.updateUser("6", {
            userId: "updateTest",
            password: "test",
            profile: "test",
            role: "test",
            nickname: "updateTest",
          });
        }}
      >
        Update User
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          userRequest.deleteUser("7");
        }}
      >
        Delete User
      </Button>
    </div>
  );
};

export default ApiUser;
