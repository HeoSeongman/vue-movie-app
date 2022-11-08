describe('about 페이지로 이동', () => {
  it('About 네비게이션 클릭 후 이동', () => {
    cy.visit('/')
    cy.get('.nav-link')
      .contains('About')
      .click()
    cy.get('header .nav-link')
        .contains('Movie')
        .click()
    cy.get('header .user')
      .click()
  })
})