describe('Sanity checks', () => {
  it('the dashboard should load correctly', () => {
    cy.visit('/')
    cy.contains('Dashboard').should('exist')
  })
})
