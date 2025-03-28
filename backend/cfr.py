from collections import defaultdict
from poker import Poker
import pickle
import os
import random

ACTIONS = ['fold', 'call', 'bet']


strategy_sum = defaultdict(lambda: [0] * len(ACTIONS))
regret_sum = defaultdict(lambda: [0] * len(ACTIONS))

# Function to save the dictionaries
def save_cfr_data(strategy_sum, regret_sum, filename='cfr_data.pkl'):
    with open(filename, 'wb') as f:
        pickle.dump({
            'strategy_sum': convert_to_dict(strategy_sum),
            'regret_sum': convert_to_dict(regret_sum)
        }, f)

def convert_to_dict(dd):
    return {key: value for key, value in dd.items()}

def convert_to_defaultdict(d, default_factory):
    return defaultdict(default_factory, d)

# Function to load the dictionaries
def load_cfr_data(filename='cfr_data.pkl'):
    if not os.path.exists(filename):
        raise FileNotFoundError(f"File {filename} does not exist")
    
    with open(filename, 'rb') as f:
        try:
            data = pickle.load(f)
            return (
                convert_to_defaultdict(data['strategy_sum'], lambda: [0] * len(ACTIONS)),
                convert_to_defaultdict(data['regret_sum'], lambda: [0] * len(ACTIONS))
            )
        except EOFError:
            raise ValueError(f"File {filename} is empty or corrupted")

# Delete the saved file
def delete_saved_file(filename='cfr_data.pkl'):
    if os.path.exists(filename):
        os.remove(filename)
        print(f"Deleted {filename}")
    else:
        print(f"{filename} does not exist")
# Example usage to load data

try:
    strategy_sum, regret_sum = load_cfr_data()
except (FileNotFoundError, ValueError):
    strategy_sum = defaultdict(lambda: [0] * len(ACTIONS))
    regret_sum = defaultdict(lambda: [0] * len(ACTIONS))

# Example usage to save data


def get_strategy(info_set, regret_sum, strategy_sum, ACTIONS):
    strategy = [max(r, 0) for r in regret_sum[info_set]]
    normalizing_sum = sum(strategy)
    if normalizing_sum > 0:
        strategy = [s / normalizing_sum for s in strategy]
    else:
        strategy = [1 / len(ACTIONS)] * len(ACTIONS)
    strategy_sum[info_set] = [strategy_sum[info_set][a] + strategy[a] for a in range (len(ACTIONS))]
    return strategy

def get_action(strategy, ACTIONS=ACTIONS):
    r = random.random()
    cumulative_probability = 0
    for a in range(len(ACTIONS)):
        cumulative_probability += strategy[a]
        if r < cumulative_probability:
            return a
    return len(ACTIONS) - 1

def utility(card, opp_card):
    if card > opp_card:
        return 1
    elif card < opp_card:
        return -1
    else:
        return 0

def cfr(card, opp_card, history, p0, p1, player_stack, opp_stack, pot, previous_bet, last_action="bet"):
    # print(history)
    # print(f"OPP_STACK: {opp_stack}")
    # print(f"PLAYER_STACK: {player_stack}")
    info_set = f"{card}{history}"
    strategy = get_strategy(info_set, regret_sum, strategy_sum, ACTIONS)
    action_utils = [0] * len(ACTIONS)
    node_util = 0

    for a in range(len(ACTIONS)):
        next_history = history + ACTIONS[a]
        if ACTIONS[a] == 'fold':
            action_utils[a] = -pot
        elif ACTIONS[a] == 'call':
            call_amount = min(opp_stack, previous_bet)
            new_pot = pot + call_amount 
            new_player_stack = player_stack - call_amount
            if last_action == "blinds":
                action_utils[a] = -cfr(opp_card, card, next_history, p1, p0 * strategy[a], opp_stack, new_player_stack, new_pot, 0)
            else:
                action_utils[a] = utility(card, opp_card) * new_pot
        elif ACTIONS[a] == 'bet':
            bet_amount = min(player_stack, 3 * max(previous_bet, 1))
            new_player_stack = player_stack - bet_amount
            new_pot = pot + bet_amount
            if opp_stack == 0: 
                action_utils[a] = utility(card, opp_card) * new_pot
            else:
                action_utils[a] = -cfr(opp_card, card, next_history, p1, p0 * strategy[a], opp_stack, new_player_stack, new_pot, bet_amount)
        else:
            action_utils[a] = 0

        node_util += strategy[a] * action_utils[a]
       # print(node_util)
    
    for a in range(len(ACTIONS)):
        regret_sum[info_set][a] += p1 * (action_utils[a] - node_util)
    
    return node_util

def train(iteratinos):
    cards = list(range(1, 11)) * 2

    for i in range(iteratinos):
        if i % 10000 == 0:
            print(i)
        random.shuffle(cards)
        card = cards[0]
        opp_card = cards[1]
        player_stack = 99
        opp_stack = 99
        pot = 2
        previous_bet = 1 # Initial bet size
        cfr(card, opp_card, "", 1, 1, player_stack, opp_stack, pot, previous_bet, "blinds")

train(10)
save_cfr_data(strategy_sum, regret_sum)

def get_average_strategy(info_set, ACTIONS=ACTIONS):
    strategy = strategy_sum[info_set]
    normalizing_sum = sum(strategy)
    if normalizing_sum > 0:
        return [s / normalizing_sum for s in strategy]
    else:
        return [1 / len(ACTIONS)] * len(ACTIONS)
    
# def play_game(player1_card, player2_card):
#     history = ""
#     player1_stack = 99
#     player2_stack = 98
#     pot = 3
#     previous_bet = 1  # Initial bet size

#     while True:
#         info_set1 = f"{player1_card}{history}"
#         strategy1 = get_average_strategy(info_set1)
#         action1 = ACTIONS[get_action(strategy1)]
#         history += action1
#         if action1 == 'fold':
#             pot += min(player1_stack, previous_bet)
#             return f"Player 2 wins the pot of {pot}"
#         elif action1 == 'call':
#             call_amount = previous_bet
#             player1_stack -= call_amount
#             pot += call_amount
#             return determine_winner(player1_card, player2_card, pot)
#         elif action1 in ['small_bet', 'medium_bet', 'large_bet', "all_in"]:
#             if action1 == 'small_bet':
#                 bet_amount = min(player1_stack, 2 * max(previous_bet, 1))
#             elif action1 == 'medium_bet':
#                 bet_amount = min(player1_stack, 3 * max(previous_bet, 1))
#             elif action1 == 'large_bet':
#                 bet_amount = min(player1_stack, 5 * max(previous_bet, 1))
#             else:
#                 bet_amount = min(player1_stack, player2_stack)
#             player1_stack -= bet_amount
#             pot += bet_amount
#             previous_bet = bet_amount
        
#         info_set2 = f"{player2_card}{history}"
#         strategy2 = get_average_strategy(info_set2)
#         action2 = ACTIONS[get_action(strategy2)]
#         history += action2
#         if action2 == 'fold':
#             return f"Player 1 wins the pot of {pot}"
#         elif action2 == 'call':
#             call_amount = previous_bet
#             player2_stack -= call_amount
#             pot += call_amount
#             return determine_winner(player1_card, player2_card, pot)

#         if action2 in ['small_bet', 'medium_bet', 'large_bet', "all_in"]:
#             if action2 == 'small_bet':
#                 bet_amount = min(player2_stack, 2 * max(previous_bet, 1))
#             elif action2 == 'medium_bet':
#                 bet_amount = min(player2_stack, 3 * max(previous_bet, 1))
#             elif action2 == 'large_bet':
#                 bet_amount = min(player2_stack, 5 * max(previous_bet, 1))
#             else:
#                 bet_amount = min(player1_stack, player2_stack)
#             player2_stack -= bet_amount
#             pot += bet_amount
#             previous_bet = bet_amount

#         if player1_stack == 0 or player2_stack == 0:
#             return determine_winner(player1_card, player2_card, pot)

# def determine_winner(player1_card, player2_card, pot):
#     if player1_card > player2_card:
#         return f"Player 1 wins the pot of {pot}"
#     elif player1_card < player2_card:
#         return f"Player 2 wins the pot of {pot}"
#     else:
#         return f"It's a draw, pot is {pot}"
    
# player1_card = random.choice(range(1, 11))
# player2_card = random.choice(range(1, 11))
# print(f"Player 1 card: {player1_card}, Player 2 card: {player2_card}")
# print(play_game(player1_card, player2_card))


# print(f"10: {[round(num, 2) for num in get_average_strategy("10")]}")
# print(f"9: {[round(num, 2) for num in get_average_strategy("9")]}")
# print(f"8: {[round(num, 2) for num in get_average_strategy("8")]}")
# print(f"7: {[round(num, 2) for num in get_average_strategy("7")]}")
# print(f"6: {[round(num, 2) for num in get_average_strategy("6")]}")
# print(f"5: {[round(num, 2) for num in get_average_strategy("5")]}")
# print(f"4: {[round(num, 2) for num in get_average_strategy("4")]}")
# print(f"3: {[round(num, 2) for num in get_average_strategy("3")]}")
# print(f"2: {[round(num, 2) for num in get_average_strategy("2")]}")
# print(f"1: {[round(num, 2) for num in get_average_strategy("1")]}")

# print(f"10bet: {[round(num, 2) for num in get_average_strategy("10bet")]}")
# print(f"9bet: {[round(num, 2) for num in get_average_strategy("9bet")]}")
# print(f"8bet: {[round(num, 2) for num in get_average_strategy("8bet")]}")
# print(f"7bet: {[round(num, 2) for num in get_average_strategy("7bet")]}")
# print(f"6bet: {[round(num, 2) for num in get_average_strategy("6bet")]}")
# print(f"5bet: {[round(num, 2) for num in get_average_strategy("5bet")]}")
# print(f"4bet: {[round(num, 2) for num in get_average_strategy("4bet")]}")
# print(f"3bet: {[round(num, 2) for num in get_average_strategy("3bet")]}")
# print(f"2bet: {[round(num, 2) for num in get_average_strategy("2bet")]}")
# print(f"1bet: {[round(num, 2) for num in get_average_strategy("1bet")]}")

# print(f"10call: {[round(num, 2) for num in get_average_strategy("10call")]}")
# print(f"9call: {[round(num, 2) for num in get_average_strategy("9call")]}")
# print(f"8call: {[round(num, 2) for num in get_average_strategy("8call")]}")
# print(f"7call: {[round(num, 2) for num in get_average_strategy("7call")]}")
# print(f"6call: {[round(num, 2) for num in get_average_strategy("6call")]}")
# print(f"5call: {[round(num, 2) for num in get_average_strategy("5call")]}")
# print(f"4call: {[round(num, 2) for num in get_average_strategy("4call")]}")
# print(f"3call: {[round(num, 2) for num in get_average_strategy("3call")]}")
# print(f"2call: {[round(num, 2) for num in get_average_strategy("2call")]}")
# print(f"1call: {[round(num, 2) for num in get_average_strategy("1call")]}")

# print(f"10callbet: {[round(num, 2) for num in get_average_strategy("10callbet")]}")
# print(f"9callbet: {[round(num, 2) for num in get_average_strategy("9callbet")]}")
# print(f"8callbet: {[round(num, 2) for num in get_average_strategy("8callbet")]}")
# print(f"7callbet: {[round(num, 2) for num in get_average_strategy("7callbet")]}")
# print(f"6callbet: {[round(num, 2) for num in get_average_strategy("6callbet")]}")
# print(f"5callbet: {[round(num, 2) for num in get_average_strategy("5callbet")]}")
# print(f"4callbet: {[round(num, 2) for num in get_average_strategy("4callbet")]}")
# print(f"3callbet: {[round(num, 2) for num in get_average_strategy("3callbet")]}")
# print(f"2callbet: {[round(num, 2) for num in get_average_strategy("2callbet")]}")
# print(f"1callbet: {[round(num, 2) for num in get_average_strategy("1callbet")]}")

poker_game = Poker()

def get_poker_hand():
    seen = {}
    for _ in range(1):
        hero_hand = poker_game.deal_hand()
        villian_hand = poker_game.deal_hand()

        poker_game.odds_of_winning(hero_hand, villian_hand)



get_poker_hand()











