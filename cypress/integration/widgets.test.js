const WEBSITE_URL = process.env.WEBSITE_URL || "http://localhost:3000" || "https://staging.opencollective.com";

describe("widgets", () => {

  it ("shows the collectives hosted by the host", () => {
    cy.visit(`${WEBSITE_URL}/brusselstogether/collectives.html?role=host`)
    cy.get('.CollectiveCard').its('length').should('be.gt', 1)
  })

  it ("shows the collectives backed by a user", () => {
    cy.visit(`${WEBSITE_URL}/xdamman/widget.html`);
    cy.get('.CollectiveCard').should('have.length', 16);
  })

  it ("shows the latest events", () => {
    cy.visit(`${WEBSITE_URL}/veganizerbxl/events.html`);
    cy.get('.pastEvents li').should('have.length', 6);
  })

  /**
   * For some reason, this test fails on CircleCI:
   *
   * Timed out after waiting '60000ms' for your remote page to load. Your page did not fire its 'load' event within '60000ms'
   * CypressError: Timed out after waiting '60000ms' for your remote page to load.
   * Your page did not fire its 'load' event within '60000ms'.
   * You can try increasing the 'pageLoadTimeout' value in 'cypress.json' to wait longer.
   * Browsers will not fire the 'load' event until all stylesheets and scripts are done downloading.
   */
  it.skip ("populates the iframes", () => {
    cy.visit(`${WEBSITE_URL}/static/widgets.test.html`);
    cy.get('.widgetContainer.widget iframe');
    cy.get('.widgetContainer.banner iframe');
    cy.get('.widgetContainer.events iframe');
    cy.get('.widgetContainer.collectives iframe');
  })
})
