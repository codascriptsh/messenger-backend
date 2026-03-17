export class CustomError {

  constructor(message, code, data = null) {
    this.code = code
    this.message = message
    this.data = data
  }
}
