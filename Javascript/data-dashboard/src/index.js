const users = [
    {
      id: 1,
      name: "John",
      location: "New York",
      friends: [2, 3, 4],
      posts: [
        { content: "Great day at Central Park!", timestamp: "2025-02-10T12:00:00", likes: 15 },
        { content: "Loving the vibes in NYC!", timestamp: "2025-02-15T08:30:00", likes: 8 },
        { content: "Visited the Statue of Liberty today!", timestamp: "2025-02-05T17:45:00", likes: 20 }
      ]
    },
    {
      id: 2,
      name: "Alice",
      location: "San Francisco",
      friends: [1, 3],
      posts: [
        { content: "Hiking in the Bay Area!", timestamp: "2025-02-12T14:20:00", likes: 12 },
        { content: "Enjoying the sunny weather!", timestamp: "2025-02-14T11:10:00", likes: 6 }
      ]
    },
    {
      id: 3,
      name: "Emily",
      location: "Los Angeles",
      friends: [1, 2, 4],
      posts: [
        { content: "Beach day in LA!", timestamp: "2025-02-08T09:45:00", likes: 25 },
        { content: "Exploring Hollywood!", timestamp: "2025-02-16T16:55:00", likes: 5 }
      ]
    },
    {
      id: 4,
      name: "David",
      location: "Chicago",
      friends: [2],
      posts: [
        { content: "Deep dish pizza is the best!", timestamp: "2025-02-11T10:30:00", likes: 18 },
        { content: "Trying out a new jazz club tonight!", timestamp: "2025-02-13T20:00:00", likes: 3 }
      ]
    },
    {
      id: 5,
      name: "Sarah",
      location: "Seattle",
      friends: [3, 1],
      posts: [
        { content: "Coffee time in the Pacific Northwest!", timestamp: "2025-02-09T15:15:00", likes: 9 },
        { content: "Exploring the Olympic National Park!", timestamp: "2025-02-14T07:00:00", likes: 11 }
      ]
    }
  ];



  const getAverageLikesPerActiveUser = (users) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - (7))
  
    return users
      .filter(user => 
        user.posts.some(post => new Date(post.timestamp) >= oneWeekAgo)
      )
      .map(user => {
        const popularPosts = user.posts.filter(post => post.likes >= 10 && new Date(post.timestamp) >= oneWeekAgo) 
        const totalLikes = popularPosts.reduce((sum, post) => sum + post.likes, 0)
        return popularPosts.length ? totalLikes / popularPosts.length : 0;
      })
      .reduce((total, avgLikes, _, arr) => arr.length ? total + avgLikes / arr.length : 0, 0)
  };
  
  console.log(getAverageLikesPerActiveUser(users));


  