const taskToCreate = {
  title: "test",
  date: new Date().toISOString().split("T")[0],
}

describe('Tasks test', () => {
  it('Try a valid form', () => {
    cy.visit('http://localhost:5173')

    cy.get('input[data-cy=title-task-input]').type(taskToCreate.title)
    cy.get('input[data-cy=date-task-input]').type(taskToCreate.date)
    cy.get('button[data-cy=submit-task-button]').click()
    cy.contains('Tâche ajouté avec succès')
    cy.get('.rbc-event-content[title="' + taskToCreate.title + '"]').should("exist")

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
      expect(ls[Cypress.config().baseUrl] ['tasks_db']).to.be.equal("[]");
    })
  })

  it('Try a form without title', () => {
    cy.visit('http://localhost:5173')

    cy.get('input[data-cy=date-task-input]').type(taskToCreate.date)
    cy.get('button[data-cy=submit-task-button]').click()
    cy.contains('Veuillez remplir tous les champs !')

    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config().baseUrl] ['tasks_db']).to.be.equal("[]");
    })
  })

  it('Try a pre-completed calendar', () => {
    cy.visit('http://localhost:5173')
    localStorage.setItem('tasks_db', JSON.stringify([taskToCreate]));

    cy.get('.rbc-event-content[title="' + taskToCreate.title + '"]').should("exist")
  })
})