 /* eslint-disable */
class Card {
  constructor(data) {
    this.id = data.id;
    this.content = data.content;
    this.left = data.left;
    this.top = data.top;
    this.type = data.type;
    
    if (data.relation === undefined || data.relation === null) {
      this.relation = null;
      return;
    }
    
    this.relation = {
      type: data.relation.type,
      toId: data.relation.toId
    };
  }
}

export default Card;
