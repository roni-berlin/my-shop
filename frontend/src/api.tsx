import * as dotenv from "dotenv";
import axios, { AxiosResponse, AxiosError } from "axios";
import Swal from "sweetalert2";
dotenv.config({ path: "../.env" });
const url = `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

interface loginData {
  email: string;
  password: string;
}

interface registerData extends loginData {
  firstname: string;
  lastName: string;
}

interface refreshTokenData {
  refreshToken: string;
  _id: string;
}

export default {
  login(loginInfo: loginData) {
    return axios
      .post(
        `${url}/sign-in`,
        { loginInfo }
        // { withCredentials: true, credentials: "include" }
      )
      .then((res) => res.data)
      .catch((e: AxiosError) => {
        if (e.response?.status === 400) {
          Swal.fire({
            title: "oops...",
            text: e.response.data,
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "oops...",
            text: "cannot login",
            icon: "error",
          });
        }
      });
  },
  register(registerInfo: registerData) {
    return axios
      .post(
        `${url}/sign-up`,
        { registerInfo }
        //  { withCredentials: true, credentials: "include" }
      )
      .then((res) => res.data)
      .catch((e: AxiosError) => {
        if (e.response?.status === 409) {
          Swal.fire({
            title: "oops...",
            text: e.response.data,
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "oops...",
            text: "cannot register",
            icon: "error",
          });
        }
      });
  },
  async refreshToken(refreshTokenData: refreshTokenData) {
    try {
      const res: AxiosResponse = await axios.post(
        `${url}/refresh-token`,
        { refreshTokenData }
        //  { withCredentials: true, credentials: "include" }
      );
      return res.data; //.accessToken; //change the server send only access token
    } catch (e) {
      console.log(e);
    }
  },
  async validate(accessToken: string | undefined) {
    try {
      const res = await axios.post(`${url}/validate`, { accessToken });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
};
