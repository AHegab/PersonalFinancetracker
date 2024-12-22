describe('Registration Tests', () => {
  // Before each test, visit the registration page
  beforeEach(() => {
      cy.visit('http://localhost:3000/auth/register');
  });

  it('should allow a user to register successfully', () => {
      // Fill in the registration form
      cy.get('input[name="firstName"]').should('exist').should('be.visible').type('John');
      cy.get('input[name="lastName"]').should('exist').should('be.visible').type('Doe');
      cy.get('input[name="email"]').should('exist').should('be.visible').type(`john.doe${Date.now()}@example.com`);
      cy.get('input[name="password"]').should('exist').should('be.visible').type('SecurePassword123');

      // Submit the form
      cy.get('button[type="submit"]').should('exist').click();

      // Assert the user is redirected to the login page
      cy.url({ timeout: 10000 }).should('include', 'http://localhost:3000/auth/login');
  });

  it('should display validation errors for missing fields', () => {
    cy.visit('http://localhost:3000/auth/register');

    // Submit the form without filling in fields
    cy.get('button[type="submit"]').click();

    // Assert that validation errors are displayed
    cy.contains('First Name is required.').should('be.visible');
    cy.contains('Last Name is required.').should('be.visible');
    cy.contains('Email is required.').should('be.visible');
    cy.contains('Password is required.').should('be.visible');
  });

  it('should display an error if the user already exists', () => {
    cy.get('input[name="firstName"]').type('Existing');
    cy.get('input[name="lastName"]').type('User');
    cy.get('input[name="email"]').type('existinguser@example.com');
    cy.get('input[name="password"]').type('SecurePassword123');

    cy.get('button[type="submit"]').click();

    // Adjust the error message based on your backend response
    cy.contains('An unexpected error occurred. Please try again.').should('be.visible');
  });
});