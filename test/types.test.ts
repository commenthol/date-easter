import {
  EasterDate,
  easter,
  gregorianEaster,
  julianEaster,
  orthodoxEaster
} from 'date-easter'

const dates: EasterDate[] = [
  easter(2010),
  gregorianEaster(2010),
  julianEaster(new Date('2012-01-02')),
  orthodoxEaster(),
  easter('2010')
]
const date = new EasterDate(2010, 4, 4)

void [dates, date]
