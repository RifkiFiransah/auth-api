const RefreshToken = require("../RefreshToken");

describe("a RefreshToken entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new RefreshToken(payload)).toThrowError(
      "REFRESH_AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      refreshToken: ["abc"],
    };

    // Action and Assert
    expect(() => new RefreshToken(payload)).toThrowError(
      "REFRESH_AUTHENTICATION.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create loginAuth object correctly", () => {
    // Arrange
    const payload = {
      refreshToken: "abc",
    };

    // Action
    const { refreshToken } = new RefreshToken(payload);

    // Assert
    expect(refreshToken).toEqual(payload.refreshToken);
  });
});
