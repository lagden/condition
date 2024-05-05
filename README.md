# Condition

[![NPM version][npm-img]][npm]
[![Node.js CI][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[npm-img]: https://img.shields.io/npm/v/@tadashi/condition.svg
[npm]: https://www.npmjs.com/package/@tadashi/condition
[ci-img]: https://github.com/lagden/condition/actions/workflows/nodejs.yml/badge.svg
[ci]: https://github.com/lagden/condition/actions/workflows/nodejs.yml
[coveralls-img]: https://coveralls.io/repos/github/lagden/condition/badge.svg?branch=main
[coveralls]: https://coveralls.io/github/lagden/condition?branch=main

Create conditional to validate data.

## Install

```
$ npm i @tadashi/condition
```

## Operators

| Operator     | Alias            | Symbol | Description                                                  |
| ------------ | ---------------- | :----: | ------------------------------------------------------------ |
| eq           | -                |  ===   | Two values are equal                                         |
| ne           | -                |  !==   | Two values are not equal                                     |
| gt           | -                |   >    | The first value is greater than the second value             |
| ge           | -                |   >=   | The first value is greater than or equal to the second value |
| lt           | -                |   <    | The first value is less than the second value                |
| le           | -                |   <=   | The first value is less than or equal to the second value    |
| intersection | -                |   ∩    | There is an intersection between two arrays                  |
| difference   | -                |   ∆    | There is a difference between two arrays                     |
| arrayEquals  | -                |   =    | Two arrays are equal                                         |
| belongs      | `has` `includes` |   ∈    | The value belongs belongs to array                           |
| regex        | -                |   -    | The value matches a regular expression pattern               |
| length       | -                |   -    | The length of a value satisfies a comparison                 |
| assigned     | -                |   -    | The value was assigned                                       |

## Schema

```yaml
Condition:
  type: object
  properties:
    join_operator:
      type: string
      enum: [and, or]
      default: and
    args:
      type: array
      items:
        oneOf:
          - $ref: '#/definitions/ConditionArgument'
          - $ref: '#/definitions/Condition'
  required:
    - join_operator
    - args

ConditionArgument:
  type: object
  properties:
    field:
      type: string
    operator:
      type: string
    value:
      type: any
      anyOf:
        - type: boolean
        - type: string
        - type: number
        - type: array
    flag:
      type: string
    compare:
      type: string
      enum: [eq, ne, gt, ge, greater, lt, le, less]
    useNot:
      type: boolean
      default: false
  required:
    - field
    - operator
    - value

definitions:
  Condition:
    $ref: '#/Condition'
  ConditionArgument:
    $ref: '#/ConditionArgument'
```

## Usage

See example below.

```js
import condition, {registerOperator} from '@tadashi/condition'

registerOperator('legalAge', params => {
  const {
    fieldValue,
    value: conditionValue,
    // not,
    // flag,
    // compare,
  } = params

  try {
    const today = new Date()
    const externalDate = new Date(fieldValue)
    let age = today.getFullYear() - externalDate.getFullYear()
    const monthDiff = today.getMonth() - externalDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < externalDate.getDate())) {
      age--
    }

    return age >= conditionValue
  } catch {
    return false
  }
})

const data = {
  user: {
    name: 'Yumi',
    birthday: '1990-12-31',
    gender: 'F',
    issues: 65,
  },
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
        field: 'user.gender',
        operator: 'eq',
        value: 'F',
      },
      {
        field: 'user.birthday',
        operator: 'legalAge',
        value: 21,
      },
      {
        field: 'user.issues',
        operator: 'gt',
        value: 51,
      },
      {
        field: 'phone',
        operator: 'regex',
        value: /\(\d{2}\)\s(\d{8,9})/i,
      },
      {
        join_operator: 'or',
        args: [
          {
            field: 'city',
            operator: 'assigned',
            value: false,
          },
          {
            field: 'country',
            operator: 'intersection',
            value: ['Japan', 'Brazil'],
          },
        ],
      },
      {
        field: 'hasCar',
        operator: 'eq',
        value: true,
      },
      {
        field: 'colors',
        operator: 'intersection',
        value: ['blue', 'green', 123],
      },
      {
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

## Buy Me a Coffee

BTC: bc1q7famhuj5f25n6qvlm3sssnymk2qpxrfwpyq7g4

## License

MIT © [Thiago Lagden](https://github.com/lagden)
