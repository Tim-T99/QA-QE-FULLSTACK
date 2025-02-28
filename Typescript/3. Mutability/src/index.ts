//        Mutability and Inference
// 1: Inference with an Array of Objects
// type ButtonAttributes = {
//   type: "button" | "submit" | "reset";
// };

// const modifyButtons = (attributes: ButtonAttributes[]) => {};

// const buttonsToChange:ButtonAttributes[] = [
//   {
//     type: "button",
//   },
//   {
//     type: "submit",
//   },
// ];

// modifyButtons(buttonsToChange);

// 2: Avoiding Array Mutation
// function printNames(names: readonly string[]) {
//   for (const name of names) {
//     console.log(name);
//   }

//   names.push("John");

//   names[0] = "Billy";
// }

// 3: An Unsafe Tuple
// const dangerousFunction = (arrayOfNumbers: number[]) => {
//   arrayOfNumbers.pop();
//   arrayOfNumbers.pop();
// };

// type Coordinate = readonly [number, number];
// const myHouse: Coordinate = [0, 0];

// dangerousFunction(
//   myHouse,
// );

//        Deep Immutability with as const
// 1: Returning A Tuple From A Function
// const fetchData = async () => {
//   const result = await fetch("/");

//   if (!result.ok) {
//     return [new Error("Could not fetch data.")] as const;
//   }

//   const data = await result.json();

//   return [undefined, data] as const;
// };

// const example = async () => {
//   const [error, data] = await fetchData();

//   type Tests = [
//     Expect<Equal<typeof error, Error | undefined>>,
//     Expect<Equal<typeof data, any>>,
//   ];
// };

// 2: Inferring Literal Values In Arrays

// type ButtonAttributes = {
//   type: "button" | "submit" | "reset";
// };

// const modifyButtons = (attributes: ButtonAttributes[]) => {};

// const buttonsToChange = [
//   {
//     type: "button",
//   },
//   {
//     type: "submit",
//   },
// ] as const;

// modifyButtons(buttonsToChange);
