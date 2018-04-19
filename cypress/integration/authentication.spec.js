import firebase, { auth } from '../../src/config/firebase'

describe('=== Authentication ===', () => {
  beforeEach(() => {
    cy.visit('/login')
    auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
  })

  it.only('should display the login page', () => {
    cy.get(':nth-child(1) > .MuiInput-root-8 > .MuiInput-input-16').as('emailInput')
    cy.get(':nth-child(2) > .MuiInput-root-8 > .MuiInput-input-16').as('passwordInput')
    cy.get('.MuiButtonBase-root-36').as('loginButton')

    cy.fixture('authentication.json').then(authJson => {
      cy.get('@emailInput').type(authJson.email)
      cy.get('@passwordInput').type(authJson.goodPassword)
      cy.get('@loginButton').click()
    })
  })

  it('should register a new user', () => {
    cy.get(':nth-child(2) > a').as('registerLink')
    cy.get('@registerLink').click()

    cy.get(':nth-child(2) > .MuiInput-root-8 > .MuiInput-input-16').as('emailInput')
    cy.get(':nth-child(4) > .MuiInput-root-8 > .MuiInput-input-16').as('passwordInput')
    cy.get('.MuiButtonBase-root-36').as('registerButton')

    cy.fixture('authentication.json').then(authJson => {
      cy.get('@emailInput').type(authJson.email)
      cy.get('@passwordInput').type(authJson.goodPassword)
      cy.get('@registerButton').click()
    })
  })
})
