const apiBaseUrl: string = "http://localhost:3001/";

type EventsRequest = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  results: any[];
};

type Events = {
  title: string;
  description: string;
  date: Date;
  location: string | Location;
  latitude?: number;
  longitude?: number;
};

type Location = {
  street: string;
  postalCode: number;
  city: string;
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
 * Add an user to Event API database
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

  return fetch("http://localhost:3001/api/users", requestOptions as RequestInit)
    .then((response) => {
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

type LoginRequest = {
  token: string;
  user: {
    id: number;
    email: string;
  };
};
async function signIn(email: string, password: string): Promise<LoginRequest> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  };

  const res = await fetch(apiBaseUrl + "api/auth/login", requestOptions);

  const data: LoginRequest = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export { apiBaseUrl, createUser, fetchEvents, type EventsRequest, signIn };
