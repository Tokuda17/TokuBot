import random
from deck import Deck
# from deck import shuffle, deal
from hand_evaluator import evaluate_board_and_hand

def create_deck():
    deck = Deck()
    deck.shuffle()
    return deck

#param: num_players is number of players in the game
#return: [board, [hands]] hands -> array of each players hand
def setup_poker_environment(num_players=1):
    deck = create_deck()
    return deck.deal(num_players)

def main():
    board, hands = setup_poker_environment(20)
    print("Board:", board)
    print("Hand:", hands )
    max_hands = [[0, None]]
    for i, hand in enumerate(hands):
        best_hand = evaluate_board_and_hand(hand, board)
        print(best_hand)
        if best_hand[0] > max_hands[0][0]:
            max_hands = [best_hand]
        elif best_hand[0] == max_hands[0][0]:
            max_hands.append(best_hand)
    print("Winner", max_hands)


        

if __name__ == "__main__":
    main()
