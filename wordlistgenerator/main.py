import random
from collections import Counter
import string
from jsonfilelist import json_file_to_list, list_to_json_file

random.seed(0)
random.seed(random.randrange(10**5))

old_word_list_json_file = 'constants/nytwordlist.json'
new_word_list_file = 'constants/wordlist.json'

old_valid_guesses_json_file = 'constants/oldvalidGuesses.json'
new_valid_guesses_file = 'constants/validGuesses.json'

def caesar_shift(word, shift_amt):
    alphabet = string.ascii_lowercase
    shifted_alphabet = alphabet[shift_amt:] + alphabet[:shift_amt]
    table = str.maketrans(alphabet, shifted_alphabet)
    return word.translate(table)

def get_word_list(old_word_list):
    new_word_list = []
    ALPHA_SIZE = len(string.ascii_lowercase)
    for word in old_word_list:
        shift_amt = random.randrange(ALPHA_SIZE)
        shifted_word = caesar_shift(word, shift_amt)
        new_word_list.append({
                                'solution': shifted_word,
                                'solutionUnshifted': word,
                                'shiftAmount': shift_amt
                            })
    return new_word_list

old_word_list = json_file_to_list(old_word_list_json_file)
new_word_list = get_word_list(old_word_list)
random.shuffle(new_word_list)
list_to_json_file(new_word_list, new_word_list_file)

old_valid_guesses = json_file_to_list(old_valid_guesses_json_file)
new_valid_guesses = old_valid_guesses.copy()
list_to_json_file(old_valid_guesses, new_valid_guesses_file)
