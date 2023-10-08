const AuthenticationsTableTestHelper = require("../../../../tests/AuthenticationsTableTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const pool = require("../../database/postgres/pool");
const AuthenticationRepositoryPostgres = require("../AuthenticationRepositoryPostgres");

describe("AuthenticationRepositoryPostgres", () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addToken function", () => {
    it("should return refreshtoken correctly", async () => {
      // Arrange
      const authenticationRepositoryPostgres =
        new AuthenticationRepositoryPostgres(pool);
      const refreshToken = "refresh_token";

      // Action
      await authenticationRepositoryPostgres.addToken(refreshToken);

      // Assert
      const token = await AuthenticationsTableTestHelper.findToken(
        refreshToken
      );
      expect(token).toHaveLength(1);
      expect(token[0].token).toEqual(refreshToken);
    });
  });

  describe("verifyToken function", () => {
    it("should thow invarianterror when refreshtoken not available", async () => {
      // Arrange
      const authenticationRepositoryPostgres =
        new AuthenticationRepositoryPostgres(pool);
      const refreshToken = "refresh_token";

      // Action and Assert
      await expect(() =>
        authenticationRepositoryPostgres.verifyToken(refreshToken)
      ).rejects.toThrowError(InvariantError);
    });

    it("should thow invarianterror when refreshtoken available", async () => {
      // Arrange
      const authenticationRepositoryPostgres =
        new AuthenticationRepositoryPostgres(pool);
      const refreshToken = "refresh_token";

      await AuthenticationsTableTestHelper.addToken(refreshToken);

      // Action and Assert
      await expect(() =>
        authenticationRepositoryPostgres.verifyToken(refreshToken)
      ).not.toThrowError(InvariantError);
    });
  });

  describe("checkAvailabilityToken", () => {
    it("should throw InvariantError when token not available", async () => {
      // Arrange
      const authRepoPosgres = new AuthenticationRepositoryPostgres(pool);

      // Action and Assert
      await expect(() =>
        authRepoPosgres.checkAvailabilityToken("token")
      ).rejects.toThrowError(InvariantError);
    });

    it("should not throw InvariantError when token is available", async () => {
      // Arrange
      const authRepoPosgres = new AuthenticationRepositoryPostgres(pool);
      const token = "token";
      await AuthenticationsTableTestHelper.addToken(token);

      // Action and Assert
      await expect(
        authRepoPosgres.checkAvailabilityToken(token)
      ).resolves.not.toThrow(InvariantError);
    });
  });

  describe("deleteToken", () => {
    it("should return deletetoken correctly", async () => {
      // Arrange
      const authenticationRepositoryPostgres =
        new AuthenticationRepositoryPostgres(pool);
      const refreshToken = "refresh_token";

      await AuthenticationsTableTestHelper.addToken(refreshToken);

      // action
      await authenticationRepositoryPostgres.deleteToken(refreshToken);

      // Assert
      const token = await AuthenticationsTableTestHelper.findToken(
        refreshToken
      );
      expect(token).not.toHaveLength(1);
    });
  });
});
