"use client";
import Button from "@/app/components/button";
import userRequest from "@/app/request/user";

const Join = () => {
  return (
    <div className="flex flex-row gap-4">
      <span>Test APi</span>
      <Button
        variant="primary"
        onClick={() => {
          userRequest.addUser({
            userId: "test1",
            password: "test",
            profile: "test",
            role: "test",
            nickname: "test1",
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
      <Button variant="primary">Update User</Button>
      <Button variant="outline">Delete User</Button>
    </div>
  );
};

export default Join;
