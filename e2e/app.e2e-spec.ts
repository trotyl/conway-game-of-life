import { ConwayGameOfLifePage } from './app.po';

describe('conway-game-of-life App', () => {
  let page: ConwayGameOfLifePage;

  beforeEach(() => {
    page = new ConwayGameOfLifePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
