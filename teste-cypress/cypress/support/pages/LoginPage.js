class LoginPage {
  // Mapeamento de Elementos (ajuste os seletores conforme o HTML real da sua aplicação)
  elements = {
    usernameInput: () => cy.get('input[name="username"], input[id="usuario"], input[type="text"]').first(),
    passwordInput: () => cy.get('input[name="password"], input[id="senha"], input[type="password"]').first(),
    submitButton: () => cy.get('button[type="submit"], input[type="submit"], button:contains("Entrar")').first(),
    forgotPasswordLink: () => cy.get('a:contains("Esqueci"), a:contains("recuperar")').first(),
    emailRecoveryInput: () => cy.get('input[type="email"], input[name="email"]').first(),
    submitRecoveryButton: () => cy.get('button:contains("Enviar"), button:contains("Recuperar")').first(),
    errorMessage: () => cy.get('.alert, .error, [role="alert"], .invalid-feedback').first(),
    passwordToggleIcon: () => cy.get('.toggle-password, .fa-eye, .fa-eye-slash').first()
  }

  // Ações
  visit() {
    cy.visit('https://megafesta.ddns.net/login')
  }

  fillUsername(username) {
    this.elements.usernameInput().clear().type(username)
  }

  fillPassword(password) {
    this.elements.passwordInput().clear().type(password, { sensitive: true })
  }

  clickSubmit() {
    this.elements.submitButton().click()
  }

  login(username, password) {
    if (username) this.fillUsername(username)
    if (password) this.fillPassword(password)
    this.clickSubmit()
  }

  clickForgotPassword() {
    this.elements.forgotPasswordLink().click()
  }

  recoverPassword(email) {
    this.clickForgotPassword()
    this.elements.emailRecoveryInput().clear().type(email)
    this.elements.submitRecoveryButton().click()
  }
}

export default new LoginPage()