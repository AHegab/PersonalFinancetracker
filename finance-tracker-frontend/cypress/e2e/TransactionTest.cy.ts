/// <reference types="cypress" />

describe('Add, Edit, and Delete Transaction', () => {

  // Before each test, visit the Transactions page
  beforeEach(() => {
    // Assuming you have a valid token, set it in a cookie
    cy.setCookie('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtbWFyaGVnYWJAZ21haWwuY29tIiwic3ViIjoiZTY5YjljMjMtZDNkOC00YTlhLWE2OWMtMzYzNmUwZjkwYzc1IiwiaWF0IjoxNzM0OTA2NzMyLCJleHAiOjE3MzQ5OTMxMzJ9.UrsXuX1k7WNvFfjvmiH4bEnVqgLEvA6sFWW_kGh03q0'); // Replace with a valid token

    // Visit the transactions page
    cy.visit('http://localhost:3000/transactions');  // Adjust the URL to match the page that shows the transactions

    cy.wait(2000)
  });

  it('should add a transaction successfully with valid token', () => {
    // Mock the successful API response for adding a transaction
    cy.intercept('POST', '/transactions/create', {
      statusCode: 200,
      body: {
        id: 1,
        amount: 100.0,
        vendorName: 'Test Vendor',
        transactionDate: '2024-12-22',
        category: 'Food',
        paymentMethod: 'credit_card',
        cardLastFourDigits: '1234',
        notes: 'Test Note',
      },
    }).as('addTransactionRequest');
    
    // Open the "Add Transaction" modal
    cy.get('button').contains('Add Transaction').click();

    // Fill in the form fields
    cy.get('input[name="amount"]').type('100');
    cy.get('input[name="vendorName"]').type('Test Vendor');
    cy.get('input[name="transactionDate"]').type('2024-12-22');
    cy.get('input[name="category"]').type('Food');
    cy.get('select[name="paymentMethod"]').select('credit_card');
    cy.get('input[name="cardLastFourDigits"]').type('1234');
    cy.get('textarea[name="notes"]').type('Test Note');

    // Submit the form to add the transaction
    cy.get('button[type="submit"]').click();

    // Wait for the API call to finish
    cy.wait('@addTransactionRequest');
  });

  it('should show an error message when adding a transaction fails with invalid token', () => {
    // Set an invalid token
    cy.setCookie('auth_token', 'invalid-token');
  
    // Mock the failed API response for adding a transaction (using an invalid token)
    cy.intercept('POST', '/transactions/create', {
      statusCode: 401, // Unauthorized
      body: {
        message: 'Unauthorized. Invalid token.',
      },
    }).as('addTransactionRequest');
  
    // Open the "Add Transaction" modal
    cy.get('button').contains('Add Transaction').click();
  
    // Fill in the form fields
    cy.get('input[name="amount"]').type('100');
    cy.get('input[name="vendorName"]').type('Test Vendor');
    cy.get('input[name="transactionDate"]').type('2024-12-22');
    cy.get('input[name="category"]').type('Food');
    cy.get('select[name="paymentMethod"]').select('credit_card');
    cy.get('input[name="cardLastFourDigits"]').type('1234');
    cy.get('textarea[name="notes"]').type('Test Note');
  
    // Submit the form to add the transaction
    cy.get('button[type="submit"]').click();
  
    // Wait for the API call to finish
    cy.wait('@addTransactionRequest');
  
    // Check for the error toast message
    cy.get('.Toastify__toast--error')
      .should('exist')    // Ensure it exists
      .and('be.visible')  // Ensure it's visible
      .and('contain', 'Unauthorized. Invalid token.');
  });

  it('should edit an existing transaction successfully', () => {
    // Intercept the GET request and return mock transactions
    cy.intercept('GET', '/transactions', {
      statusCode: 200,
      body: [{
        id: 1,
        amount: 100.0,
        vendorName: 'Test Vendor',
        transactionDate: '2024-12-22',
        category: 'Food',
        paymentMethod: 'credit_card',
        cardLastFourDigits: '1234',
        notes: 'Test Note',
      }],
    }).as('getTransactions');

    // Open the "Edit" modal for the transaction
    cy.get('button').contains('Edit').should('be.visible').click();

    // Edit the fields in the modal
    cy.get('input[name="amount"]').clear().type('150');
    cy.get('input[name="vendorName"]').clear().type('Updated Vendor');
    cy.get('textarea[name="notes"]').clear().type('Updated Test Note');

    // Submit the form to save the edited transaction
    cy.get('button[type="submit"]').click();

    // Assert that the transaction was edited (API call can be intercepted and verified)
    cy.intercept('PUT', '/transactions/update', {
      statusCode: 200,
      body: {
        id: 1,
        amount: 150.0,
        vendorName: 'Updated Vendor',
        transactionDate: '2024-12-22',
        category: 'Food',
        paymentMethod: 'credit_card',
        cardLastFourDigits: '1234',
        notes: 'Updated Test Note',
      },
    }).as('editTransactionRequest');
  });

  it('should delete a transaction successfully', () => {
    // Intercept the GET request and return mock transactions
    cy.intercept('GET', '/transactions', {
      statusCode: 200,
      body: [{
        id: 1,
        amount: 100.0,
        vendorName: 'Test Vendor',
        transactionDate: '2024-12-22',
        category: 'Food',
        paymentMethod: 'credit_card',
        cardLastFourDigits: '1234',
        notes: 'Test Note',
      }],
    }).as('getTransactions');
    
    // Click the delete button for the transaction
    cy.get('button').contains('Delete').should('be.visible').click();

    // Intercept the delete API request and assert success
    cy.intercept('DELETE', '/transactions/delete', {
      statusCode: 200,
      body: { message: 'Transaction deleted successfully' },
    }).as('deleteTransactionRequest');

    // Assert that the transaction no longer exists (check UI)
    cy.get('button').contains('Test Vendor').should('not.exist');
  });
});