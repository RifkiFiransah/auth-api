const InvariantError = require("../exceptions/InvariantError");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
    //   switch(error.message){
    //     case 'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY':
    //       return new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada')
    //     case 'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION':
    //       return new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai')
    //     case 'REGISTER_USER.USERNAME_LIMIT_CHAR':
    //       return new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit')
    //     case 'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER':
    //       return new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang')
    //     default:
    //       return error
    //   }
  },
};

DomainErrorTranslator._directories = {
  "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"
  ),
  "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat user baru karena tipe data tidak sesuai"
  ),
  "REGISTER_USER.USERNAME_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER": new InvariantError(
    "tidak dapat membuat user baru karena username mengandung karakter terlarang"
  ),

  "LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "gagal login karena property yang dibutuhkan tidak ada"
  ),
  "LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "gagal login karena tipe data tidak sesuai"
  ),

  "REFRESH_AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "refresh token tidak ditemukan pada payload"
  ),
  "REFRESH_AUTHENTICATION.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "refresh token harus string"
  ),
};

module.exports = DomainErrorTranslator;
