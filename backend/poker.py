# poker.py
import random
from card import Card
from hand_evaluator import evaluate_board_and_hand

class Poker:
    def __init__(self):
        self.deck = self.create_deck()

    def create_deck(self):

        values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        suits = ['h', 'd', 'c', 's']
    
        deck = [Card(value, suit) for suit in suits for value in values]
        random.shuffle(deck) 
        return deck

    def deal_hand(self):
        if len(self.deck) < 2:
            return "Not enough cards in the deck"
        return [self.deck.pop(), self.deck.pop()]

    def reset_deck(self):
        self.deck = self.create_deck()

    def show_deck(self):
        return self.deck

    def odds_of_winning(self, hero_hand, villian_hand):
        hero = 0
        villian = 0


        for i in range(len(self.deck)):
            for j in range(len(self.deck)):
                for k in range(len(self.deck)):
                    for l in range(len(self.deck)):
                        for m in range(len(self.deck)):
                            board = [self.deck[i],self.deck[j],self.deck[k],self.deck[l],self.deck[m]]
                            hand = evaluate_board_and_hand(hero_hand, board)
        print("done")
                            
    
                            



