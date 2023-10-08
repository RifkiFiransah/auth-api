const pool = require("../../database/postgres/pool");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AuthenticationsTableTestHelper = require("../../../../tests/AuthenticationsTableTestHelper");
const container = require("../../container");
const createServer = require("../createServer");

describe("authentications endpoints", () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("POST authentication", () => {
    it("should response 201 and persisted auth", async () => {
      // Arrange
      const requestPayload = {
        username: "dicoding",
        password: "secret",
      };
      const server = await createServer(container);
      // add user
      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "dicoding",
          password: "secret",
          fullname: "Dicoding Indonesia",
        },
      });

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });

    it("should response 400 when request requestpayload not contain needed property", async () => {
      // Arrange
      const requestPayload = {
        username: "dicoding",
      };
      const server = await createServer(container);
      // Acd user
      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "dicoding",
          password: "secret",
          fullname: "Dicoding Indonesia",
        },
      });

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "gagal login karena property yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const requestPayload = {
        username: ["dicoding"],
        password: ["true"],
      };
      const server = await createServer(container);
      // Acd user
      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "dicoding",
          password: "secret",
          fullname: "Dicoding Indonesia",
        },
      });

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "gagal login karena tipe data tidak sesuai"
      );
    });

    it("should response 400 when username not found", async () => {
      // Arrange
      const requestPayload = {
        username: "dicoding",
        password: "secret",
      };

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("username tidak ditemukan");
    });

    it("should response 401 when password is wrong", async () => {
      // Arrange
      const requestPayload = {
        username: "dicoding",
        password: "wrong",
      };

      const server = await createServer(container);
      // add user
      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "dicoding",
          password: "secret",
          fullname: "Dicoding Indonesia",
        },
      });

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("password anda salah");
    });
  });

  describe("PUT authentication", () => {
    it("should return response 400 when refreshToken not meet data type specification", async () => {
      // Arrange
      const requestPayload = {
        refreshToken: true,
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          requestPayload,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "refresh token tidak ditemukan pada payload"
      );
    });

    it("should return response 400 when payload not contain refreshToken", async () => {
      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {},
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "refresh token tidak ditemukan pada payload"
      );
    });

    it("should return response 400 when refreshToken not valid", async () => {
      // Arrange
      const requestPayload = {
        refreshToken: "refresh_token",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          requestPayload,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "refresh token tidak ditemukan pada payload"
      );
    });

    it("should return response 200 and get new AccessToken", async () => {
      // Arrange
      const server = await createServer(container);
      // Add user
      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "dicoding",
          password: "secret",
          fullname: "Dicoding Indonesia",
        },
      });
      // login
      const loginResponse = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: {
          username: "dicoding",
          password: "secret",
        },
      });
      const {
        data: { refreshToken },
      } = JSON.parse(loginResponse.payload);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          refreshToken,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.accessToken).toBeDefined();
    });
  });

  describe("DELETE authentication", () => {
    it("should return response 400 when refresh token not availability in database", async () => {
      // Arrange
      const requestPayload = {
        refreshToken: "refresh_token",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {
          requestPayload,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
    });

    it("should return response 400 when refresh token not a string", async () => {
      // Arrange
      const requestPayload = {
        refreshToken: true,
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {
          requestPayload,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
    });

    it("should return response 400 when payload not contain refresh token", async () => {
      // Arrange
      const requestPayload = {};
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {
          requestPayload,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
    });

    it("should return 200 and persisted logout delete authentication", async () => {
      // Arrange
      const server = await createServer(container);
      /** Add user */
      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "dicoding",
          password: "secret",
          fullname: "Dicoding Indonesia",
        },
      });
      /** Login */
      const responseLogin = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: {
          username: "dicoding",
          password: "secret",
        },
      });

      const {
        data: { refreshToken },
      } = JSON.parse(responseLogin.payload);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {
          refreshToken,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
    });
  });
});
