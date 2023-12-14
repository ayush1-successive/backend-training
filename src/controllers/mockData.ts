interface IUser {
  userId: number;
  name: string;
  age: number;
  email: string;
  country: string;
}

const userData: IUser[] = [
  {
    userId: 101,
    name: "Alice",
    age: 22,
    email: "alice@email.com",
    country: "USA",
  },
  {
    userId: 102,
    name: "Bob",
    age: 35,
    email: "bob@email.com",
    country: "Canada",
  },
  {
    userId: 103,
    name: "Charlie",
    age: 22,
    email: "charlie@email.com",
    country: "UK",
  },
  {
    userId: 104,
    name: "David",
    age: 40,
    email: "david@email.com",
    country: "Australia",
  },
  {
    userId: 105,
    name: "Emma",
    age: 31,
    email: "emma@email.com",
    country: "Germany",
  },
  {
    userId: 106,
    name: "Frank",
    age: 27,
    email: "frank@email.com",
    country: "France",
  },
  {
    userId: 107,
    name: "Grace",
    age: 33,
    email: "grace@email.com",
    country: "Spain",
  },
  {
    userId: 108,
    name: "Henry",
    age: 29,
    email: "henry@email.com",
    country: "Italy",
  },
  {
    userId: 109,
    name: "Iris",
    age: 36,
    email: "iris@email.com",
    country: "Japan",
  },
  {
    userId: 110,
    name: "Jack",
    age: 25,
    email: "jack@email.com",
    country: "South Korea",
  },
];



export { IUser, userData };
