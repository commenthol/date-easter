# dates-easter

> Calculates Easter for a given year

## Synopsis

````js
var easter = require('dates-easter')
easter.easter(2015)     // new Date('2016-03-27')
easter.gregorianEaster(new Date('2015-01-01'))
                        // new Date('2016-03-27')
````

## Description

### easter

Shortcut for `gregorianEaster`.

### gregorianEaster

Returns the date of Gregorian Easter for a given year.

## References

- Date::Easter Perl Package <https://metacpan.org/pod/Date::Easter> Rich Bowen <rbowen@rcbowen.com>
- <http://www.chariot.net.au/~gmarts/eastcalc.htm>
- <https://de.wikipedia.org/wiki/Gau%C3%9Fsche_Osterformel>

## License

Copyright (c) 2015 commenthol

Software is released under [MIT][license].

[license]: ./LICENSE