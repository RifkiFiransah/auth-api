const RefreshToken = require("../../Domains/authentications/entities/RefreshToken");

class RefreshAccessToken {
  constructor({ authenticationRepository, tokenManager }) {
    this._authenticationRepository = authenticationRepository;
    this._tokenManager = tokenManager;
  }

  async execute(payload) {
    const { refreshToken } = new RefreshToken(payload);
    const { id } = await this._tokenManager.verifyRefreshToken(refreshToken);
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);
    const accessToken = await this._tokenManager.generateAccessToken({ id });

    return accessToken;
  }
}

module.exports = RefreshAccessToken;
