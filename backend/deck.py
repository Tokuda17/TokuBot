from card import Card
BOARD_LENGTH = 5
HAND_LENGTH = 2
import random

class Deck:
    def __init__(self):
        self.cards = [Card(value, suit) for value in range(2, 15) for suit in ['h', 'd', 'c', 's']]
        # Values 11, 12, 13, 14 represent Jack, Queen, King, Ace respectively

    #shuffle cards
    def shuffle(self):
        random.shuffle(self.cards)

    #deals cards 
    def deal(self, num_players=1):
        hands = []
        board = [self.cards.pop() for _ in range(BOARD_LENGTH)]
        for i in range(num_players):
            hand = [self.cards.pop() for _ in range(HAND_LENGTH)]
            hands.append(hand)
        return board, hands
    def __repr__(self):
        return f"Deck of {len(self.cards)} cards"

deck = Deck()
deck.shuffle()
board, hand = deck.deal()