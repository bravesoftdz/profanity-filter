const 
    PROFANITY_SEMI = '1',
    PROFANITY_FULL = '2',
    PROFANITY_MAX = '3'

class ProfanityFilter {
    constructor (words, level = PROFANITY_SEMI, char = '*') {
        this.words = words;
        this.level = level;
        this.char = char;
        this.punctuation = '[\'!"#$%&\\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~\']';
    }

    filter (sentence) {
        let filtered = sentence;
        this.level === PROFANITY_MAX ? filtered = sentence.replace(/ /g, '') : filtered = ' ' + sentence + ' ';

        if (sentence.length < 3) {
            return sentence;
        }

        if (this.level === PROFANITY_MAX) {
            for (let i = 0; i < this.words.length; i++) {
                const regex = new RegExp(this.words[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, ''), 'gi')
                filtered = filtered.replace(regex, word=>this.char.repeat(word.length));
            }

            //Rebuild the spaces into string
            const spaceRegex = / /g; 
            let space;
            while ((space = spaceRegex.exec(sentence)) !== null) {
                let arr = [filtered.slice(0, space.index), filtered.slice(space.index)];
                filtered = arr.join(' ');
            }

            return filtered;
        } else if (this.level === PROFANITY_FULL) {
            for (let i = 0; i < this.words.length; i++) {
                const regex = new RegExp(` ${this.words[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${this.punctuation}* `, 'gi');
                filtered = filtered.replace(regex, word=> word.replace(
                        new RegExp(this.words[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), 
                        prof => this.char.repeat(prof.length)
                    )
                );
            }

            return filtered.trim();

        } else if (this.level === PROFANITY_SEMI) {
            for (let i = 0; i < this.words.length; i++) {
                const regex = new RegExp(` ${this.words[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${this.punctuation}* `, 'gi');
                filtered = filtered.replace(regex, word=> word.replace(
                        new RegExp(this.words[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), 
                        prof => prof[0] + this.char.repeat(prof.length - 2) + prof[prof.length - 1]
                    )
                );
            }

            return filtered.trim();
        } else {
            return sentence;
        }
    }
}