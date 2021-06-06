---
title: 'JavaScript Vernacular Prototype and Prototype chain'
date: '2021-06-02'
---


There are countless introductions about prototypes and prototype chains on the Internet, but few can explain these two concepts clearly. Most of them introduce how to refer to various objects and attributes. The final result is that arrows are flying all over the sky and the brain is messed up. . This article will start with the naming of these two concepts, using plain and easy-to-understand language to help you understand exactly where these two things are.

### 1. Background knowledge

JavaScript is different from traditional object-oriented programming languages such as Java and C++. It has no concept of classes (classes in ES6 are just syntactic sugar, not real classes). In JavaScript, everything All are objects. In class-based traditional object-oriented programming languages, objects are instantiated from classes. In the process of instantiation, class attributes and methods are copied to this object; object inheritance is actually class inheritance. When the subclass inherits from the parent class, the subclass will copy the properties and methods of the parent class to itself. Therefore, in this type of language, object creation and inheritance are all done through copying. But in JavaScript, object creation and object inheritance (better called object proxy, because it is not inheritance in the traditional sense) does not have copy behavior. **Now let's forget about classes, forget about inheritance, none of this belongs to JavaScript.**

### 2. Prototype and Prototype Chain

In fact, the name archetype itself is easy to misunderstand. The definition of archetype in Baidu entry is: refers to the original type or model. According to this definition, the prototype of an object is the model by which the object creates itself, and the object must have the characteristics of the model. This is just the concept of copying. We have already said that there is no copy in JavaScript's object creation, and the prototype of the object is actually an object, which is completely independent of the object itself. In that case, what is the significance of the existence of prototypes? Prototype is to share some common features (attributes or methods) between multiple objects. This feature is also a must-have for any object-oriented programming language. The prototypes of the two objects A and B are the same, so they must have some similar characteristics.

Objects in JavaScript have a built-in property `[[Prototype]]`that points to the prototype object of this object. When looking for a property or method, if the definition is not found in the current object, it will continue to search in the prototype object of the current object; if it is still not found in the prototype object, it will continue to search in the prototype object of the prototype object (the prototype is also an object , It also has its own prototype); and so on, until it is found, or the search is not found in the topmost prototype object, it ends the search and returns undefined. It can be seen that this search process is a chain search, each object has a link to its own prototype object, and the entire chain of these linked components is the prototype chain. The common characteristics of multiple objects with the same prototype are reflected in this search mode.

In the above search process, we mentioned that the top-level prototype object, the object is `Object.prototype`, the object is saved in the most commonly used methods, such as `toString`, `valueOf`, `hasOwnProperty`and so on, so we can use these methods on any object.

In the above search process, we mentioned that the top-level prototype object, the object is `Object.prototype`, the object is saved in the most commonly used methods, such as `toString`, `valueOf`, `hasOwnProperty`and so on, so we can use these methods on any object.

#### 1. The literal method

When an object is created literally, its prototype is `Object.prototype`. Although we cannot directly access the built-in properties `[[Prototype]]`, we can get the prototype of the object through the `Object.getPrototypeOf()`or object `__proto__`.

```js
var obj = {};
Object.getPrototypeOf(obj) === Object.prototype; // true
obj.__proto__ === Object.prototype; // true

```

#### 2. Function construction call

Called by function construction (note that we do not call it a constructor function, because JavaScript also does not have the concept of a constructor function, all functions are equal, but when used to create an object, the function is called in a different way). A common way of creating objects. Objects created based on the same function should share some of the same properties or methods, but if these properties or methods are placed in Object.prototype, then all objects can use them. The scope is too large and obviously inappropriate . Therefore, when JavaScript defines a function, it also defines a default prototype property for the function. All shared properties or methods are placed in the object pointed to by this property. It can be seen from this that the prototype of an object created by a function's construction call is the object pointed to by the function's prototype.

```js
var f = function (name) {
  this.name = name;
};
f.prototype.getName = function () {
  return this.name;
}; // Store shared methods of all objects under prototype
var obj = new f("JavaScript");
obj.getName(); // JavaScript
obj.__proto__ === f.prototype; // true

```

#### 3.Object.create()

The third common way to create objects is to use `Object.create()`. This method will use the object you pass in as the prototype of the created object.

```js
var obj = {};
var obj2 = Object.create(obj);
obj2.__proto__ === obj; // true

```

This way can also simulate the "inheritance" behavior of objects.

```js
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function () {
  return this.name;
};

function Bar(name, label) {
  Foo.call(this, name); //
  this.label = label;
}

// The prototype of the temp object is Foo.prototype
var temp = Object.create(Foo.prototype);

// The prototype of the object created by new Bar() is temp, and the prototype of temp is Foo.prototype,
// So the two prototype objects Bar.prototype and Foo.prototype have an "inheritance" relationship
Bar.prototype = temp;

Bar.prototype.myLabel = function () {
  return this.label;
};

var a = new Bar("a", "obj a");

a.myName(); // "a"
a.myLabel(); // "obj a"
a.__proto__.__proto__ === Foo.prototype; //true

```

### 3. `__proto__`And prototype

These are two attributes that are easy to confuse. `__proto__` Point to the prototype of the current object. The prototype is an attribute of the function. By default, the object created by a function of new has its prototype pointing to the prototype attribute of this function.

### Four. Three special cases

1. For the built-in objects in JavaScript, such as String, Number, Array, Object, Function, etc., because they are implemented by native code, their prototypes are printed out `ƒ () { [native code] }`.
2. Built-in objects are essentially functions, so you can create objects through them. The prototype of the created object points to the prototype property of the corresponding built-in object, and the topmost prototype object still points to Object.prototype.

```js
"abc".__proto__ === String.prototype; // true
new String("abc").__proto__ === String.prototype; //true

new Number(1).__proto__ === Number.prototype; // true

[1, 2, 3].__proto__ === Array.prototype; // true
new Array(1, 2, 3).__proto__ === Array.prototype; // true

({}.__proto__ === Object.prototype); // true
new Object({}).__proto__ === Object.prototype; // true

var f = function () {};
f.__proto__ === Function.prototype; // true
var f = new Function("{}");
f.__proto__ === Function.prototype; // true
```

3. `Object.create(null)` There is no prototype for the created object.

```js
var a = Object.create(null);
a.__proto__; // undefined
```

In addition, there is a constructor method in the prototype of the function. It is recommended that you treat it as if it does not exist. Its existence makes the concept of JavaScript prototypes more confusing, and this method is almost useless.
