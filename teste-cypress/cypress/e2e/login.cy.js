import LoginPage from '../support/pages/LoginPage'

describe('Suíte de Testes - Tela de Login (Megafesta)', () => {
  
  beforeEach(() => {
    LoginPage.visit()
  })

  context('Cenários Positivos (Happy Path)', () => {
    
    it('[CT01] Deve realizar login com sucesso usando credenciais válidas', () => {
      LoginPage.login('admin', 'admin123')
      
      // Validação: Garante que saiu da tela de login e foi para o dashboard/home
      cy.url().should('not.include', '/login')
      // Adicione aqui uma asserção para um elemento exclusivo da home, ex: cy.get('#dashboard').should('be.visible')
    })

    it('[CT02] Deve solicitar a recuperação de senha com e-mail válido', () => {
      LoginPage.recoverPassword('carloshenrique39@gmail.com')
      
      // Validação: Mensagem de sucesso ao enviar o e-mail de recuperação
      LoginPage.elements.errorMessage().should('be.visible')
        .and('contain.text', 'enviado') // Ajuste o texto conforme a mensagem real do sistema
    })
  })

  context('Cenários Negativos e Validações', () => {
    
    it('[CT03] Deve exibir erro ao tentar logar com senha incorreta', () => {
      LoginPage.login('admin', 'SenhaErrada123')
      
      LoginPage.elements.errorMessage().should('be.visible')
        .and('contain.text', 'inválid') // Valida mensagem genérica de erro
      cy.url().should('include', '/login')
    })

    it('[CT04] Deve exibir erro ao tentar logar com usuário inexistente', () => {
      LoginPage.login('usuario_inexistente', 'admin123')
      
      LoginPage.elements.errorMessage().should('be.visible')
        .and('contain.text', 'inválid')
      cy.url().should('include', '/login')
    })

    it('[CT05] Não deve permitir submissão com campos em branco', () => {
      // Clica direto no botão de entrar sem preencher nada
      LoginPage.clickSubmit()
      
      // Valida se permaneceu na tela de login
      cy.url().should('include', '/login')
      // Opcional: validar HTML5 validation (ex: checkar se o input está com o atributo invalid)
      LoginPage.elements.usernameInput().then(($input) => {
        expect($input[0].validationMessage).to.not.be.empty
      })
    })

    it('[CT06] Deve validar formato de e-mail inválido na recuperação de senha', () => {
      LoginPage.recoverPassword('carloshenrique39@com')
      
      // O sistema deve barrar por formato inválido ou retornar erro
      LoginPage.elements.errorMessage().should('be.visible')
    })
  })

  context('Cenários de Usabilidade e UI', () => {
    
    it('[CT07] Deve mascarar o campo de senha por padrão', () => {
      LoginPage.fillPassword('admin123')
      
      // Verifica se o input é do tipo password (garantindo que está mascarado)
      LoginPage.elements.passwordInput().should('have.attr', 'type', 'password')
    })

    it('[CT08] Deve permitir submeter o formulário pressionando Enter', () => {
      LoginPage.fillUsername('admin')
      LoginPage.fillPassword('admin123')
      
      // Pressiona Enter no campo de senha para disparar o submit
      LoginPage.elements.passwordInput().type('{enter}')
      
      // Validação de que a submissão ocorreu
      cy.url().should('not.include', '/login')
    })
  })
})