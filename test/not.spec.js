import { test } from 'node:test'
import assert from 'node:assert/strict'
import condition from '../src/condition.js'

const data = {
	name: 'Lucas',
	chars: ['a', 'b'],
}

const conditions = [
	{
		join_operator: 'and',
		args: [
			{
				field: 'chars',
				operator: '∩',
				not: true,
				value: ['c'],
			},
			{
				field: 'chars',
				operator: '∆',
				not: true,
				value: ['a', 'b'],
			},
			{
				field: 'chars',
				operator: '=',
				not: true,
				value: ['c', 'd'],
			},
			{
				field: 'chars',
				operator: '∈',
				not: true,
				value: 'c',
			},
			{
				field: 'name',
				operator: 'regex',
				not: true,
				value: /t/i,
			},
			{
				field: 'chars',
				operator: 'length',
				compare: '===',
				not: true,
				value: 3,
			},
			{
				field: 'chars',
				operator: 'length',
				not: true,
				value: 1,
			},
			{
				field: 'undefined',
				operator: 'length',
				compare: '===',
				not: true,
				value: 1,
			},
		],
	},
]

test('conditions not', () => {
	const fn = condition(conditions)
	const response = fn(data)
	assert.ok(response)
})
