export function useApi() {
  const baseUrl = 'https://dolarapi.com'

  function get(url) {
    return fetch(`${baseUrl}/v1${url}`).then(res => res.json())
  }

  return {
    get,
  }
}
