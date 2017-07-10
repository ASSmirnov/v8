import { V8Page } from './app.po';

describe('v8 App', () => {
  let page: V8Page;

  beforeEach(() => {
    page = new V8Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
