const LoginUser = require("../../../Domains/users/entities/LoginUser");
const LoginAuthentication = require("../../../Domains/authentications/entities/LoginAuthentication");
const UserRepository = require("../../../Domains/users/UserRepository");
const AuthenticationRepository = require("../../../Domains/authentications/AuthenticationRepository");
const TokenManager = require("../../security/TokenManager");
const PasswordHash = require("../../security/PasswordHash");
const LoginUseCase = require("../LoginUseCase");

describe("LoginUseCase", () => {
  it("should orchestrating the login user action correctly", async () => {
    // Arrange
    const useCasePayload = {
      username: "dicoding",
      password: "secret",
    };
    const { username, password } = new LoginUser(useCasePayload);
    const mockAuthentication = new LoginAuthentication({
      accessToken: "access_token",
      refreshToken: "refresh_token",
    });

    /** creating dependency of use case */
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockTokenManager = new TokenManager();

    /** mocking needed function */
    mockUserRepository.getPasswordByUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve("encrypted_password"));
    mockPasswordHash.compare = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockUserRepository.getIdByUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve("user-123"));
    mockTokenManager.generateAccessToken = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockAuthentication.accessToken)
      );
    mockTokenManager.generateRefreshToken = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockAuthentication.refreshToken)
      );
    mockAuthenticationRepository.addToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const getLoginUseCase = new LoginUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      tokenManager: mockTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action
    const authenticated = await getLoginUseCase.execute(useCasePayload);

    // Assert
    expect(authenticated).toStrictEqual(mockAuthentication);
    expect(mockUserRepository.getPasswordByUsername).toBeCalledWith(username);
    expect(mockPasswordHash.compare).toBeCalledWith(
      password,
      "encrypted_password"
    );
    expect(mockUserRepository.getIdByUsername).toBeCalledWith(username);
    expect(mockTokenManager.generateAccessToken).toBeCalledWith({
      username: useCasePayload.username,
      id: "user-123",
    });
    expect(mockTokenManager.generateRefreshToken).toBeCalledWith({
      username: useCasePayload.username,
      id: "user-123",
    });
    expect(mockAuthenticationRepository.addToken).toBeCalledWith(
      mockAuthentication.refreshToken
    );
  });
});
