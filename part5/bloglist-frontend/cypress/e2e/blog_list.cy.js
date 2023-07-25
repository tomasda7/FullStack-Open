describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'cypress',
      name: 'Tomas Keane',
      password: 'testing'
    }
    const user2 = {
      username: 'tomas',
      name: 'Manuel Ginobilli',
      password: 'leston'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
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

    it('the user who created a blog can delete it', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.contains('Save').click()

      cy.contains('show').click()
      cy.contains('remove').click()

      cy.get('.success').should('contain', 'blog created by cypress was deleted successfully!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Cypress').should('not.exist')
      cy.contains('https://www.cypress.io/').should('not.exist')
    })

    it('only the creator can see the delete button of a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.contains('Save').click()

      cy.contains('show').click()
      cy.contains('remove')

      cy.contains('logout').click()

      cy.contains('log in').click()
      cy.get('#username').type('tomas')
      cy.get('#password').type('leston')
      cy.get('#login-button').click()

      cy.contains('show').click()
      cy.contains('remove').should('not.exist')
    })

    it('blogs are ordered by the number of likes from most to less', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('this blog must be second')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.contains('Save').click()

      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains(1)
      cy.contains('like').click()
      cy.contains(2)
      cy.contains('hide').click()

      cy.contains('new blog').click()
      cy.get('#title').type('this blog must be first')
      cy.get('#author').type('Leston')
      cy.get('#url').type('https://www.tomasRules.com')
      cy.contains('Save').click()

      cy.contains('Leston')

      cy.get('button:last').click()
      cy.contains('like').click()
      cy.contains(1)
      cy.contains('like').click()
      cy.contains(2)
      cy.contains('like').click()
      cy.contains(3)
      cy.contains('hide').click()

      cy.get('.blog').eq(0).should('contain', 'this blog must be first')
      cy.get('.blog').eq(1).should('contain', 'this blog must be second')
    })
  })
})
