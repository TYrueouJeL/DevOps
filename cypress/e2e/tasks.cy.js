const taskToCreate = {
  title: "test",
  date: "2018-02-01",
}

describe('Tasks test', () => {
  it('Try a valid form', () => {
    cy.visit('http://localhost:5173')

    cy.get('input[data-cy=title-task-input]').type(taskToCreate.title)
    cy.get('input[data-cy=date-task-input]').type(taskToCreate.date)
    cy.get('button[data-cy=submit-task-button]').click()
    cy.contains('Tâche ajouté avec succès')

    cy.getAllLocalStorage().then((ls) => {
      console.log(ls)
      const tasks = JSON.parse(ls[Cypress.config().baseUrl]['tasks_db'])
      expect(tasks[0]).to.deep.equal(taskToCreate)
    })
  })

  it('Try a form without date', () => {
    cy.visit('http://localhost:5173')

    cy.get('input[data-cy=title-task-input]').type(taskToCreate.title)
    cy.get('button[data-cy=submit-task-button]').click()
    cy.contains('Veuillez remplir tous les champs !')

    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config().baseUrl]).to.be.undefined;
    })
  })

  it('Try a form without title', () => {
    cy.visit('http://localhost:5173')

    cy.get('input[data-cy=date-task-input]').type(taskToCreate.date)
    cy.get('button[data-cy=submit-task-button]').click()
    cy.contains('Veuillez remplir tous les champs !')

    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config().baseUrl]).to.be.undefined;
    })
  })
})