import type { IAuthExport } from "@/models/auth.store.models";
import type { IDataItem } from "@/models/phishing.store.models";
import axios from "axios"
import { VueCookieNext } from "vue-cookie-next";

const url = "http://localhost:3000/api";

async function sendEmail(email: string): Promise<number> {
  try {
    const token = VueCookieNext.getCookie('token');

    const result = await axios.post(`${url}/phishing`, 
      { email },
      {      
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return 200;
  }
  catch(e:any){
    console.log(e);
    return 400;

  }
}

async function getAllAttempts(): Promise<IDataItem[] | null> {
  try {
    const token = VueCookieNext.getCookie('token');

    const result = await axios.get(`${url}/phishing`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(result) {
        return result.data 
    }

    return null;
  }
  catch(e:any){
    console.log(e);
    return null;
  }
}

export { getAllAttempts, sendEmail  };
