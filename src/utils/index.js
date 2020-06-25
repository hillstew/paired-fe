export const fetchData = async body => {
  // Production backend:
  // const url = 'https://paired-be.herokuapp.com/graphql';
  // Staging backend:
  const url = 'https://paired-staging-be.herokuapp.com/graphql';
  // When deployed locally alongside BE for testing or development, use:
  //   const url = 'http://localhost:3001/graphql';
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
