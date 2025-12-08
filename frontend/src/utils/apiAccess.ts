const apiBaseUrl: string = "http://localhost:3001/";

type EventsRequest = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  results: any[];
};

async function fetchEvents(
  page: number,
  limit: number
): Promise<EventsRequest> {
  const fetchUrl: string =
    apiBaseUrl + "api/events?page=" + page + "&limit=" + limit;

  try {
    const res = await fetch(fetchUrl);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }

    const data: EventsRequest = await res.json();
    return data;
  } catch (error) {
    console.error("fetchEvents Error:", error);
    throw error;
  }
}

function createUser(email: string, password: string): object {
  return { email: email, password: password };
}

export { apiBaseUrl, createUser, fetchEvents, type EventsRequest };
