const UserList = [
  {
    id: 1,
    name: "John",
    username: "john",
    age: 20,
    nationality: "Canada",

  },
  {
    id: 2,
    name: "Pedro",
    username: "PedroTech",
    age: 20,
    nationality: "Brazil",

  },
  {
    id: 3,
    name: "Sarah",
    username: "cameron",
    age: 25,
    nationality: "United States",
    favouritemovie: [
      {
        id: "2",
        name: "Space Odyssey 3000",
        inTheaters: false,
        year: 2004
      },
      {
        id: "3",
        name: "Love in Paris",
        inTheaters: true,
        year: 2009,
      }
    ],
    friends: [
      {
        id: 4,
        name: "Ahad",
        username: "cameraman",
        age: 18,
        nationality: "Australia",
        friends: [
          {
            id: 3,
            name: "Sarah",
            username: "cameron",
            age: 25,
            nationality: "United States",
          }
        ]
      },
    ]
  },
  {
    id: 4,
    name: "Ahad",
    username: "cameraman",
    age: 18,
    nationality: "Australia",
    friends: [
      {
        id: 3,
        name: "Sarah",
        username: "cameron",
        age: 25,
        nationality: "United States",
      }
    ]
  },
];

const MovieList = [
  {
    id: "1",
    name: "The Lost Kingdom",
    inTheaters: true,
    year: 2006
  },
  {
    id: "2",
    name: "Space Odyssey 3000",
    inTheaters: false,
    year: 2004
  },
  {
    id: "3",
    name: "Love in Paris",
    year: 2009,
    inTheaters: true,
  },
  {
    id: "4",
    name: "Zombie Nightfall",
    inTheaters: false,
    year: 2011
  },
  {
    id: "5",
    name: "The Last Hacker",
    inTheaters: true,
    year: 2019
  },
];


module.exports = { UserList, MovieList };