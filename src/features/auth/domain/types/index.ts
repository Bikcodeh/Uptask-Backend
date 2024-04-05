const AUTH_TYPES = {
    AuthRepository: Symbol.for('AuthRepository'),
    AuthController: Symbol.for('AuthController'),
    AuthMapper:     Symbol.for('AuthMapper'),
    AuthService:    Symbol.for('AuthService')
}

export { AUTH_TYPES };