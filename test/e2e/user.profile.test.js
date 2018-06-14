import { download, chromeless } from '../utils';
const WEBSITE_URL = "https://staging.opencollective.com";
// const WEBSITE_URL = "http://localhost:3030";

describe("user.profile", () => {
  let browser;

  beforeAll(() => browser = chromeless.init());
  afterAll(() => chromeless.close(browser));

  test("loads a profile of a user", async () => {
    jest.setTimeout(15000);
    const screenshot = await browser
      .goto(`${WEBSITE_URL}/addyosmani`)
      .wait('#BACKER')
      .scrollToElement('#BACKER')
      .screenshot();

    download("user.profile", screenshot);
    
    const numberOfPastEvents = await browser.evaluate(() => document.querySelectorAll('#BACKER .CollectiveCard').length);
    expect(numberOfPastEvents).toBeGreaterThan(2);
  });

});
