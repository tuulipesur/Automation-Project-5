describe('Issue deletion', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
      cy.get('[data-testid="modal:issue-details"]').should('be.visible')
    });
  });

  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete an issue successfully', () => {
    //find issue
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    //click on delete button and confirm
    cy.get('[data-testid="icon:trash"]').click();
    
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    cy.get('[data-testid="modal:confirm"]').within(() => {
    cy.contains('Are you sure you want to delete this issue?').should('be.visible');
    cy.contains("Once you delete, it's gone for good").should('be.visible');
    cy.contains('Delete issue').click();
    
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    //after reloading, issue should not exist
    cy.reload();
    cy.contains(issueTitle).should('not.exist');
     });
  });

  it('Cancel before deleting an issue', () => {
    //find issue
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    //click on delete button and cancel deleting
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    cy.get('[data-testid="modal:confirm"]').within(() => {
    cy.contains('Are you sure you want to delete this issue?').should('be.visible');
    cy.contains("Once you delete, it's gone for good").should('be.visible');
    cy.contains('Cancel').click();
    //after reloading, issue should still exist
    cy.reload();
  
  
     });
  });
})