const addressRule = ['street', 'number', 'district', 'city', 'state']

module.exports = {
  register: {
    post: ({ name, email, password, confirmPassword }) => {
      const data = { error: false, invalidFields: [] }

      if (!name) {
        data.error = true
        data.invalidFields.push({ field: 'name', message: 'Nome obrigatório!' })
      }

      if (!email) {
        data.error = true
        data.invalidFields.push({ field: 'email', message: 'Email obrigatório!' })
      }

      if (!password) {
        data.error = true
        data.invalidFields.push({ field: 'password', message: 'Senha obrigatória!' })
      }

      if (!confirmPassword) {
        data.error = true
        data.invalidFields.push({ field: 'confirmPassword', message: 'Confirmação de senha obrigatória!' })
      }

      if (password !== confirmPassword) {
        data.error = true
        data.invalidFields.push({ field: 'confirmPassword', message: 'Senha e confirmação de senha não batem!' })
      }

      return data
    }
  },

  login: {
    post: ({ email, password }) => {
      const data = { error: false, invalidFields: [] }

      if (!email) {
        data.error = true
        data.invalidFields.push({ field: 'email', message: 'Email obrigatório!' })
      }

      if (!password) {
        data.error = true
        data.invalidFields.push({ field: 'password', message: 'Senha obrigatória!' })
      }

      return data
    }
  },

  example: {
    post: ({}) => {
      const data = { error: false, invalidFields: [] }

      if (!exampleField) {
        data.error = true
        data.invalidFields.push({ field: 'exampleField', message: 'ExampleField obrigatório!' })
      }

      return data
    }
  }
}
