# A Simple Compact Profanity Filtering Library
Filter profanity with this simple profanity filtering library which has all the Google list of bad words included as well as some Afrikaans words.

# Installation
Simply clone this repository with git or bower

# Setup 

## Including in HTML

Add this to the ```head``` of your HTML

```
<script src="./bower_components/profanity-filter/profanity-filter.min.js"></script>
```

Add this to the end of the ```body``` to create the ```ProfanityFilter``` object dynamically for faster load times

```
<script>
    let profanityfilter;
    fetch('./profanity-list.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            profanityfilter = new ProfanityFilter (data);
        });
</script>
```

You need to load the words that are labeled profane yourself. You can thus add your own aswell.

# Usage 

## Filtering profanity
Use the method ```filter(sentence)``` to filter profanity, it returns the filtered result.

## Level of censorship

The level of censorship is set with the property ```level```<br />
The profanity filter has 3 levels at which it can censor profanity.
- ```PROFANITY_SEMI``` which replaces only the inner letters of the profanity __words__
- ```PROFANITY_FULL``` which replaces all the profanity __words__
- ```PROFANITY_MAX``` which will search within words in the string for profanity

Below is an example of the profanity filtering levels

```
profanityfilter.level = PROFANITY_SEMI;
profanityfilter.filter('Fuckme this is fucking stupid');
// returns "Fuckme this is f*****g stupid"

profanityfilter.level = PROFANITY_FULL;
profanityfilter.filter('Fuckme this is fucking stupid');
// returns "Fuckme this is ******* stupid"

profanityfilter.level = PROFANITY_MAX;
profanityfilter.filter('Fuckme this is fucking stupid');
// returns "****me this is ****ing stupid"
```

The problem with using ```PROFANITY_MAX``` is that it can filter words in the wrong context for example:

```
profanityfilter.level = PROFANITY_MAX;
profanityfilter.filter('I ate a cucumber');
// returns "i ate a cu***ber"
```

It is thus recommended to only use ```PROFANITY_MAX``` for manually flagged users

## Custom characters
Set filter character with ```char``` default is ```*```