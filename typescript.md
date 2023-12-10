# TypeScript Overview

## Table of Contents

- [Introduction](#introduction)
- [Setting Up TypeScript](#setting-up-typescript)
- [Basic Types](#basic-types)
- [Variables](#variables)

## Introduction

TypeScript is a superset of JavaScript that adds static typing to the language. It enables developers to write more robust and maintainable code by catching errors during development rather than at runtime. TypeScript code is transpiled to JavaScript, making it compatible with all JavaScript environments.

## Setting Up TypeScript

To use TypeScript, you need to install it globally using npm:

```bash
npm install -g typescript
```

You can then create a tsconfig.json file in your project directory to configure TypeScript options. After setting up the configuration, you can compile TypeScript files using the tsc command.

```bash
tsc
```

## Basic Types

### Boolean

The **boolean** type represents a logical value: true or false.

```typescript
let isDone: boolean = false;
```

### Number

The **number** type is used for both integer and floating-point numbers.

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### String

The **string** type is used for text data.

```typescript
let color: string = "blue";
let fullName: string = `John Doe`;
```

### Array

Arrays can be typed using the syntax **type[]** or **Array<type>**.

```typescript
let numbers: number[] = [1, 2, 3];
let fruits: Array<string> = ["apple", "banana", "orange"];
```

### Tuple

Tuples allow expressing an array where the type of a fixed number of elements is known.

```typescript
let tuple: [string, number] = ["hello", 10];
```

### Enum

Enums are a way of giving more friendly names to sets of numeric values.

```typescript
enum Color {
  Red,
  Green,
  Blue,
}

let c: Color = Color.Green;
```

### Any

The **any** type is a flexible type that allows values of any type.

```typescript
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;
```

### Void

The **void** type is used when a function does not return any value.

```typescript
function logMessage(): void {
  console.log("This is a log message");
}
```

### Null and Undefined

In TypeScript, **null** and **undefined** have their own types.

```typescript
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

### Never

The **never** type represents values that will never occur.

```typescript
function throwError(message: string): never {
  throw new Error(message);
}
```

### Object

The **object** type is a type that represents the non-primitive type.

```typescript
let obj: object = { key: "value" };
```

## Variables

A variable, by definition, is **a named space in the memory** that stores values. In other words, it acts as a container for values in a program. TypeScript variables must follow the JavaScript naming rules:

- Variable names can contain alphabets and numeric digits.

- They cannot contain spaces and special characters, except the underscore (\_) and the dollar ($) sign.

- Variable names cannot begin with a digit.

### Variable Declaration in TypeScript

When you declare a variable, you have four options:

Declare its type and value in one statement.

```typescript
// The variable stores a value of type string
var name:string = ”mary”
```

Declare its type but no value. In this case, the variable will be set to undefined.

```typescript
// The variable is a string variable. The variable’s value is set to undefined by default
var name: string;
```

Declare its value but no type. The variable type will be set to the data type of the assigned value.

```typescript
// The variable’s type is inferred from the data type of the value. Here, the variable is of the type string
var name = ”mary”
```

Declare neither value not type. In this case, the data type of the variable will be any and will be initialized to undefined.

```typescript
// The variable’s data type is any. Its value is set to undefined by default.
var name;
```
