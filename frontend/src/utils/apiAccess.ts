export function createUser(email: string, password: string): object {
  return { email: email, password: password };
}

const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessTokenAuth}`,
  },
};

function regexCheckEmail(input: string): boolean {
  const regex = /@.*\./i;
  return regex.test(input);
}
