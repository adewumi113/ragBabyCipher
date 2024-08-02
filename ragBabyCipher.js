//https://www.codewars.com/kata/5a2166f355519e161a000019

/* 
The ragbaby cipher is a substitution cipher that encodes/decodes a text using a keyed alphabet and their position in the plaintext word they are a part of.

To encrypt the text This is an example. with the key cipher, first construct a keyed alphabet:

c    i    p    h    e    r    a    b    d    f    g    j    k    l    m    n    o    q    s    t    u    v    w    x    y    z
Then, number the letters in the text as follows:

T    h    i    s         i    s         a    n         e    x    a    m    p    l    e    .
1    2    3    4         1    2         1    2         1    2    3    4    5    6    7     
To obtain the encoded text, replace each character of the word with the letter in the keyed alphabet the corresponding number of places to the right of it (wrapping if necessary). Non-alphabetic characters are preserved to mark word boundaries.

Our ciphertext is then Urew pu bq rzfsbtj.

Task
Write functions encode and decode which accept 2 parameters:

text - string - a text to encode/decode
key - string - a key
Notes
handle lower and upper case in text string
key consists of only lowercase characters
 */

// Step 1: Construct a keyed alphabet from the key
function constructKeyedAlphabet(key) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let keyedAlphabet = [];

    // Add key characters first
    for (let char of key) {
        if (!keyedAlphabet.includes(char)) {
            keyedAlphabet.push(char);
        }
    }

    // Add remaining alphabet letters
    for (let char of alphabet) {
        if (!keyedAlphabet.includes(char)) {
            keyedAlphabet.push(char);
        }
    }

    return keyedAlphabet;
}

// Step 2: Shift a character by 'position' in the keyed alphabet
function shiftChar(char, position, keyedAlphabet, reverse = false) {
    let index = keyedAlphabet.indexOf(char);

    // Shift the character (forward or backward)
    if (reverse) {
        // For decoding, shift backward
        index = (index - position + 26) % 26;
    } else {
        // For encoding, shift forward
        index = (index + position) % 26;
    }

    return keyedAlphabet[index];
}

// Step 3: Encode and Decode functions (sharing common constants)
function processText(text, key, reverse = false) {
    const keyedAlphabet = constructKeyedAlphabet(key);
    let result = '';
    let position = 1;

    for (let char of text.toLowerCase()) {
        if (/[a-z]/.test(char)) {  // If it's a letter
            result += shiftChar(char, position, keyedAlphabet, reverse);
            position++;
        } else {
            result += char; // Keep spaces and punctuation
            position = 1;   // Reset position after each word
        }
    }

    return result;
}

// Encoding and decoding
function encode(text, key) {
    return processText(text, key, false); // Forward shift
}

function decode(text, key) {
    return processText(text, key, true);  // Reverse shift
}

// Example usage:
const text = "This is an example.";
const key = "cipher";

// Encode the text
const encodedText = encode(text, key);
return "Encoded:", encodedText;

// Decode the text
const decodedText = decode(encodedText, key);
return "Decoded:", decodedText;
