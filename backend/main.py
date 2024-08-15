import random
from hand_evaluator import evaluate_board_and_hand

SUITS = ['hearts', 'diamonds', 'clubs', 'spades']
RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

def create_deck():
    """Create a deck of cards."""
    return [f"{rank} of {suit}" for suit in SUITS for rank in RANKS]

def shuffle_deck(deck):
    """Shuffle the deck."""
    random.shuffle(deck)
    return deck

def deal_hand(deck, num_cards):
    """Draw a specified number of cards from the deck."""
    return [deck.pop() for _ in range(num_cards)]

def deal_board(deck):
    """Deal the 5 community cards (board)."""
    return [deck.pop() for _ in range(5)]

def setup_poker_environment(num_players):
    """Set up the poker environment with hands and board."""
    deck = create_deck()
    deck = shuffle_deck(deck)
    
    players_hands = [deal_hand(deck, 2) for _ in range(num_players)]
    board = deal_board(deck)
    
    return players_hands, board

def main():
    num_players = 2  # Example for 2 players
    players_hands, board = setup_poker_environment(num_players)
    
    print("Board:", board)
    for i, hand in enumerate(players_hands):
        print(f"Player {i+1}'s hand:", hand)
        hand_rank = evaluate_board_and_hand(hand, board)
        print(f"Player {i+1}'s hand rank:", hand_rank)

if __name__ == "__main__":
    main()
