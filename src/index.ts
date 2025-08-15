enum IS {
	OBJECT = 'object',
	ARRAY = 'array',
	STRING ='string',
	NUMBER = 'number',
	BOOLEAN = 'boolean',
	FUNCTION = 'function'
}

const ERRORS = {
	LEN_MISS_MATCH: 'Error, array length not identical',
	NUMBERS_ONLY: 'TypeError... must only be an array of numbers'
}

/**
 * Gets the length of an array, object, or string.
 * 
 * @param element The array, object, or string to get the length of.
 * @param forLoop A boolean indicating whether to return the length minus one, for use in a for loop. Defaults to false.
 * @returns The length of the element.
 * 
 * @example
 * ```ts
 * len([1, 2, 3]); // 3
 * len({a: 1, b: 2}); // 2
 * len("hello"); // 5
 * ```
 */
export function len(element: any[]|Object|string, forLoop?: boolean): number {
	if (typeof element === IS.OBJECT && !Array.isArray(element)) {
		return Object.keys(element).length;
	} else if (typeof element === IS.STRING) {
		return (element as string).length;
	} else if (Array.isArray(element) && !forLoop) {
		return (element as any[]).length;
	} else if (Array.isArray(element) && forLoop) {
		return element.length - 1;
	} else {
		return 0;
	}
}

/**
 * Generates a sequence of numbers within a specified range.
 * 
 * @param startOrEnd The starting number of the sequence, or the ending number if `end` is not provided.
 * @param end The ending number of the sequence. 
 * @yields A number in the sequence.
 * 
 * @example
 * ```ts
 * for (const i of range(5)) {
 * 	console.log(i); // 0, 1, 2, 3, 4
 * }
 * 
 * for (const i of range(2, 5)) {
 * 	console.log(i); // 2, 3, 4
 * }
 * ```
 */
export function* range(startOrEnd: number, end?: number) {
	if (end === undefined) {
		for (let i = 0; i < startOrEnd; i++) {
			yield i;
		}
	} else {
		for (let i = startOrEnd; i < end; i++) {
			yield i;
		}
	}
}

/**
 * Checks if a string contains only alphabetic characters.
 * 
 * @param str The string to check.
 * @returns `true` if the string contains only alphabetic characters, `false` otherwise.
 * 
 * @example
 * ```ts
 * isalpha("hello"); // true
 * isalpha("hello123"); // false
 * ```
 */
export function isalpha(str: string): boolean {
	return !/\d/.test(str);
}

/**
 * Checks if a string contains only digits.
 * 
 * @param str The string to check.
 * @returns `true` if the string contains only digits, `false` otherwise.
 * 
 * @example
 * ```ts
 * isdigit("123"); // true
 * isdigit("hello123"); // true
 * isdigit("hello"); // false
 * ```
 */
export function isdigit(str: string): boolean {
	return !!/\d/.test(str);
}

/**
 * Enumerates over an object, yielding `[key, value]` pairs.
 * 
 * @param object The object to enumerate over.
 * @yields A `[key, value]` pair.
 * 
 * @example
 * ```ts
 * const obj = {a: 1, b: 2};
 * for (const [key, value] of enumarate(obj)) {
 * 	console.log(key, value); // "a" 1, "b" 2
 * }
 * ```
 */
export function* enumarate(object: object): Generator<any[], void, unknown> {
	for (let key in object) {
		yield [key, (object as any)[key]];
	}
}
/**
 * Zips two arrays together, returning an array of tuples.
 * 
 * @param arr_1 The first array.
 * @param arr_2 The second array.
 * @yields A tuple containing the elements from the two arrays at the same index.
 * @throws An error if the arrays are not of the same length.
 * 
 * @example
 * ```ts
 * const arr1 = [1, 2, 3];
 * const arr2 = ["a", "b", "c"];
 * for (const tuple of zip(arr1, arr2)) {
 * 	console.log(tuple); // [1, "a"], [2, "b"], [3, "c"]
 * }
 * ```
 */
export function* zip<T>(arr_1: Array<T>,arr_2: Array<T>): Generator<unknown, undefined, unknown> {
	if (len(arr_1) !== len(arr_2)) throw new Error(ERRORS.LEN_MISS_MATCH);

	for (let i of range(0, len(arr_1, true))) {
		yield [arr_1[i], arr_2[i]];
	}
}

/**
 * Creates a function that generates a sequence of integers.
 * 
 * @param count The starting number of the sequence. Defaults to 0.
 * @param max The maximum number of the sequence. Defaults to `Number.MAX_SAFE_INTEGER`.
 * @param step The step to increment the sequence by. Defaults to 1.
 * @returns A function that returns the next number in the sequence, or `undefined` if the sequence has finished.
 * 
 * @example
 * ```ts
 * const myInteger = integer(0, 5);
 * myInteger(); // 0
 * myInteger(); // 1
 * myInteger(); // 2
 * myInteger(); // 3
 * myInteger(); // 4
 * myInteger(); // undefined
 * ```
 */
export function integer(count = 0, max = Number.MAX_SAFE_INTEGER, step = 1) {
	return function() {
		if (count < max) {
			const current = count;
			count += step
			return current;
		} else {
			return undefined;
		}
		
	}
}

/**
 * Creates a function that iterates over an array or string.
 * 
 * @param element The array or string to iterate over.
 * @param gen A function that generates the next index in the sequence. Defaults to a function that generates a sequence of integers from 0 to the length of the element.
 * @returns A function that returns the next element in the sequence, or `undefined` if the sequence has finished.
 * 
 * @example
 * ```ts
 * const myInter = inter([1, 2, 3]);
 * myInter(); // 1
 * myInter(); // 2
 * myInter(); // 3
 * myInter(); // undefined
 * ```
 */
export function inter<T>(element: Array<T> | string, gen = integer(0, element.length)) {
	return function get_next_element() {
		const next = gen();
		if (next !== undefined) {
			return element[next];
		} else {
			return undefined;
		}
	}
}

/**
 * Gets the next item from a generator function.
 * 
 * @param gen The generator function to get the next item from.
 * @returns The next item from the generator function.
 * 
 * @example
 * ```ts
 * const myInter = inter([1, 2, 3]);
 * next(myInter); // 1
 * next(myInter); // 2
 * next(myInter); // 3
 * next(myInter); // undefined
 * ```
 */
export function next(gen: () => any): unknown {
	return gen()
}

/**
 * Gets the maximum value from an array of numbers or strings.
 * 
 * @param arr The array to get the maximum value from.
 * @returns The maximum value in the array, or `undefined` if the array is empty.
 * 
 * @example
 * ```ts
 * max([1, 2, 3]); // 3
 * max(["a", "b", "c"]); // "c"
 * ```
 */
export function max<T extends string | number>(arr: Array<T>): string | number | undefined {
	let results: T | undefined = undefined;

	for (let item of arr) {
		if (results === undefined || item > results) {
			results = item;
		}
	}
	return results;
}

/**
 * Gets the minimum value from an array of numbers or strings.
 * 
 * @param arr The array to get the minimum value from.
 * @returns The minimum value in the array, or `undefined` if the array is empty.
 * 
 * @example
 * ```ts
 * min([1, 2, 3]); // 1
 * min(["a", "b", "c"]); // "a"
 * ```
 */
export function min<T extends string | number>(arr: Array<T>): string | number | undefined {
	let results: T | undefined = undefined;

	for (let item of arr) {
		if (results === undefined || item < results) {
			results = item;
		}
	}
	return results;
}

/**
 * Checks if an object is an instance of a specified type.
 * 
 * @param obj The object to check.
 * @param type The type to check against. Can be a string (e.g., "str", "int", "float", "bool", "list", "tuple", "set", "dict", "object"), a class, or an array of types.
 * @returns `true` if the object is an instance of the specified type, `false` otherwise.
 * 
 * @example
 * ```ts
 * isinstance("hello", "str"); // true
 * isinstance(42, "int"); // true
 * isinstance(3.14, "float"); // true
 * isinstance(true, "bool"); // true
 * isinstance([], "list"); // true
 * isinstance({}, "dict"); // true
 * isinstance(new Set(), "set"); // true
 * class Car {}
 * class ElectricCar extends Car {}
 * isinstance(new Car(), Car); // true
 * isinstance(new ElectricCar(), Car); // true
 * isinstance("text", [Number, "str"]); // true
 * ```
 */
export function isinstance(obj: any, type: any): boolean {
    if (Array.isArray(type)) {
        return type.some(t => isinstance(obj, t));
    }

    switch (type) {
        case 'str':
        case IS.STRING:
            return typeof obj === IS.STRING;
        case 'int':
        case 'float':
        case IS.NUMBER:
            return typeof obj === IS.NUMBER;
        case 'bool':
            return typeof obj === IS.BOOLEAN;
        case 'list':
        case 'tuple':
        case 'set':
            return Array.isArray(obj);
        case 'dict':
            return typeof obj === IS.OBJECT && obj !== null && !Array.isArray(obj);
				case IS.OBJECT:
					return !!(typeof obj === IS.OBJECT && obj !== null && !Array.isArray(obj))
        default:
            if (typeof type === IS.FUNCTION) {
                return obj instanceof type;
            }
            return false;
    }
}

/**
 * Calculates the sum of an array of numbers.
 * 
 * @param numbersArr The array of numbers to sum.
 * @param start A number to add to the sum. Defaults to 0.
 * @returns The sum of the array of numbers.
 * @throws An error if the array contains non-numeric values.
 * 
 * @example
 * ```ts
 * sum([1, 2, 3]); // 6
 * sum([1, 2, 3], 4); // 10
 * ```
 */
export function sum(numbersArr: number[], start = 0): number {
	let total = start;

	for (let num of numbersArr) {
		if (typeof num !== 'number'){
			throw new Error(ERRORS.NUMBERS_ONLY);
		}
		total += num;
	}

	return total;
}
