import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-dc4f9.firebaseio.com/",
});

export default instance;
