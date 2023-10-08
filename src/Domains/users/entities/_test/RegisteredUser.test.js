const RegisteredUser = require('../RegisteredUser')

describe('a RegisterUser entitites', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      password: 'Dicoding Indonesia'
    }

    // action and assert 
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 'dicoding',
      fullname: 'Dicoding Indonesia'
    }

    // action and assert 
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create registeredUser object correctly', () => {
    // Arrange
    const payload = {
      id: 'user-123',
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    }

    // action 
    const registeredUser = new RegisteredUser(payload)

    // assert
    expect(registeredUser.username).toEqual(payload.username)
    expect(registeredUser.fullname).toEqual(payload.fullname)
    expect(registeredUser.password).toEqual(payload.password)
  })
})