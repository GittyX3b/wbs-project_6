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

function createUser(): void;

function regexCheckEmail(input: string): boolean {
  const regex = /@.*\./i;
  return regex.test(input);
}

/**
 * Add a user to Event API database
 * @param email
 * @param password
 * @returns
 */
export function addUser(email: string, password: string): Promise<object> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  /* TODO: Add try...catch and error handling */
  return fetch("http://localhost:3001/api/users", requestOptions as RequestInit)
    .then((response) => {
      // if (!response.ok) {
      //   console.log(response.status);
      //   throw new Error(response.status);
      // }
      return response.json();
    })
    .then((resultData) => {
      // console.log(resultData);
      return resultData;
    })
    .catch((error) => {
      return error;
    });
}

export { apiBaseUrl, createUser, fetchEvents, type EventsRequest };
