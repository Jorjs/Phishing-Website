import axios, { AxiosError } from "axios"
import { VueCookieNext } from "vue-cookie-next";
import router from "@/router";
import type { IAuthExport } from "@/models/auth.store.models";
import { jwtDecode, type JwtPayload } from "jwt-decode";

const url = import.meta.env.VITE_API_URL;

async function login(username: string, password: string): Promise<IAuthExport> {
  const data = { data: null, message: null };
  try {
    const result = await axios.post(`${url}/auth/login`, {username, password});

    if (result.data.token !== null) {
      const { exp } = jwtDecode<JwtPayload>(result.data.token);
      const expirationDate = new Date(exp! * 1000);

      data.data = result.data;
      VueCookieNext.setCookie("token",result.data.token, { expire: expirationDate.toUTCString() });
      VueCookieNext.setCookie("user", JSON.stringify(result.data.user), {
        expire: expirationDate.toUTCString(),
        path: '/'
      });
    }
  }
  catch(e:any){
    data.message = e.response.data.message
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
  const data: IAuthExport= { data: null, message: null };
  try {
    const result = await axios.post(`${url}/auth/register`, {name, lastName, email, username, password});

    if (result.data.token !== null) {
      const { exp } = jwtDecode<JwtPayload>(result.data.token);
      const expirationDate = new Date(exp! * 1000);

      VueCookieNext.setCookie("token",result.data.token, { expire: expirationDate.toUTCString() });
      VueCookieNext.setCookie("user", JSON.stringify(result.data.user), {
        expire: expirationDate.toUTCString(),
        path: '/'
      });

      data.data = result.data;
    }
      router.push({ name: 'table'});
  }
  catch(e:any){
    data.message = e.response.data.message
    console.log(e)
  }
  return data;
}

export { register, login,  };
