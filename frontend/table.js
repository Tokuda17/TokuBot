import { Seat } from "./seat.js";

/*
This class contains all the information regarding the table by storing a list of every single seat.

*/

class Table {
  constructor(bb) {
    this.seats = [];
    this.bb = bb;
  }
  getbb() {
    return this.bb;
  }
  addSeat(seat) {
    this.seats.push(seat);
  }

  getSeats() {
    return this.seats;
  }

  /*
  Functionality: Returns the seat number where the button is located
  Params: None
  Return: (int) seat number with the button
  */
  getButton() {}

  /*
  Functionality: Determines if hero is IP or OOP
  Params: None
  return: (boolean) if hero is IP or OOP
  */
  comparePosition() {}
}
