const TokenManager = require("../TokenManager");

describe("TokenManager Interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const tokenManager = new TokenManager();

    // Action and Assert
    await expect(
      tokenManager.generateAccessToken("dummy_accesToken")
    ).rejects.toThrowError("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
    await expect(
      tokenManager.generateRefreshToken("dummy_refreshToken")
    ).rejects.toThrowError("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
    await expect(
      tokenManager.verifyRefreshToken("dummy_token")
    ).rejects.toThrowError("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  });
});
