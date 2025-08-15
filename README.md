<p align="center">
	<img width="200" height="200" alt="Image" src="https://inbetween-time.web.app/images/PS_LOGO.png" />
</p>

# py-script

A lightweight and versatile library for running your favorite native Python methods in modern JavaScript and TypeScript applications.

## Installation

```bash
npm install @gilbertfrausto/py-script
```

## Usage
Just import any of the methods you need, just like so.

```typescript
import { len, range } from 'py-script';

const arr = [0,1,2,4];

for (let item of range(5)) {
	console.log(i) // $> 0,1,2,4
}
```

## API

### `len(element: any[]|Object|string, forLoop?: boolean): number`

Gets the length of an array, object, or string.

**Parameters:**

* `element`: The array, object, or string to get the length of.
* `forLoop`: A boolean indicating whether to return the length minus one, for use in a for loop. Defaults to false.

**Returns:**

The length of the element.

**Example:**

```ts
len([1, 2, 3]); // 3
len({a: 1, b: 2}); // 2
len("hello"); // 5
```

### `range(startOrEnd: number, end?: number): Generator<number, void, unknown>`

Generates a sequence of numbers within a specified range.

**Parameters:**

* `startOrEnd`: The starting number of the sequence, or the ending number if `end` is not provided.
* `end`: The ending number of the sequence.

**Yields:**

A number in the sequence.

**Example:**

```ts
for (const i of range(5)) {
	console.log(i); // 0, 1, 2, 3, 4
}

for (const i of range(2, 5)) {
	console.log(i); // 2, 3, 4
}
```

### `isalpha(str: string): boolean`

Checks if a string contains only alphabetic characters.

**Parameters:**

* `str`: The string to check.

**Returns:**

`true` if the string contains only alphabetic characters, `false` otherwise.

**Example:**

```ts
isalpha("hello"); // true
isalpha("hello123"); // false
```

### `isdigit(str: string): boolean`

Checks if a string contains only digits.

**Parameters:**

* `str`: The string to check.

**Returns:**

`true` if the string contains only digits, `false` otherwise.

**Example:**

```ts
isdigit("123"); // true
isdigit("hello123"); // true
isdigit("hello"); // false
```

### `enumarate(object: object): Generator<any[], void, unknown>`

Enumerates over an object, yielding `[key, value]` pairs.

**Parameters:**

* `object`: The object to enumerate over.

**Yields:**

A `[key, value]` pair.

**Example:**

```ts
const obj = {a: 1, b: 2};
for (const [key, value] of enumarate(obj)) {
	console.log(key, value); // "a" 1, "b" 2
}
```

### `zip<T>(arr_1: Array<T>,arr_2: Array<T>): Generator<unknown, undefined, unknown>`

Zips two arrays together, returning an array of tuples.

**Parameters:**

* `arr_1`: The first array.
* `arr_2`: The second array.

**Yields:**

A tuple containing the elements from the two arrays at the same index.

**Throws:**

An error if the arrays are not of the same length.

**Example:**

```ts
const arr1 = [1, 2, 3];
const arr2 = ["a", "b", "c"];
for (const tuple of zip(arr1, arr2)) {
	console.log(tuple); // [1, "a"], [2, "b"], [3, "c"]
}
```

### `integer(count = 0, max = Number.MAX_SAFE_INTEGER, step = 1): () => number | undefined`

Creates a function that generates a sequence of integers.

**Parameters:**

* `count`: The starting number of the sequence. Defaults to 0.
* `max`: The maximum number of the sequence. Defaults to `Number.MAX_SAFE_INTEGER`.
* `step`: The step to increment the sequence by. Defaults to 1.

**Returns:**

A function that returns the next number in the sequence, or `undefined` if the sequence has finished.

**Example:**

```ts
const myInteger = integer(0, 5);
myInteger(); // 0
myInteger(); // 1
myInteger(); // 2
myInteger(); // 3
myInteger(); // 4
myInteger(); // undefined
```

### `inter<T>(element: Array<T> | string, gen = integer(0, element.length)): () => any`

Creates a function that iterates over an array or string.

**Parameters:**

* `element`: The array or string to iterate over.
* `gen`: A function that generates the next index in the sequence. Defaults to a function that generates a sequence of integers from 0 to the length of the element.

**Returns:**

A function that returns the next element in the sequence, or `undefined` if the sequence has finished.

**Example:**

```ts
const myInter = inter([1, 2, 3]);
myInter(); // 1
myInter(); // 2
myInter(); // 3
myInter(); // undefined
```

### `next(gen: () => any): unknown`

Gets the next item from a generator function.

**Parameters:**

* `gen`: The generator function to get the next item from.

**Returns:**

The next item from the generator function.

**Example:**

```ts
const myInter = inter([1, 2, 3]);
next(myInter); // 1
next(myInter); // 2
next(myInter); // 3
next(myInter); // undefined
```

### `max<T extends string | number>(arr: Array<T>): string | number | undefined`

Gets the maximum value from an array of numbers or strings.

**Parameters:**

* `arr`: The array to get the maximum value from.

**Returns:**

The maximum value in the array, or `undefined` if the array is empty.

**Example:**

```ts
max([1, 2, 3]); // 3
max(["a", "b", "c"]); // "c"
```

### `min<T extends string | number>(arr: Array<T>): string | number | undefined`

Gets the minimum value from an array of numbers or strings.

**Parameters:**

* `arr`: The array to get the minimum value from.

**Returns:**

The minimum value in the array, or `undefined` if the array is empty.

**Example:**

```ts
min([1, 2, 3]); // 1
min(["a", "b", "c"]); // "a"
```

### `isinstance(obj: any, type: any): boolean`

Checks if an object is an instance of a specified type.

**Parameters:**

* `obj`: The object to check.
* `type`: The type to check against. Can be a string (e.g., "str", "int", "float", "bool", "list", "tuple", "set", "dict", "object"), a class, or an array of types.

**Returns:**

`true` if the object is an instance of the specified type, `false` otherwise.

**Example:**

```ts
isinstance("hello", "str"); // true
isinstance(42, "int"); // true
isinstance(3.14, "float"); // true
isinstance(true, "bool"); // true
isinstance([], "list"); // true
isinstance({}, "dict"); // true
isinstance(new Set(), "set"); // true
class Car {}
class ElectricCar extends Car {}
isinstance(new Car(), Car); // true
isinstance(new ElectricCar(), Car); // true
isinstance("text", [Number, "str"]); // true
```

### `sum(numbersArr: number[], start = 0): number`

Calculates the sum of an array of numbers.

**Parameters:**

* `numbersArr`: The array of numbers to sum.
* `start`: A number to add to the sum. Defaults to 0.

**Returns:**

The sum of the array of numbers.

**Throws:**

An error if the array contains non-numeric values.

**Example:**

```ts
sum([1, 2, 3]); // 6
sum([1, 2, 3], 4); // 10
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.