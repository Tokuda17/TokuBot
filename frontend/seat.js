import { Player } from "./player.js";

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
