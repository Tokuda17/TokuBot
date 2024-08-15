from card import Card
BOARD_LENGTH = 5
HAND_LENGTH = 2
import random

class Deck:
    def __init__(self):
        self.cards = [Card(value, suit) for value in range(2, 15) for suit in ['h', 'd', 'c', 's']]
        # Values 11, 12, 13, 14 represent Jack, Queen, King, Ace respectively

    def shuffle(self):
        random.shuffle(self.cards)

    def deal(self):
        board = [self.cards.pop() for _ in range(BOARD_LENGTH)]
        hand = [self.cards.pop() for _ in range(HAND_LENGTH)]
        return board, hand
    def __repr__(self):
        return f"Deck of {len(self.cards)} cards"

deck = Deck()
deck.shuffle()
board, hand = deck.deal()
print(board)  # Output: A list of 5 random cards
print(hand)
