const LoginAuthentication = require("../LoginAuthentication");

describe("a LoginAuthentication entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const requestPayload = {
      accessToken: "abc",
    };

    // Action and Assert
    expect(() => new LoginAuthentication(requestPayload)).toThrowError(
      "LOGIN_AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const requestPayload = {
      accessToken: "abc",
      refreshToken: ["abc"],
    };

    // Action and Assert
    expect(() => new LoginAuthentication(requestPayload)).toThrowError(
      "LOGIN_AUTHENTICATION.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create loginAuth object correctly", () => {
    // Arrange
    const payload = {
      accessToken: "abc",
      refreshToken: "abc",
    };

    // Action
    const { accessToken, refreshToken } = new LoginAuthentication(payload);

    // Assert
    expect(accessToken).toEqual(payload.accessToken);
    expect(refreshToken).toEqual(payload.refreshToken);
  });
});
