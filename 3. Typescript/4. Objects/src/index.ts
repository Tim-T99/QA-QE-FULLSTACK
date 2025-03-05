//              Extending Objects
// 1: Create an Intersection Type
// type BaseEntity = {
//     id: string;
//     createdAt: Date;
//   }

// type User = {
//     name: string;
//     email: string;
//   }& BaseEntity;
  
//   type Product = {
//     name: string;
//     price: number;
//   }& BaseEntity;

//   2: Extending Interfaces
interface BaseEntity {
    id: string;
    createdAt: Date;
  }

interface User extends BaseEntity {
    name: string;
    email: string;
  }

interface Product extends BaseEntity  {
        name: string;
        price: number;
      };

//          Dynamic Object Keys
// 1: Use an Index Signature for Dynamic Keys
// const scores:{[index:string]: number} = {};

// scores.math = 95;

// scores.english = 90;

// scores.science = 85;

// 2: Default Properties with Dynamic Keys

interface Scores {}


const scores: Scores & {[index:string]: number} = {
  math: 95,
  english: 90,
};

scores.athletics = 100;

scores.french = 75;

scores.spanish = 70;

// 3: Restricting Object Keys With Records
type Environment = "development" | "production" | "staging";

type Configurations = Record<
Environment,
{
  apiBaseUrl: string;
  timeout: number;
}
>;;

const configurations: Configurations = {
  development: {
    apiBaseUrl: "http://localhost:8080",
    timeout: 5000,
  },
  production: {
    apiBaseUrl: "https://api.example.com",
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
  // @ts-expect-error

  notAllowed: {
    apiBaseUrl: "https://staging.example.com",
    timeout: 8000,
  },
};

// 4: Dynamic Key Support
const hasKey = (obj: object, key: PropertyKey) => {
    return obj.hasOwnProperty(key);
  };


//              Reducing Duplication with Utility Types
// // 1: Expecting Certain Properties
// interface User {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//   }
  
//   const fetchUser = async (): Promise<Pick<User, "name" |"email">> => {
//     const response = await fetch("/api/user");
//     const user = await response.json();
//     return user;
//   };
  
//   const example = async () => {
//     const user = await fetchUser();
  
//     // type test = Expect<Equal<typeof user, { name: string; email: string }>>;
  
//   };

//   // 2: Updating a Product
//   interface Product {
//     id: number;
//     name: string;
//     price: number;
//     description: string;
//   }
  
//   const updateProduct = (id: number, productInfo: Partial<Omit<Product, "id">>) => {
//     // Do something with the productInfo
//   };

//   updateProduct(1, {
//      name: "Book",
//     });
    
//     updateProduct(1, {
    
//       price: 12.99,
//     });