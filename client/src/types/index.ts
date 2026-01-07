export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  isPublished: boolean;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface INetwork {
  id: number;
  count: number;
  value?: string;
  text: string;
}
