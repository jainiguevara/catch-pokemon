const url = 'https://pokeapi.co/api/v2';

export default uri => {
  return fetch(`${url}${uri}`, {
    credentials: 'same-origin',
  })
    .then(response => {
      if (response.status === 404) {
        return 'Not Found'
      }
      return response.json()
    })
}
