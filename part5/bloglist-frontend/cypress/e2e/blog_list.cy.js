describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'cypress',
      name: 'Tomas Keane',
      password: 'testing'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('log in').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('cypress')
      cy.get('#password').type('testing')
      cy.get('#login-button').click()

      cy.contains('Tomas Keane logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('cypress')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Tomas Keane logged in').should('not.exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('cypress')
      cy.get('#password').type('testing')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.contains('Save').click()

      cy.contains('show').click()
      cy.contains('blog created by cypress')
      cy.contains('Cypress')
      cy.contains('https://www.cypress.io/')
    })

    it('users can like a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.contains('Save').click()

      cy.contains('show').click()
      cy.contains(0)
      cy.contains('like').click()
      cy.contains(1)
    })
  })
})
