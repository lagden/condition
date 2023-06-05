# Condition

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![XO code style][xo-img]][xo]

[npm-img]:         https://img.shields.io/npm/v/@tadashi/condition.svg
[npm]:             https://www.npmjs.com/package/@tadashi/condition
[ci-img]:          https://github.com/lagden/condition/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/condition/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/condition/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/condition?branch=main
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo


Create conditional to validate data.


## Install

```
$ npm i @tadashi/condition
```


## Usage

See example below.

```js
import 'condition' from '@tadashi/condition'

const data = {
  age: 65,
  gender: 'F',
  city: 'São Paulo',
  country: 'Brazil',
  phone: '(11) 988889999',
  hasCar: true,
  colors: ['red', 'blue'],
}

const conditions = [
  {
    join_operator: 'and',
    args: [
      {
        field: 'gender',
        operator: 'eq',
        value: 'F',
      }, {
        field: 'age',
        operator: 'gt',
        value: 21,
      }, {
        field: 'phone',
        operator: 'regex',
        value: /\(\d{2}\)\s(\d{8,9})/i,
      }, {
        join_operator: 'or',
        args: [
          {
            field: 'city',
            operator: 'assigned',
            value: false,
          }, {
            field: 'country',
            operator: 'intersection',
            value: ['Japan', 'Brazil'],
          },
        ],
      }, {
        field: 'hasCar',
        operator: 'eq',
        value: true,
      }, {
        field: 'colors',
        operator: 'intersection',
        value: ['blue', 'green', 123],
      }, {
        field: 'colors',
        operator: 'arrayEquals',
        value: ['red', 'blue'],
      },
    ],
  },
]

const isValid = condition(conditions)
isValid(data) // => true
```


## Donate ❤️

BTC: bc1q7famhuj5f25n6qvlm3sssnymk2qpxrfwpyq7g4


## License

MIT © [Thiago Lagden](https://github.com/lagden)
