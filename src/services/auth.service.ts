import httpCommon from "./httpCommon";

class AuthService {
  login(data: any) {
    return httpCommon.post("/user/login", data);
  }

  register(data: any) {
    console.log(data);
    return httpCommon.post("/user/register", data);
  }
}
export default new AuthService();