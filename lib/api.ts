import axios from "axios";
import { CreateUserInputType } from "./types";

export const getAllSales = async () => {
  const response = await fetch(`https://delman-fe-api.fly.dev/`);
  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`https://delman-fe-api.fly.dev/users`);
  return response.json();
};

export const createUser = async (newUser: CreateUserInputType) => {
  const response = await axios.post(
    `https://delman-fe-api.fly.dev/users`,
    newUser
  );

  return response;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(
    `https://delman-fe-api.fly.dev/users/${userId}`
  );

  return response;
};
