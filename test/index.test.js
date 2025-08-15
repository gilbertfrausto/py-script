import { test, expect } from "bun:test";
import { len, range, isalpha, isdigit, enumarate, integer, inter, next, max, min, isinstance, sum } from "../src/index";
test("len", () => {
    expect(len("hello")).toBe(5);
    expect(len([1, 2, 3])).toBe(3);
    expect(len({ a: 1, b: 2 })).toBe(2);
    expect(len(123)).toBe(0);
});
test("range", () => {
    expect([...range(5)]).toEqual([0, 1, 2, 3, 4]);
    expect([...range(1, 5)]).toEqual([1, 2, 3, 4,]);
});
test("isalpha", () => {
    expect(isalpha("hello")).toBe(true);
    expect(isalpha("hello123")).toBe(false);
    expect(isalpha("123")).toBe(false);
});
test("isdigit", () => {
    expect(isdigit("123")).toBe(true);
    expect(isdigit("hello123")).toBe(true);
    expect(isdigit("hello")).toBe(false);
});
test("enumarate", () => {
    const obj = { a: 1, b: 2 };
    expect([...enumarate(obj)]).toEqual([["a", 1], ["b", 2]]);
});
test("integer", () => {
    const counter = integer();
    expect(counter()).toBe(0);
    expect(counter()).toBe(1);
    expect(counter()).toBe(2);
    const counter2 = integer(5, 10, 2);
    expect(counter2()).toBe(5);
    expect(counter2()).toBe(7);
    expect(counter2()).toBe(9);
    expect(counter2()).toBeUndefined();
});
test("inter", () => {
    const myinter = inter(["tester", "testing", "more test"]);
    expect(next(myinter)).toBe("tester");
    expect(next(myinter)).toBe("testing");
    expect(next(myinter)).toBe("more test");
    expect(next(myinter)).toBe(undefined);
});
test("next", () => {
    const myinter = inter(['tester', 'testing', 'more test']);
    const myStrInter = inter('Rhombus');
    expect(next(myinter)).toBe('tester');
    expect(next(myinter)).toBe('testing');
    expect(next(myinter)).toBe('more test');
    expect(next(myinter)).toBe(undefined);
    expect(next(myStrInter)).toBe("R");
    expect(next(myStrInter)).toBe("h");
    expect(next(myStrInter)).toBe("o");
});
test('max', () => {
    expect(max([10, 9, 30, 1, 1, 100])).toBe(100);
    expect(max([100, 9, 30, 1, 1, 10])).toBe(100);
});
test('min', () => {
    expect(min([10, 9, 30, 0, 1, 100])).toBe(0);
    expect(min([-100, 9, 30, -1, 10])).toBe(-100);
});
test('isinstance', () => {
    expect(isinstance("hello", 'str')).toBe(true);
    expect(isinstance(123, 'int')).toBe(true);
    expect(isinstance(123.45, 'float')).toBe(true);
    expect(isinstance(true, 'bool')).toBe(true);
    expect(isinstance([1, 2, 3], 'list')).toBe(true);
    expect(isinstance([1, 2, 3], 'tuple')).toBe(true);
    expect(isinstance([], 'set')).toBe(true);
    expect(isinstance({}, 'dict')).toBe(true);
    expect(isinstance(new Date(), Date)).toBe(true);
    expect(isinstance([1, 2, 3], ['str', 'list'])).toBe(true);
    expect(isinstance({}, ['str', 'list', 'dict'])).toBe(true);
});
test('sum', () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([1, 2, 3], 10)).toBe(16);
    expect(() => sum([1, 2, '3'])).toThrow();
});
