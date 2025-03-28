import axiosA from "axios";

const axios = axiosA.create({
    baseURL: "https://thietbibe.ithub.vn",
    timeout: 10000,
    withCredentials: true,
    headers: {},
});

export default axios;
