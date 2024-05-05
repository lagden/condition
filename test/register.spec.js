import {test} from 'node:test'
import assert from 'node:assert/strict'
import condition, {registerOperator} from '../src/condition.js'

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

test('conditions register', () => {
	const fn = condition(conditions)
	const response = fn(data)
	assert.ok(response)
})

test('conditions override operator', () => {
	assert.throws(
		() => {
			registerOperator('legalAge', () => {})
		},
		{
			message: 'You cannot override existing operator method.',
		},
	)
})
