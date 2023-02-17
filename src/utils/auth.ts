import { compareSync, hashSync } from "bcryptjs";

export const hashPassword = (password: string) => {
  return hashSync(password);
};

export const verifyPassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};

export enum ErrorCode {
  UserNotFound = "User not found",
  IncorrectPassword = "Incorrect password",
  EmailAlreadyExists = "Email already exists",
  InvalidEmail = "Invalid email",
  InvalidPassword = "Invalid password",
  InvalidName = "Invalid name",
  InvalidRole = "Invalid role",
  InternalServerError = "Internal server error",
  DifferentProvider = "Different provider",
}
