/**
 * Evaluates a set of conditional expressions against provided data.
 *
 * @param {Array<Object>} conditionals - An array of conditional expressions to evaluate.
 * @returns {function(Object): boolean} - A function that takes data and returns the evaluation result.
 *
 * @example
 * const conditionals = [
 *   { operator: 'equals', field: 'a', value: 1 },
 *   { operator: 'assigned', field: 'b', value: true },
 * ];
 * const evaluate = condition(conditionals);
 * const result = evaluate({ a: 1, b: undefined }); // Returns false
 */
export default function condition(conditionals: Array<any>): (arg0: any) => boolean;
export { registerOperator } from "./operator.js";
