function findSubstrings(words, parts) {
	'use strict'
	let trie = new Trie();
	for (let part of parts) {
		trie.insert(part);
	}

	//console.log(JSON.stringify(trie));

	let result = []
	for (let word of words) {
		let lm = trie.longestMatch(word);
		let s = lm[0], f = lm[1];
		if (s > -1) {
			let modifiedWord = [];
			modifiedWord.push(word.slice(0, s));
			modifiedWord.push('[');
			modifiedWord.push(word.slice(s, f + 1));
			modifiedWord.push(']');
			modifiedWord.push(word.slice(f + 1, word.length));
			result.push(modifiedWord.join(''));
		} else {
			result.push(word);
		}
	}

	return result;
}

function Trie() {
	this.root = new Node();
}

function Node() {
	this.next = {}
	this.word = null;
}

Trie.prototype.insert = function(word) {
	'use strict'
	let current = this.root;

	for (let i = 0; i < word.length; i++) {
		let ch = word[i];
		if (!current.next[ch]) {
			current.next[ch] = new Node();
		}
		current = current.next[ch];
	}

	current.word = word;
}

Trie.prototype.find = function(word) {
	// check if this trie contains the word
	'use strict'
	let current = this.root;
	for (let ch of word) {
		if (current.next[ch]) {
			current = current.next[ch];
		} else {
			return false;
		}
	}

	return current.word !== null;
}

Trie.prototype.longestMatch = function(word) {
	// return the position of longest matched substring in word in this Trie
	// rtype : [start, finish]
	'use strict'
	let bStart = -1; // best start
	let bFinish = -2;
	for (let i = 0; i < word.length; i++) {
		for (let j = i; j < word.length; j++) {
			let subString = word.slice(i, j + 1);
			if (this.find(subString)) {
				if (j - i > bFinish - bStart) {
					bStart = i;
					bFinish = j;
				}
			}
		}
	}

	return [bStart, bFinish];
}

var words = ["Apple", "helloworld"];
var parts = ["Apple", "ple", "App", "el", "An"];
console.log(findSubstrings(words, parts));
