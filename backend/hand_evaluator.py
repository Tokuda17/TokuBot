from collections import Counter
from itertools import combinations

def evaluate_hand(hand):
    pair = 100
    two_pair = 1000
    trips = 10000
    straight = 100000
    flush = 1000000
    full_house = 10000000
    quads = 100000000
    straight_flush = 1000000000

    return 0  

def is_pair(hand):
    pass

def is_two_pair(hand):
    pass

def is_trips(hand):
    pass

def is_straight(hand):
    pass

def is_flush(hand):
    pass

def is_full_house(hand):
    pass

def is_quads(hand):
    pass

def is_straight_flush(hand):
    pass

def generate_combinations(array, combination_length):
    return list(combinations(array, combination_length))

def evaluate_board_and_hand(player_hand, board):
    all_cards = player_hand + board
    all_combinations = generate_combinations(all_cards, 5)
    max_score = 0
    for hand in all_combinations:
        print(hand)
        score = evaluate_hand(hand)
        max_score = max(max_score, score)
    return evaluate_hand(all_cards)


evaluate_board_and_hand([1, 2], [3, 4, 5, 6, 7])