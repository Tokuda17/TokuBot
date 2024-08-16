import sys
import os
from itertools import combinations
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from hand_evaluator import evaluate_hand, is_straight
from card import Card

nums = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]


def generate_combinations(array, combination_length):
    return list(combinations(array, combination_length))

def test_pair():
    pair_combos = {}
    for i in nums:
        non_pair = [n for n in nums if n != i]
        all_combinations = generate_combinations(non_pair, 3)
        for combo in all_combinations:
            pair_combos[tuple([i] + [combo])] = evaluate_hand([Card(i, "c"), Card(i, "c"), Card(combo[0], "h"), Card(combo[1], "h"), Card(combo[2], "c")])
    prev = 10000
    for key, value in pair_combos.items():
        #print(f"{key}: {value}")
        if value > prev:
            return False
        prev = value
    return True

def test_two_pairs():
    all_combinations = generate_combinations(nums, 2)
    two_pair_combos = {}
    for combo in all_combinations:
        two_pair_combos[combo] = evaluate_hand([Card(combo[0], "c"), Card(combo[0], "c"), Card(combo[1], "h"), Card(combo[1], "h"), Card(0, "c")])
    prev = 100000
    for key, value in two_pair_combos.items():
        #print(f"{key}: {value}")
        if value+15 > prev:
            return False
        prev = value
    return True

def test_trips():
    trip_combos = {}
    
    for i in nums:
        non_trips = [n for n in nums if n != i]
        all_combinations = generate_combinations(non_trips, 2)
        for combo in all_combinations:
            trip_combos[tuple([i]+[combo])] = evaluate_hand([Card(i, "c"), Card(i, "c"), Card(i, "c"), Card(combo[0], "c"), Card(combo[1], "d")])
    prev = 100000000000
    for key, value in trip_combos.items():
        #print(f"{key}: {value}")
        if value >= prev:
            return False
        prev = value
    return True

def test_straight():
    straight_combos = {}
    straight_combos[5] = evaluate_hand([Card(3, "c"), Card(4, "c"), Card(2, "h"), Card(14, "h"), Card(5, "c")])
    for i in range(2, 11):
        straight_combos[i+4] = evaluate_hand([Card(i, "c"), Card(i+1, "c"), Card(i+2, "h"), Card(i+3, "h"), Card(i+4, "c")])
    prev = 0
    for key, value in straight_combos.items():
        #print(f"{key}: {value}")
        if value < prev:
            return False
        prev = value
    return True

def test_flush():
    flush_combos = {}
    all_combinations = generate_combinations(nums, 5)
    for combo in all_combinations:
        if not is_straight([Card(combo[0], "c"), Card(combo[1], "c"), Card(combo[2], "c"), Card(combo[3], "c"), Card(combo[4], "c")])[0]:  
            flush_combos[combo] = evaluate_hand([Card(combo[0], "c"), Card(combo[1], "c"), Card(combo[2], "c"), Card(combo[3], "c"), Card(combo[4], "c")])
    prev = 100000000

    for key, value in flush_combos.items():
        #print(f"{key}: {value}")
        if value > prev:
            return False
        prev = value
    return True

def test_full_house():
    all_combinations = generate_combinations(nums, 2)
    two_pair_combos = {}
    for combo in all_combinations:
        two_pair_combos[combo] = evaluate_hand([Card(combo[0], "c"), Card(combo[0], "c"), Card(combo[0], "h"), Card(combo[1], "h"), Card(combo[1], "c")])
    prev = 100000000000
    for key, value in two_pair_combos.items():
        #print(f"{key}: {value}")
        if value > prev:
            return False
        prev = value
    return True

def test_quads():
    pair_combos = {}
    for i in nums:
        pair_combos[i] = evaluate_hand([Card(i, "c"), Card(i, "c"), Card(i, "c"), Card(i, "c"), Card(0, "d")])
    prev = 100000000000
    for key, value in pair_combos.items():
        #print(f"{key}: {value}")
        if value > prev:
            return False
        prev = value
    return True

def test_straight_flush():
    straight_flush_combos = {}
    straight_flush_combos[5] = evaluate_hand([Card(3, "c"), Card(4, "c"), Card(2, "c"), Card(14, "c"), Card(5, "c")])
    for i in range(2, 11):
        straight_flush_combos[i+4] = evaluate_hand([Card(i, "c"), Card(i+1, "c"), Card(i+2, "c"), Card(i+3, "c"), Card(i+4, "c")])
    prev = 0
    for key, value in straight_flush_combos.items():
        #print(f"{key}: {value}")
        if value < prev:
            return False
        prev = value
    return True

def test_high_card():
    high_combos = {}
    all_combinations = generate_combinations(nums, 5)
    for combo in all_combinations:
        if not is_straight([Card(combo[0], "h"), Card(combo[1], "c"), Card(combo[2], "c"), Card(combo[3], "c"), Card(combo[4], "c")])[0]:  
            high_combos[combo] = evaluate_hand([Card(combo[0], "h"), Card(combo[1], "c"), Card(combo[2], "c"), Card(combo[3], "c"), Card(combo[4], "c")])
    prev = 100000000

    for key, value in high_combos.items():
        print(f"{key}: {value}")
        if value > prev:
            return False
        prev = value
    return True

def test():
    print("Pair:", test_pair())
    print("two_pair:", test_two_pairs())
    print("trips:", test_trips())
    print("straight:",test_straight())
    print("flush:",test_flush())
    print("full_house:",test_full_house())
    print("quads:",test_quads())
    print("straight_flush:",test_straight_flush())

test()