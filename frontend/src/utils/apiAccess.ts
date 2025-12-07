const API_URL = "http://localhost:3001";

export function createUser(email: string, password: string): object {
  return { email: email, password: password };
}

// const options = {
//   method: "POST",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${accessTokenAuth}`,
//   },
// };

function regexCheckEmail(input: string): boolean {
  const regex = /@.*\./i;
  return regex.test(input);
}

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

  return fetch("http://localhost:3001/api/users", requestOptions)
    .then((response) => {
      // if (!response.ok) {
      //   console.log(response.body);
      //   throw new Error("Request Error");
      // }
      return response.json();
    })
    .then((resultData) => {
      console.log(resultData);
      return resultData;
    })
    .catch((error) => {
      return error;
    });
}
