import httpCommon from "./httpCommon";

class AuthService {
  login(data: any) {
    return httpCommon.post("/client/login", data);
  }

  register(data: any) {
    console.log(data);
    return httpCommon.post("/client/register", data);
  }
}
export default new AuthService();