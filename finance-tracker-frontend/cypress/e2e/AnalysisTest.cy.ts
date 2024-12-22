describe("Budget Analysis Page", () => {
  // Replace with an actual valid token for your test
  const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtbWFyaGVnYWJAZ21haWwuY29tIiwic3ViIjoiZTY5YjljMjMtZDNkOC00YTlhLWE2OWMtMzYzNmUwZjkwYzc1IiwiaWF0IjoxNzM0OTA4NDE1LCJleHAiOjE3MzQ5OTQ4MTV9.mc5QnyRFc6Nkk8-gFXP5HT3zHX7UvMkirKl3kTJ5BLY"; // Replace this with an actual valid token for your app

  beforeEach(() => {
    // Set a valid token in the cookie before visiting the page
    cy.setCookie("auth_token", validToken);
    // Visit the /analysis page
    cy.visit("http://localhost:3000/analysis");
  });

  it("should load the analysis page correctly", () => {
    // Check if the page loaded and the main heading is correct
    cy.get("h1").contains("Budget Analysis");
  });

  it("should display the analysis table after a successful API call", () => {
    // Ensure the table is visible after the API call
    cy.get('button').contains('Analyze Budget').click();
    cy.get("table").should("be.visible");
    cy.get("tbody tr").should("have.length", 2); // Expect 2 rows from mock data
  });

  it("should display the correct analysis data", () => {
    // Click on the Analyze Budget button to trigger the analysis
    cy.get('button').contains('Analyze Budget').click();
    
    // Verify the content of the first row for the "Food" category
    cy.get("table tbody tr").eq(0).within(() => {
      cy.get("td").eq(0).contains("Food");  // Category should be "Food"
      cy.get("td").eq(1).contains("$1,000.00");  // Total current amount for "Food"
      cy.get("td").eq(2).contains("$1,936.40");  // Predicted future value (mocked)
      cy.get("td").eq(3).contains("$1,000.00");  // Budget (mocked)
      cy.get("td").eq(4).contains("$3,130.04");  // Recommended budget (mocked)
      cy.get("td").eq(5).contains("$936.40");  // Difference between Budget and Current Amount
      cy.get("td").eq(6).contains("Spend Less");  // Recommendation
    });
  
    // Verify the content of the second row for the "Shopping" category
    cy.get("table tbody tr").eq(1).within(() => {
      cy.get("td").eq(0).contains("Shopping");  // Category should be "Shopping"
      cy.get("td").eq(1).contains("$2,750.00");  // Total current amount for "Shopping"
      cy.get("td").eq(2).contains("$2,121.69");  // Predicted future value (mocked)
      cy.get("td").eq(3).contains("$0.00");  // Budget (mocked)
      cy.get("td").eq(4).contains("$5,083.86");  // Recommended budget (mocked)
      cy.get("td").eq(5).contains("$2,121.69");  // Difference between Budget and Current Amount
      cy.get("td").eq(6).contains("Spend Less");  // Recommendation
    });
  });  
});