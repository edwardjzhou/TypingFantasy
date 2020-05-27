export default class Trie {
    constructor() {
        this.trie = {}
    }

    addWord(string) {
        let current = this.trie
        for (const char of string) {
            if (!current.hasOwnProperty(char)) {
                current[char] = {}
            }
            current = current[char]
        }
        current[`finished`] = string
    }

    removeWord(string) {
    }

    possibilities(substring) {
        const possibilities = []
        let current = this.trie
        for (const char of substring) {
            if (!current.hasOwnProperty(char)) return []
            current = current[char]
        }        
        dfs(current)
        function dfs(current) {
            for (const key of Object.keys(current)) {
                if (key === `finished`) possibilities.push(current[key])
                else dfs(current[key])
            }
        }
        return possibilities
    }
}
