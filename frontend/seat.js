import { Player } from "./player";

export class Seat {
  constructor(num, player, button) {
    this.num = num;
    this.player = player;
    this.button = button;
  }
  getPlayer() {
    return this.player;
  }
}
