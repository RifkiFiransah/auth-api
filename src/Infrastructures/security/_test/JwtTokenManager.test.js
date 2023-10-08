const jwt = require("@hapi/jwt");
const JwtTokenManager = require("../JwtTokenManager");
const InvariantError = require("../../../Commons/exceptions/InvariantError");

describe("jwttokenmanager", () => {
  describe("generateaccesstoken function", () => {
    it("should return generate access token correctly", async () => {
      // arrange
      const payload = {
        id: "user-123",
      };
      const spyGenerateAccessToken = jest.spyOn(jwt.token, "generate");
      const jwtTokenmanager = new JwtTokenManager(jwt);

      // action
      const accessToken = await jwtTokenmanager.generateAccessToken(payload);

      // assert
      expect(typeof accessToken).toEqual("string");
      expect(accessToken).not.toEqual(payload);
      expect(spyGenerateAccessToken).toBeCalledWith(
        payload,
        process.env.ACCESS_TOKEN_KEY
      );
    });
  });

  describe("generaterefreshtoken function", () => {
    it("should return generate refresh token correctly", async () => {
      // arrange
      const payload = {
        id: "user-123",
      };
      const spyGenerateRefreshToken = jest.spyOn(jwt.token, "generate");
      const jwtTokenmanager = new JwtTokenManager(jwt);

      // action
      const refreshToken = await jwtTokenmanager.generateRefreshToken(payload);

      // assert
      expect(typeof refreshToken).toEqual("string");
      expect(refreshToken).not.toEqual(payload);
      expect(spyGenerateRefreshToken).toBeCalledWith(
        payload,
        process.env.REFRESH_TOKEN_KEY
      );
    });
  });

  describe("verifyrefreshtoken function", () => {
    it("should throw invarianterror when verification failed", async () => {
      // Arrange
      const jwtTokenmanager = new JwtTokenManager(jwt);
      const accessToken = await jwtTokenmanager.generateAccessToken({
        id: "user-123",
      });

      // Action and assert
      await expect(
        jwtTokenmanager.verifyRefreshToken(accessToken)
      ).rejects.toThrowError(InvariantError);
    });

    it("should return refreshtoken correctly", async () => {
      // Arrange
      const jwtTokenmanager = new JwtTokenManager(jwt);
      const refreshToken = await jwtTokenmanager.generateRefreshToken({
        id: "user-123",
      });

      // Action and assert
      await expect(
        jwtTokenmanager.verifyRefreshToken(refreshToken)
      ).resolves.not.toThrowError(InvariantError);
    });
  });
});
