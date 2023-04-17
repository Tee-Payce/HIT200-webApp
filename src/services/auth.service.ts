import httpCommon from "./httpCommon";

class AuthService {
  login(data: any) {
    return httpCommon.post("/auth/login", data);
  }

  register(data: { fname: string; sname: string; studentID: string; password: string; }) {
    return httpCommon.post("/auth/register", data);
  }
}
export default new AuthService();