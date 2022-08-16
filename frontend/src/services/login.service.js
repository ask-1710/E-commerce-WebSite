import http from "../http-common";

class LoginDataService {

  async authorizeShopper(mobile, password) {
      // POST request using axios with async/await
      const article = { mobile: mobile, password: password }
      return http.post('/login/shopper', article)
  }

  async authorizeSeller(mobile, password) {
    // POST request using axios with async/await
    const article = { mobile: mobile, password: password }
    return http.post('/login/seller', article)
  }

}

export default new LoginDataService();