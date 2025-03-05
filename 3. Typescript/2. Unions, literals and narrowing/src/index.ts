//        Unions and Literals
// 1. string or null
// function getUsername(username: string | null) {
//     if (username !== null) {
//       return `User: ${username}`
//     } else {
//       return 'Guest'
//     }
//   }

//   const result = getUsername('Alice')

// type test = Expect<Equal<typeof result, string>>

// const result2 = getUsername(null)

// type test2 = Expect<Equal<typeof result2, string>>

// 2. Restricting Function Parameters
// // function move(direction: "up" | "down"| "left"| "right", distance: number) {
// //     // Move the specified distance in the given direction
// //   }
// //   move('up', 10)
// //   move('left', 5)

// //         Narrowing
// // 1. Narrowing with if Statements
// function validateUsername(username: string | null): boolean {
//     if(username !== "string"){
//         return false
//     }
//     return username.length > 5

//   }

//  console.log(validateUsername('Matt1234'))

// //2. Throwing Errors to Narrow
// const appElement = document.getElementById('app')
// if (!appElement) {
//     throw new Error("Does not return true");

// }

// 3. Using in to Narrow
// type APIResponse =
//   | {
//       data: {
//         id: string
//       }
//     }
//   | {
//       error: string
//     }

// const handleResponse = (response: APIResponse) => {
// How do we check if 'data' is in the response?

//   if ('data' in response) {
//     return response.data.id
//   } else {
//     throw new Error(response.error)
//   }
// }

//          Unknown and never
// 1. Narrowing Errors with instanceof
// const somethingDangerous = (): string => {
//   if (Math.random() > 0.5) {
//     throw new Error("Something went wrong");
//   }

//   return "all good";
// };

// try {
//   somethingDangerous();
// } catch (error) {
//   if (error instanceof Error) {
//     console.error(error.message);
//   } else {
//     throw new Error("This is not an error");
//   }
// }

// 2. Narrowing unknown to a Value
// const parseValue = (value: unknown): string => {
//   if (
//     typeof value === "object" &&
//     value !== null &&
//     "data" in value &&
//     typeof value.data === "object" &&
//     value.data !== null &&
//     "id" in value.data &&
//     typeof value.data.id === "string"
//   ) {
//     return value.data.id;
//   }
//   throw new Error("Parsing error!");
// };

//   3. Reusable Type Guards

const hasDataId = (value: unknown): value is {data: {id:string}} => {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    typeof value.data === "object" &&
    value.data !== null &&
    "id" in value.data &&
    typeof value.data.id === "string"
  );
};

const parseValueAgain = (value: unknown): string => {
  if (hasDataId(value)) {
    return value.data.id;
  }

  throw new Error("Parsing error!");
};

//        4. Discriminated Unions
// 1. Destructuring a Discriminated Union
type Circle = {
  kind?: 'circle'
  radius: number
}

type Square = {
  kind: 'square'
  sideLength: number
}

type Shape = Circle | Square

// function calculateArea(shape: Shape):number { 
//     if (shape.kind === 'circle') {
//       return Math.PI * shape.radius * shape.radius
//     } else {
//       return shape.sideLength * shape.sideLength
//     }
//   }

  // 2: Narrowing a Discriminated Union with a Switch Statement
  // function calculateArea(shape: Shape) {
  //   switch (shape.kind) {
  //     case 'circle':
  //       return Math.PI * shape.radius * shape.radius
  //     case 'square':
  //       return shape.sideLength * shape.sideLength
  //   }
  // }

  // 3: Discriminated Tuples
  type User ={id:string; name:string; email:string}
  type APIResponse = ['error', string] | ['success', User[]]

  async function fetchData(): Promise<APIResponse> {
    try {
      const response = await fetch('https://api.example.com/data')
  
      if (!response.ok) {
        return [
          'error',
          // Imagine some improved error handling here
          'An error occurred',
        ]
      }
  
      const data: User[] = await response.json()
  
      return ['success', data]
    } catch (error) {
      return ['error', 'An error occurred']
    }
  }

  // 4: Handling Defaults with a Discriminated Union
  function calculateArea(shape: Shape) {
    if (shape.kind === 'square') {
      return shape.sideLength * shape.sideLength
    } else {
      return Math.PI * shape.radius * shape.radius
    }
  }

