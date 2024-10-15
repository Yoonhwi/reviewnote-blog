"use client";

import { createContext, useState } from "react";
import { UserResponseType } from "../types";

interface UserContextInterface {
  user: UserResponseType | null;
  setUser: (user: UserResponseType | null) => void;
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserResponseType | null>(null);
  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
