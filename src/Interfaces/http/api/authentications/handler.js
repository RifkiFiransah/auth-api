const LoginUseCase = require("../../../../Applications/use_case/LoginUseCase");
const RefreshAccessToken = require("../../../../Applications/use_case/RefreshAccessToken");
const LogoutUseCase = require("../../../../Applications/use_case/LogoutUseCase");

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler =
      this.deleteAuthenticationHandler.bind(this);
  }
  async postAuthenticationHandler(request, h) {
    const loginUserUseCase = this._container.getInstance(LoginUseCase.name);
    const { accessToken, refreshToken } = await loginUserUseCase.execute(
      request.payload
    );

    const response = h.response({
      status: "success",
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }
  async putAuthenticationHandler(request, h) {
    const refreshToken = this._container.getInstance(RefreshAccessToken.name);
    const accessToken = await refreshToken.execute(request.payload);

    const response = h.response({
      status: "success",
      data: {
        accessToken,
      },
    });

    response.code(200);

    return response;
  }
  async deleteAuthenticationHandler(request, h) {
    const logoutUseCase = this._container.getInstance(LogoutUseCase.name);
    await logoutUseCase.execute(request.payload);
    const response = h.response({
      status: "success",
    });

    response.code(200);
    return response;
  }
}

module.exports = AuthenticationsHandler;
