# TokuBot

A google chrome extension that displays the optimal move in any game of poker

# Development Plan

1. Use less strict method to extract data
2. Utilized call back functions to improve data collection
   2.1. Extract data at the start of the hand
   2.2. Update betting information on the hero's turn
   2.3. Update game state once flop
   2.3.1 Type of pot (single raise, threebet, fourbet)
   2.3.2 Position of hero and villian (abstract to early, middle, late and IP vs OOP)
   2.4. Then, keep track of bet sizes (Exact for now -> need abstraction for ML model later)
3. Improve Class structure
   3.1. Create player class (position relative to BB (int), stack size (float), in-hand (boolean), bet-size (float))
4. Extract Blinds from screen

# Strategy

1. Get active players seat position

2. Determine which seat is the big blind

3.
