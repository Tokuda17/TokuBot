from collections import Counter
from itertools import combinations

pair_score           = 1000
two_pair_score       = 10000
trips_score          = 100000
straight_score       = 1000000
flush_score          = 10000000
full_house_score     = 100000000
quads_score          = 1000000000
straight_flush_score = 10000000000

#param: 5 item array that represents a possible hand
#return: int -> value of hand
def evaluate_hand(hand):
    score = 0
    hand = sort_cards(hand)
    pair = is_pair(hand)
    two_pair = is_two_pair(hand)
    trips = is_trips(hand)
    straight = is_straight(hand)
    flush = is_flush(hand)
    full_house = is_full_house(hand)
    quads = is_quads(hand)
    straight_flush = is_straight_flush(hand)
    if straight_flush[0]:
        score += straight_flush_score
        score += straight_flush[1]
    elif quads[0]:
        score += quads_score
        score += quads[1]*100000
        for card in hand:
            if card.value != quads[1]:
                score += 2 ** card.value
    elif full_house[0]:
        score += full_house_score
        score += full_house[1] * 100 + full_house[2]
    elif flush:
        score += flush_score
        for card in hand:
            score += 2 ** card.value
    elif straight[0]:
        score += straight_score
        score += straight[1]
    elif trips[0]:
        score += trips_score
        score += trips[1] * 1000
        for card in hand:
            if card.value != trips[1]:
                score += 2 ** card.value / 100
    elif two_pair[0]:
        score += two_pair_score
        score += two_pair[1][1] * 1000 + two_pair[1][0] * 20
        for card in hand:
            if card.value != two_pair[1][0] or card.value != two_pair[1][1]:
                score += card.value
    elif pair[0]:
        score += pair_score
        score += pair[1] * 100
        for card in hand:
            if card.value != pair[1]:
                score += 2 ** card.value / 1000
    else:
        for card in hand:
            score += 2 ** card.value/100
    return round(score, 2)
    

def is_pair(hand):
    vals = set()
    for card in hand:
        if card.value in vals:
            return [True, card.value]
        else:
            vals.add(card.value)
    return [False, None]

def is_two_pair(hand):
    value_counts = {}
    for card in hand:
        value_counts[card.value] = 1 + value_counts.get(card.value, 0)
    pairs = []    
    for value, count in value_counts.items():
        if count == 2:
            pairs.append(value)
    if len(pairs) == 2:
        return [True, pairs]
    else:
        return [False, None]

def is_trips(hand):
    value_counts = {}
    for card in hand:
        value_counts[card.value] = 1 + value_counts.get(card.value, 0)
    for value, count in value_counts.items():
        if count == 3: 
            return [True, value]
    return [False, None]

def is_straight(hand):
    hand = sort_cards(hand)
    for i in range(1, len(hand)):
        if i == 4 and hand[i].value == 14 and hand[0].value == 2:
            return [True, hand[-2].value]
        if hand[i].value != hand[i-1].value + 1:
            return [False, None]
    return [True, hand[-1].value]

def is_flush(hand):
    suit = hand[0].suit
    for card in hand:
        if card.suit != suit:
            return False
    return True

def is_full_house(hand):
    value_counts = {}
    for card in hand:
        value_counts[card.value] = 1 + value_counts.get(card.value, 0)
    pair, trips = None, None
    for value, count in value_counts.items():
        if count == 3: 
            trips = value
        if count == 2:
            pair = value
    if pair and trips:
        return [True, trips, pair]
    return [False, None]

def is_quads(hand):
    value_counts = {}
    for card in hand:
        value_counts[card.value] = 1 + value_counts.get(card.value, 0)
    for value, count in value_counts.items():
        if count == 4: 
            return [True, value]
    return [False, None]

def is_straight_flush(hand):
    straight = is_straight(hand)
    flush = is_flush(hand)
    
    if straight[0] and flush:
        return [True, straight[1]]
    else:
        return [False, None]
    # return [False, None]

def generate_combinations(array, combination_length):
    return list(combinations(array, combination_length))

def sort_cards(cards):
    return sorted(cards, key=lambda card: card.value)

#param: player_hand, board
#return: int -> max value of every combinatino of cards
def evaluate_board_and_hand(player_hand, board):
    all_cards = player_hand + board
    all_combinations = generate_combinations(all_cards, 5)
    max_score = 0
    for hand in all_combinations:
        score = evaluate_hand(hand)
        if score > max_score:
            max_score = score
            max_hand = hand
    return [max_score, sort_cards(max_hand)]
