const LogoutUseCase = require("../LogoutUseCase");
const AuthenticationRepository = require("../../../Domains/authentications/AuthenticationRepository");
const RefreshToken = require("../../../Domains/authentications/entities/RefreshToken");

describe("LogoutUseCase", () => {
  it("should orchestrating logout and delete authentication action correctly", async () => {
    // Arrange
    const requestPayload = {
      refreshToken: "refresh_token",
    };
    const { refreshToken } = new RefreshToken(requestPayload);

    /** creating depedency of use case */
    const mockAuthenticationRepository = new AuthenticationRepository();

    /** mocking needed function */
    mockAuthenticationRepository.checkAvailabilityToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationRepository.deleteToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const mockLogoutUseCase = new LogoutUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    // Action
    await mockLogoutUseCase.execute(requestPayload);

    // Assert
    expect(mockAuthenticationRepository.checkAvailabilityToken).toBeCalledWith(
      refreshToken
    );
    expect(mockAuthenticationRepository.deleteToken).toBeCalledWith(
      refreshToken
    );
  });
});
