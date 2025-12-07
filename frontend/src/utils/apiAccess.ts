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

export function addUser(email: string, password: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append(
  //   "Authorization",
  //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzY0OTM4MTAzLCJleHAiOjE3Njg1MzgxMDN9.lX1ksrrMX1hizpKAwT0jgXKoAS9uYxQABnV4VLFVwr0"
  // );

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

  fetch("http://localhost:3001/api/users", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
