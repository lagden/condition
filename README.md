# Condition

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[![XO code style][xo-img]][xo]

[npm-img]:         https://img.shields.io/npm/v/@tadashi/condition.svg
[npm]:             https://www.npmjs.com/package/@tadashi/condition
[ci-img]:          https://github.com/lagden/condition/workflows/Node.js%20CI/badge.svg
[ci]:              https://github.com/lagden/condition/actions?query=workflow%3A%22Node.js+CI%22
[coveralls-img]:   https://coveralls.io/repos/github/lagden/condition/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/condition?branch=main
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo


Create conditional for data.


## Install

```
$ npm i -S @tadashi/condition
```


## Usage

See example below.

```js
import 'condition' from '@tadashi/condition'

const data = {
  age: 65,
  gender: 'F',
  hasCar: true,
  city: 'São Paulo',
  country: 'Brasil'
}

const conditions = [
  {
    join_operator: 'and',
    args: [
      {
        field: 'gender',
        operator: 'eq',
        value: 'F'
      }, {
        field: 'age',
        operator: 'gt',
        value: 21
      }, {
        join_operator: 'or',
        args: [
          {
            field: 'city',
            operator: 'assigned',
            value: true
          }, {
            field: 'country',
            operator: 'intersection',
            value: ['Brasil', 'Japan']
          }
        ]
      }, {
        field: 'hasCar',
        operator: 'eq',
        value: true
      }
    ]
  }
]

const isValid = condition(conditions)
isValid(data) // => true
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
