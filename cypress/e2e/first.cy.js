describe('첫 번째 테스트', () => {
  it('프로젝트 페이지로 이동', () => {
    // cy.visit('http://localhost:8080')
    cy.visit('/')
    cy.get('header .logo')
  })
})