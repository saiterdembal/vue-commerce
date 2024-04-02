import axios from "axios";

const axiosHttp = axios.create({
    // baseURL: "https://axios-f9357-default-rtdb.firebaseio.com/",
    baseURL: "http://localhost:3001/"
})

export default axiosHttp;
