interface User {
  name: string;
  image: string;
}

interface Post {
  user: ?User;
  message: string;
  created_at: string;
}

type Posts = Post[];

export interface Whistle {
  message: string;
  token: ?string;
}

export interface UserAuth {
  name: string;
  password: string;
}

export type Token = string
