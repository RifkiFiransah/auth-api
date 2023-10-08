const AuthenticationRepository = require("../AuthenticationRepository");

describe("authentication repository interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const authenticationRepository = new AuthenticationRepository();

    // Action and Assert
    await expect(authenticationRepository.addToken({})).rejects.toThrowError(
      "AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(authenticationRepository.putToken({})).rejects.toThrowError(
      "AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(
      authenticationRepository.checkAvailabilityToken({})
    ).rejects.toThrowError("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(authenticationRepository.deleteToken({})).rejects.toThrowError(
      "AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
});
