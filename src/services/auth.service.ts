import axios, { AxiosError } from "axios"
import { VueCookieNext } from "vue-cookie-next";
import router from "@/router";
import type { IAuthExport } from "@/models/auth.store.models";

const url = "http://localhost:3000/api";

async function login(username: string, password: string): Promise<IAuthExport> {
  const data = { data: null, message: null };
  try {
    const result = await axios.post(`${url}/auth/login`, {username, password});

    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000); // 15 minutes

    if (result.data.token !== null) {
      data.data = result.data;
      VueCookieNext.setCookie("token",result.data.token, { expire: expirationDate.toUTCString() });
      VueCookieNext.setCookie("user", JSON.stringify(result.data.user), {
        expire: expirationDate.toUTCString(),
        path: '/'
      });
    }
  }
  catch(e:any){
    data.message = e
    console.log(e)
  }
  return data;
}

async function register(
  name: string,
  lastName: string,
  email: string,
  username: string,
  password: string
) : Promise<IAuthExport> {
  const data = { data: null, message: null };
  try {
    console.log({name, lastName, email, username, password})
    const result = await axios.post(`${url}/auth/register`, {name, lastName, email, username, password});

    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 15 * 60 * 1000); // 15 minutes

    if (result.data.token !== null) {
      VueCookieNext.setCookie("token",result.data.token, { expire: expirationDate.toUTCString() });
      VueCookieNext.setCookie("user", JSON.stringify(result.data.user), {
        expire: expirationDate.toUTCString(),
        path: '/'
      });
    }
      router.push({ name: 'table'});
  }
  catch(e:any){
    data.message = e
    console.log(e)
  }
  return data;
}

export { register, login,  };
