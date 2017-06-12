/* eslint-disable no-unused-expressions */
import CardCollections from '@/collections/Cards';
import CardModel from '@/models/Card';

describe('card collections', () => {
  describe('on first time, its dont have any card', () => {
    it('test 1', () => {
      const cards = CardCollections.getAll();
      expect(cards).to.be.empty;
    });
  });
  describe('can add card', () => {
    describe('add()', () => {
      describe('will throw error if added with non Card instance', () => {
        after(() => {
          CardCollections.empty();
        });

        it('test 1', () => {
          const fakeCard = {
            content: 'lorem dolor',
            right: '100px',
            left: '100px',
            type: 'contention',
            id: 1,
          };
          expect(() => {
            CardCollections.add(fakeCard);
          }).to.throw.error;
        });
      });
      describe('card can be added successfully, if card is instance of Card', () => {
        after(() => {
          CardCollections.empty();
        });

        it('test 1', () => {
          const cardData = {
            id: 1,
            content: 'lorem ipsum',
            right: '100px',
            left: '100px',
            type: 'contention',
            relatedToId: 2,
          };
          const realCard = new CardModel(cardData);

          expect(() => {
            CardCollections.add(realCard);
          }).to.not.throw.error;
        });
        it('test 2', () => {
          const cardData = {
            id: 1,
            content: 'lorem ipsum',
            right: '100px',
            left: '100px',
            type: 'contention',
            relatedToId: 2,
          };
          const realCard = new CardModel(cardData);
          CardCollections.add(realCard);

          expect(CardCollections.getAll()).to.not.be.empty;
        });
      });
    });
  });
  describe('can retrieve card', () => {
    describe('getAll()', () => {
      describe('can get all cards', () => {
        after(() => {
          CardCollections.empty();
        });
        it('test 1', () => {
          const cardsData = [
            {
              id: 1,
              content: 'lorem ipsum',
              right: '100px',
              left: '100px',
              type: 'contention',
              relatedToId: 2,
            },
            {
              id: 2,
              content: 'lorem ipsum',
              right: '100px',
              left: '100px',
              type: 'contention',
              relatedToId: 2,
            },
          ];
          const cardInstances = cardsData.map(cardData => new CardModel(cardData));
          cardInstances.forEach(cardInstance => CardCollections.add(cardInstance));
          expect(CardCollections.getAll().length).to.equal(cardsData.length);
        });
      });
    });
    describe('getOne()', () => {
      describe('can get single card', () => {
        after(() => {
          CardCollections.empty();
        });
        it('test 1', () => {
          const cardsData = [
            {
              id: 1,
              content: 'lorem ipsum',
              right: '100px',
              left: '100px',
              type: 'contention',
              relatedToId: 2,
            },
            {
              id: 2,
              content: 'lorem ipsum',
              right: '100px',
              left: '100px',
              type: 'contention',
              relatedToId: 2,
            },
          ];
          const cardInstances = cardsData.map(cardData => new CardModel(cardData));
          cardInstances.forEach(cardInstance => CardCollections.add(cardInstance));

          const cardToTest = CardCollections.getOne(cardsData[0].id);
          expect(cardToTest.content).to.equal(cardsData[0].content);
        });
      });
    });
    describe('getIndex()', () => {
      describe('can get card index from id', () => {
        after(() => {
          CardCollections.empty();
        });
        it('test 1', () => {
          const cardsData = [
            {
              id: 1,
              content: 'lorem ipsum',
              right: '100px',
              left: '100px',
              type: 'contention',
              relatedToId: 2,
            },
            {
              id: 2,
              content: 'lorem ipsum',
              right: '100px',
              left: '100px',
              type: 'contention',
              relatedToId: 2,
            },
          ];
          const cardInstances = cardsData.map(cardData => new CardModel(cardData));
          cardInstances.forEach(cardInstance => CardCollections.add(cardInstance));

          const cardIndex = CardCollections.getIndex(cardsData[0].id);
          expect(cardIndex).to.equal(0);
        });
      });
    });
  });
  describe('can edit card', () => {
    describe('edit()', () => {
      describe('can edit card provided by card id and data', () => {
        let cardData;
        let cardDataForEdit;

        after(() => {
          CardCollections.empty();
        });

        before(() => {
          cardData = {
            id: 1,
            content: 'lorem ipsum',
            right: '100px',
            left: '100px',
            type: 'contention',
            relatedToId: 2,
          };
          cardDataForEdit = {
            content: 'aku adalah anak gembala',
            right: '140px',
            left: '120px',
            type: 'premise',
          };
          const newCard = new CardModel(cardData);
          CardCollections.add(newCard);
        });

        it('test 1', () => {
          CardCollections.edit(cardData.id, cardDataForEdit);
          const cardToBeTested = CardCollections.getOne(cardData.id);

          expect(cardToBeTested.content).to.equal(cardDataForEdit.content);
          expect(cardToBeTested.type).to.equal(cardDataForEdit.type);
          expect(cardToBeTested.left).to.equal(cardDataForEdit.left);
          expect(cardToBeTested.right).to.equal(cardDataForEdit.right);
        });
      });
    });
  });
  describe('can empty cards', () => {
    describe('empty()', () => {
      describe('can empty cards', () => {
        before(() => {
          const cardsData = [
            {
              id: 1,
              content: 'lorem ipsum',
              right: '100px',
              left: '100px',
              type: 'contention',
              relatedToId: 2,
            },
            {
              id: 2,
              content: 'lorem ipsum',
              right: '100px',
              left: '100px',
              type: 'contention',
              relatedToId: 2,
            },
          ];
          const cardInstances = cardsData.map(cardData => new CardModel(cardData));
          cardInstances.forEach(cardInstance => CardCollections.add(cardInstance));
        });

        it('test 1', () => {
          expect(CardCollections.getAll()).to.not.be.empty;
          CardCollections.empty();
          expect(CardCollections.getAll()).to.be.empty;
        });
      });
    });
  });
});
