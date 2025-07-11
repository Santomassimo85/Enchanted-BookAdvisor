const OPENLIBRARY_WORKS_URL = "https://openlibrary.org/works";

/**
 * Fetches detailed book info from OpenLibrary based on work ID.
 * @param {string} workId - The OpenLibrary work ID (e.g. OL12345W)
 * @returns {Promise<{title: string, description: string, coverUrl: string}>}
 */
/**
 * Fetches book details from the OpenLibrary API for a given work ID.
 *
 * @async
 * @function fetchOpenLibraryDetails
 * @param {string} workId - The OpenLibrary work ID of the book to fetch.
 * @returns {Promise<Object>} An object containing the book's title, description, and cover URL.
 * @property {string} title - The title of the book, or "Untitled" if not available.
 * @property {string} description - The description of the book, or "No description available." if not present.
 * @property {string|null} coverUrl - The URL of the book's cover image, or null if not available.
 *
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * const details = await fetchOpenLibraryDetails('OL12345W');
 * console.log(details.title); // Outputs the book title
 */
export async function fetchOpenLibraryDetails(workId) {
  try {
    const res = await fetch(`https://openlibrary.org/works/${workId}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const description =
      typeof data.description === "object" ? data.description.value :
      typeof data.description === "string" ? data.description :
      "No description available.";

    const title = data.title ?? "Untitled";
    const coverUrl = data.covers?.[0]
      ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
      : null;

    return {
      title,
      description,
      coverUrl,
    };
  } catch (error) {
    console.error("Error fetching book details:", error);
    return {
      title: "Unknown Title",
      description: "No description available.",
      coverUrl: null,
    };
  }
}


