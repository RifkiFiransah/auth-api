class TokenManager {
  async generateAccessToken(token) {
    throw new Error("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }

  async generateRefreshToken(token) {
    throw new Error("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }

  async verifyRefreshToken(token) {
    throw new Error("TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = TokenManager;
