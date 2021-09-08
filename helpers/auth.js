import { hash } from 'bcryptjs';

export const hashPassword = async (password) => await hash(password, 12);

export const createUser = async (email, password) => {
  const response = await fetch('api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  return data;
};

export const isUserValid = (email, password) =>
  email && email.includes('@') && password && password.trim().length >= 7;
