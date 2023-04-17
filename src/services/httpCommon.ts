import axios from "axios";
import Url from "./baseUrl";
export default axios.create({
  baseURL: Url,
  headers: {
    "Content-type": "application/json",
},
});