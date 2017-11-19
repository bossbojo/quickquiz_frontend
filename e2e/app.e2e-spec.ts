import { QuickquizfrontendPage } from './app.po';

describe('quickquizfrontend App', () => {
  let page: QuickquizfrontendPage;

  beforeEach(() => {
    page = new QuickquizfrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
