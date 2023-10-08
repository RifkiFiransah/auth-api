const RefreshAccessToken = require("../RefreshAccessToken");
const AuthenticationRepository = require("../../../Domains/authentications/AuthenticationRepository");
const TokenManager = require("../../security/TokenManager");
// const RefreshToken = require("../../../Domains/authentications/entities/RefreshToken");

describe("RefreshAccessToken", () => {
  it("should throw error when use case payload not contain refreshToken", async () => {
    // Arrange
    const useCasePayload = {};

    // Action
    const refreshToken = new RefreshAccessToken({});

    // Assert
    await expect(() =>
      refreshToken.execute(useCasePayload)
    ).rejects.toThrowError(
      "REFRESH_AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when use case payload not meet data type specification", async () => {
    // Arrange
    const requestPayload = {
      refreshToken: 123,
    };

    // Action
    const refreshToken = new RefreshAccessToken({});

    // Assert
    await expect(() =>
      refreshToken.execute(requestPayload)
    ).rejects.toThrowError(
      "REFRESH_AUTHENTICATION.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the refresh authentication action correctly", async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: "refresh_token",
    };

    const mockAuthRepo = new AuthenticationRepository();
    const mockTokenManager = new TokenManager();

    mockAuthRepo.checkAvailabilityToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.verifyRefreshToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ id: "user-123" }));
    mockTokenManager.generateAccessToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve("accessToken123"));

    // Action
    const refreshAccessToken = new RefreshAccessToken({
      authenticationRepository: mockAuthRepo,
      tokenManager: mockTokenManager,
    });

    const accessToken = await refreshAccessToken.execute(useCasePayload);

    // Assert
    expect(mockAuthRepo.checkAvailabilityToken).toBeCalledWith(
      useCasePayload.refreshToken
    );
    expect(mockTokenManager.verifyRefreshToken).toBeCalledWith(
      useCasePayload.refreshToken
    );
    expect(mockTokenManager.generateAccessToken).toBeCalledWith({
      id: "user-123",
    });
    expect(accessToken).toStrictEqual("accessToken123");
  });
});
