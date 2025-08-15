<img width="99" height="100" alt="Image" src="https://inbetween-time.web.app/images/PY_SCRIPT_LOGO.png" />

### Examples


#### Loops

#### range
Takes two parameters... If one argument is passed it will loop to that number. If two argmunets are pass will be a start and end count.

```javascript
for (let i of range(3)) {
	console.log(i); // 0,1,2
}

for (let i of range(1, 4)) {
	console.log(i); // 1,2,3,4
}
```

#### iter and next
`inter()` takes an array of items and is passed to the `next()` function which will return the next item in the array. This is like a manual generator. Once all elements have returned, `next()` will return `undefined`

```javascript
const myiter = inter(['pop tarts', 'cookies', 'candy']);

console.log(next(myiter)); // $> 'pop tarts'
console.log(next(myiter)); // $> 'cookies'
console.log(next(myiter)); // $> 'candy'
console.log(next(myiter)); // $> undefined

```

##### zip

```javascript
const arr_1 = ['me', 'my self', 'I'];
const arr_2 = ['you', 'them', 'all'];
for (let tuple of zip(arr_1, arr_2)) {
	console.log(tuple); // $> ['me', 'you'], ['myself', 'them'], ['I', 'all']
}
```

#### enumarate
will reutrn key value pairs in a tuple

```javascript
const obj = {
	a: 'value 1'
	b: 'value 2'
	c: 'value 3'
}

for(let [key, value] of enumarate(obj)) {
	console.log(key, value); // $> [a, 'value 1'], [b, 'value 2'], [b, 'value 3']
}
```

#### Helpers

#### isalpha

```javascript
isalpha('whooo'); // $> true
isalpha('100'); // $> false
```

#### isdigit

```javascript
isdigit('grr'); // $> false
isdigit('100'); // $> true
```

#### len
returns the length of an array, string or object. Also takes in an optional argument `forLoop`, which will reutrn -1 so its loop ready

```javascript
len([1,2,3,4]) // $> 4
len([1,2,3,4] true) // $> 3
```

#### min
Get the lowest item from an array

```javascript
min([0,10,-90, 1000]) // $> -90
```

#### max
Get the max item from an array

```javascript
max[0,10,-90, 1000]) // $> 1000
```

#### sum
Add an array of numbers, also take an option argument to add to the final totally.

```javascript
sum([0,10,90, '90'] as number[], 1000); //$> TypeError
sum([0,10,90], 1000); // $> 1100
```

#### instanceof
Check if the first argument is an instance of the type passed as argument two.


```javascript
class Car {}
class ElectricCar extends Car {}

isinstance(new Car(), Car); // true
isinstance(new ElectricCar(), Car)); // true
isinstance("hello", "str")); // true
isinstance("wolrd", "string")); // true
isinstance(42, "int"); // true
isinstance(42, "number"); // true
isinstance({}, "object"); // true
isinstance([], "array"); // true
```