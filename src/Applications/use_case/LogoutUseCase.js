const RefreshToken = require("../../Domains/authentications/entities/RefreshToken");

class LogoutUseCase {
  constructor({ authenticationRepository }) {
    this._authenticationRepository = authenticationRepository;
  }

  async execute(requestPayload) {
    const { refreshToken } = new RefreshToken(requestPayload);
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);
    await this._authenticationRepository.deleteToken(refreshToken);
  }
}

module.exports = LogoutUseCase;
