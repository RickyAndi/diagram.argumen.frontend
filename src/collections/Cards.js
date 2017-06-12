 /* eslint-disable */
import Card from '../models/Card';
import { findIndex, propEq } from 'ramda';

export default {
  cards: [],
  getAll() {
    return this.cards;
  },
  getOne(id) {
    return this.cards.find((card) => card.id === id);
  },
  getIndex(id) {
    return findIndex(propEq('id', id))(this.cards);
  },
  edit(id, data) {
    const cardIndexToBeEdited = this.getIndex(id);
    const newCard = new Card(Object.assign(this.cards[cardIndexToBeEdited], data));
    this.cards[cardIndexToBeEdited] = newCard;
  },
  add(card) {
    if (!(card instanceof Card)) {
      throw new Error('only instance of card can be added');
    }
    this.cards.push(card);
  },
  empty() {
    this.cards.splice(0, this.cards.length);
  },
  canCardBeRemoved(id) {
    const someHaveRelationToThisId = this.cards.some((card) => card.relation === null ? false : card.relation.toId === id);
    return someHaveRelationToThisId ? false : true;
  },
  removeCard(id) {
    const indexToRemoved = this.getIndex(id);
    this.cards.splice(indexToRemoved, 1);
  },
  getRelatedId(id) {
    const cardThatRelatedToThisId = this.cards.find((card) => card.id === id);
    return cardThatRelatedToThisId.id;
  }
}
