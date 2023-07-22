
const expect = chai.expect
const assert = chai.assert

describe('Card', () => {
  it('should create a card with the given rank and suit', () => {
    const card = new Card('A', 'Hearts');
    expect(card.rank).to.equal('A');
    expect(card.suit).to.equal('Hearts');
  });

  it('should have a toString method that returns a string representation', () => {
    const card = new Card('K', 'Diamonds');
    expect(card.toString()).to.equal('K of Diamonds');
  });
});