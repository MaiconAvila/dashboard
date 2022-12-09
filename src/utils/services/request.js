export const requestAPI = async (endPointURL, method, body, token) => {
  const hostURL = process.env.REACT_APP_API_KEY + '/';
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (token)
    myHeaders.append("Authorization", "Bearer " + token);

  let requestOptions = {
    method: method,
    headers: myHeaders,
    redirect: 'follow'
  };
  if (body)
    requestOptions.body = body;

  const response = await fetch(
    `${hostURL}${endPointURL}`, requestOptions
  )

  return response;
}