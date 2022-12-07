import customAxios from '../util/customAxios';
import Storage from '../storage/storage';
import CookieStorage from '../storage/cookie';
import { AuthFormInitial, EditImageForm } from '../types/auth';

export async function authRegisterRequest(registerForm: AuthFormInitial) {
  const res = await customAxios.post('/auth/register', registerForm, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { message } = res.data;
  return message;
}

export async function authLoginRequest(loginForm: AuthFormInitial) {
  const res = await customAxios.post('/auth/login', loginForm, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { result } = res.data;
  Storage.setToken(result.accessToken);
  CookieStorage.setToken(result.refreshToken);
  return res.data;
}

export async function authProfileImageUpdate(image: Blob) {
  const formData = new FormData();
  formData.append('profileImage', image);
  const res = await customAxios.put('/user/profileImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });

  return res.data;
}

export async function authProfileNickUpdate(nickname: string) {
  const res = await customAxios.put(
    '/user/nickname',
    { nickname },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.getToken()}`,
      },
    },
  );
  return res.data;
}

export async function authPasswordUpdate(passwordForm: AuthFormInitial) {
  const res = await customAxios.put('/user/password', passwordForm, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
}

export async function getAuthRecipes() {
  const res = await customAxios.get(`/user/recipes`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data.result;
}

export async function getAuthLikeRecipes() {
  const res = await customAxios.get(`/user/like/recipes`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data.result;
}