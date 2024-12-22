describe('Login Page', () => {

  beforeEach(() => {
    // Visit the login page before each test case
    cy.visit('http://localhost:3000/auth/login');
  });

  it('should allow the user to log in successfully with valid credentials', () => {
    // Mock the login API response for successful login
    cy.intercept('POST', '/auth/login', {
      statusCode: 200,
      body: {
        token: 'mocked-token',  // Simulated token
        twoFactorRequired: false  // Simulate no 2FA required
      }
    }).as('loginRequest');

    // Ensure that the email and password fields are visible and fill them in
    cy.get('input[name="email"]').should('be.visible').type('test@example.com');
    cy.get('input[name="password"]').should('be.visible').type('password123');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Wait for the login API request to complete
    cy.wait('@loginRequest');

    // Assert the user is redirected after a successful login
    cy.url().should('include', 'http://localhost:3000/mfa/enable-2fa');  // Adjust the URL based on your app's behavior
  });

  it('should show an error message when login fails with invalid credentials', () => {
    // Mock the login API to return an error for failed login
    cy.intercept('POST', '/auth/login', {
      statusCode: 400,
      body: {
        message: 'Invalid email or password.'  // Simulated error message
      }
    }).as('loginRequest');

    // Fill in invalid email and password
    cy.get('input[name="email"]').should('be.visible').type('invalid@example.com');
    cy.get('input[name="password"]').should('be.visible').type('wrongpassword');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Wait for the login API request to complete
    cy.wait('@loginRequest');

    // Assert that the error message is displayed
    cy.get('.text-red-500').should('contain', 'Invalid email or password');  // Adjust based on the actual error display
  });
});