export class Player {
  constructor(stack, bet_size = 0, in_hand = true) {
    this.stack = stack;
    this.bet_size = bet_size;
    this.in_hand = in_hand;
    this.pos = -1;
  }
  get_pos() {
    return this.pos;
  }
  get_stack() {
    return this.stack;
  }
  get_bet_size() {
    return this.bet_size;
  }
  get_in_hand() {
    return this.in_hand;
  }
}
