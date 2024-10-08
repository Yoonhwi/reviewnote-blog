interface AddUserParams {
  name: string;
  userId: string;
  password: string;
}

const addUser = async (params: AddUserParams) => {
  return await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
};

const userRequest = { addUser };

export default userRequest;
