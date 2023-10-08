const LoginUser = require("../LoginUser");

describe("a loginuser entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      username: "abc",
    };

    // action and assert
    expect(() => new LoginUser(payload)).toThrowError(
      "LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      username: 123,
      password: "abc",
    };

    // Action and Assert
    expect(() => new LoginUser(payload)).toThrowError(
      "LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create logiinuser object correctly", () => {
    // Arrange
    const payload = {
      username: "abc",
      password: "secret",
    };

    // action
    const loginUser = new LoginUser(payload);

    // Assert
    expect(loginUser.username).toEqual(payload.username);
    expect(loginUser.password).toEqual(payload.password);
  });
});
