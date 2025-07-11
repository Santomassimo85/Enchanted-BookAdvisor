const OPENLIBRARY_WORKS_URL = "https://openlibrary.org/works";

/**
 * Fetches detailed book info from OpenLibrary based on work ID.
 * @param {string} workId - The OpenLibrary work ID (e.g. OL12345W)
 * @returns {Promise<{title: string, description: string, coverUrl: string}>}
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


