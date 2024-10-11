export enum ApiRoutes {
  AuthLogin = "/api/auth/login",
  AuthJoin = "/api/auth/join",
  AuthLogout = "/api/auth/logout",
  Me = "/api/me",
  Users = "/api/users",
  User = "/api/users/:id",
  Posts = "/api/posts",
  Post = "/api/posts/:id",
  Comments = "/api/posts/:id/comments",
  Comment = "/api/posts/:id/comments/:id",
  Storage = "/api/storage",
}

export enum PageRoutes {
  Home = "/",
  Login = "/auth/login",
  Join = "/auth/join",
  Comments = "/comments",
}
