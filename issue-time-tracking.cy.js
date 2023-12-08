describe('Time tracking', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });

    const TimeSpent = () => cy.get(':nth-child(1) > .sc-kpOJdX > .sc-dxgOiQ')
    const TimeRemaining = () => cy.get('.sc-hGoxap > :nth-child(2) > .sc-kpOJdX > .sc-dxgOiQ')
    const DoneButton = () => cy.get('.sc-bHwgHz > .sc-bwzfXH > .sc-bxivhb')
    const NoTimeLogged = () => cy.get('.sc-rBLzX > :nth-child(1)')


    it('Add estimation', () => {
      cy.get('input[placeholder="Number"]').clear()
        cy.get('input[placeholder="Number"]').type('1');
        cy.get('input[value="1"]').should('be.visible');

    });

    it('Update estimation', () => {
      cy.get('input[placeholder="Number"]').clear().type('3');
      cy.get('input[value="3"]').should('be.visible');

    });

    it('Delete estimation', () => {
      cy.get('input[placeholder="Number"]').clear()
      cy.get('input[placeholder="Number"]').should('be.empty')

    });

    it('Add log time', () => {
      cy.get('[data-testid="icon:stopwatch"]').click();
        TimeSpent()
          .clear()
          .type('4')
          cy.get('input[value="4"]').should('be.visible') 
         
        TimeRemaining()
          .type('2')
          cy.get('input[value="2"]').should('be.visible')
          
        DoneButton()
          .click()

    });

    it('Edit log time', () => {
      cy.get('[data-testid="icon:stopwatch"]').click();
        TimeSpent()
          .clear()
          .type('6')
          cy.get('input[value="6"]').should('be.visible') 
        
        TimeRemaining()
          .clear()
          .type('2')
          cy.get('input[value="2"]').should('be.visible')
          
        DoneButton()
          .click()

    });

    it('Remove log time', () => {
      cy.get('[data-testid="icon:stopwatch"]').click();
        TimeSpent()  
          .clear() 
          .should('be.empty');

        TimeRemaining()
          .clear()  
          .should('be.empty');

        DoneButton()
          .click()

        NoTimeLogged()
          .should('be.visible')

    });


});