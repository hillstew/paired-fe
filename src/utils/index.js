export const fetchData = async body => {
  // const url = 'https://paired-be.herokuapp.com/graphql';
  const url = 'http://localhost:3001/graphql';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
};
