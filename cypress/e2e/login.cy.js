describe('Login Form E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should successfully login with valid credentials', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Test123!');
    cy.get('input[name="acceptTerms"]').check();
    
    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Success Page').should('be.visible');
  });

  it('should keep button disabled for invalid email', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('Test123!');
    cy.get('input[name="acceptTerms"]').check();
    
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should keep button disabled for weak password', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('weak');
    cy.get('input[name="acceptTerms"]').check();
    
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should keep button disabled when terms not accepted', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Test123!');
    // Don't check terms
    
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should keep button disabled for multiple invalid inputs', () => {
    cy.get('input[name="email"]').type('invalid');
    cy.get('input[name="password"]').type('weak');
    cy.get('input[name="acceptTerms"]').check();
    
    cy.get('button[type="submit"]').should('be.disabled');
  });
});