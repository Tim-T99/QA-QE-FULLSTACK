export const fetchBooks = async (queryParams: string = "") => {
    try {
      const response = await fetch(`http://localhost:3000/api/booksFilter${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
  
      return await response.json(); // Return the events data
    } catch (error) {
      console.error("Error fetching books:", error);
      return []; // Return empty array if fetch fails
    }
  };