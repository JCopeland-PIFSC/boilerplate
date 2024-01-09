class RadfishAuthenticationService {
  static loading = false;
  static error = null;

  async signIn(loginId, password, endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId,
          password,
        }),
      });
      if (!response.ok) {
        console.log("err");
      }
      const responseJson = await response.json();
      localStorage.setItem("token", responseJson.token);
      return responseJson;
    } catch (err) {
    } finally {
    }
  }

  async signOut(token, endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      if (!response.ok) {
        console.log("Failed to remove token on server");
      }
      localStorage.removeItem("token"); // always remove token from localStorage
    } catch (err) {
      console.log("failed to remove token: ", err);
    }
  }
}
export default new RadfishAuthenticationService();
