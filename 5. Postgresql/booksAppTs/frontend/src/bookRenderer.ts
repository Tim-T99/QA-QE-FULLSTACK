export const fetchBooks = async (queryParams: string = "") => {
  try {
    const response = await fetch(`http://localhost:3000/api/books${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();
    console.log('Fetched data:', data);
    return data || []; // Returns the filtered array directly
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};