import { easter, julianEaster, orthodoxEaster } from 'date-easter';

easter(2010); // $ExpectType EasterDate

julianEaster(new Date('2012-01-02')); // $ExpectType EasterDate

orthodoxEaster(); // $ExpectType EasterDate
