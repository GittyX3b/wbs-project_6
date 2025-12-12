import { type FormOutputType } from "@components/EventForm";

const apiBaseUrl: string = "http://localhost:3001/";

type Event = {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  latitude: number;
  longitude: number;
  organizerId: number;
  createdAt: Date | null;
  updatedAt?: Date | null;
};

type EventsRequest = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  results: Event[];
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

async function fetchUpcomingEvents(): Promise<Event[]> {
  const fetchUrl: string = apiBaseUrl + "api/events/upcoming";

  try {
    const res = await fetch(fetchUrl);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }

    const data: Event[] = await res.json();
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

async function createEventInDB(
  eventData: FormOutputType
): Promise<{ success: boolean }> {
  const requestUrl = apiBaseUrl + "api/events/";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(eventData),
  };

  const response = await fetch(requestUrl, requestOptions);
  const data = await response.json();

  return { success: !!data.id }; // true, wenn Event erstellt
}

async function deleteEventInDB(eventId: number): Promise<{ success: boolean }> {
  const requestUrl = apiBaseUrl + "api/events/" + eventId;
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await fetchData(requestUrl, requestOptions);
}

async function updateEventInDB(
  id: number,
  eventData: FormOutputType
): Promise<{ success: boolean }> {
  const requestUrl = apiBaseUrl + "api/events/" + id;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(eventData),
  };

  return await fetchData(requestUrl, requestOptions);
}

async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }

  return res.json();
}

export {
  apiBaseUrl,
  type Event,
  type EventsRequest,
  createUser,
  fetchEvents,
  fetchUpcomingEvents,
  fetchData,
  createEventInDB,
  updateEventInDB,
  deleteEventInDB,
};
