describe('Blog app', function() {
  beforeEach(function () {
    const user = {
      username: 'root',
      name: 'root',
      password: 'root'
    }

    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000/')
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000/')
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.clearLocalStorage()
      cy.visit('http://localhost:3000/')
      cy.get('#username').type('wrongUsername')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.clearLocalStorage()
      cy.login({ username: 'root', password: 'root' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('X')
      cy.get('#author').type('Author X')
      cy.get('#url').type('x.com')
      cy.get('#submit-button').click()
      cy.contains('a new blog X by Author X has been added')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('X')
      cy.get('#author').type('Author X')
      cy.get('#url').type('x.com')
      cy.get('#submit-button').click()
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed by authorized user', function() {
      cy.createBlog({
        author: 'Author X',
        title: "X",
        url: "x.com"
      })
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
    })

    it.only('The blogs are arranged in correct order according to the likes', function() {
      cy.createBlog({
        author: 'Author A',
        title: "A",
        url: "a.com"
      })
      cy.createBlog({
        author: 'Author B',
        title: "B",
        url: "b.com"
      })
      cy.createBlog({
        author: 'Author C',
        title: "C",
        url: "c.com"
      })
      cy.contains('A').parent().as('blog1')
      cy.contains('B').parent().as('blog2')
      cy.contains('C').parent().as('blog3')
      
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)

      cy.get('#blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})