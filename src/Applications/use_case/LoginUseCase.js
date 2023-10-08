const LoginUser = require("../../Domains/users/entities/LoginUser");
const LoginAuthentication = require("../../Domains/authentications/entities/LoginAuthentication");

class LoginUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    tokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._tokenManager = tokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { username, password } = new LoginUser(useCasePayload);
    const hashedPassword = await this._userRepository.getPasswordByUsername(
      username
    );
    await this._passwordHash.compare(password, hashedPassword);
    const id = await this._userRepository.getIdByUsername(username);
    const accessToken = await this._tokenManager.generateAccessToken({
      username,
      id,
    });
    const refreshToken = await this._tokenManager.generateRefreshToken({
      username,
      id,
    });

    const loginAuthentication = new LoginAuthentication({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(
      loginAuthentication.refreshToken
    );

    return loginAuthentication;
  }
}

module.exports = LoginUseCase;
