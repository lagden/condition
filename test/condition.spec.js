import test from 'ava'
import condition from '../src/condition.js'
import {intersection} from '../src/helper.js'

const data = {
	age: 65,
	gender: 'F',
	city: 'São Paulo',
	country: 'Brazil',
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
			},
		],
	},
]

const condition_intersection = [
	{
		join_operator: '',
		args: [
			{
				field: 'colors',
				operator: 'intersection',
				value: ['yellow', 'green'],
			},
		],
	},
]

const condition_assigned = [
	{
		join_operator: '',
		args: [
			{
				field: 'state',
				operator: 'assigned',
				value: 'true',
			},
		],
	},
]

const condition_assigned_other = [
	{
		join_operator: '',
		args: [
			{
				field: 'city',
				operator: 'assigned',
				value: '1',
			},
		],
	},
]

const condition_wrong_operator = [
	{
		join_operator: '',
		args: [
			{
				field: 'uf',
				operator: 'wrong',
				value: true,
			},
		],
	},
]

test('conditions', t => {
	const fn = condition(conditions)
	const response = fn(data)
	t.true(response)
})

test('condition_intersection', t => {
	const fn = condition(condition_intersection)
	const response = fn(data)
	t.false(response)
})

test('intersection', t => {
	t.true(intersection('tadashi', ['tadashi', 'takamoto']))
})

test('condition_assigned', t => {
	const fn = condition(condition_assigned)
	const response = fn(data)
	t.false(response)
})

test('condition_assigned_other', t => {
	const fn = condition(condition_assigned_other)
	const response = fn(data)
	t.true(response)
})

test('condition_wrong_operator', t => {
	const error = t.throws(() => {
		condition(condition_wrong_operator)
	}, {instanceOf: Error})
	t.is(error.message, 'Wrong operator')
})
