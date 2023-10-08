class LoginAuthentication {
  constructor(payload) {
    this._verifyPayload(payload);

    const { accessToken, refreshToken } = payload;

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  _verifyPayload({ accessToken, refreshToken }) {
    if (!accessToken || !refreshToken) {
      throw new Error("LOGIN_AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
      throw new Error("LOGIN_AUTHENTICATION.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = LoginAuthentication;
