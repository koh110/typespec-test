export * as schema from './generated/schema.js'
import { paths } from './generated/schema.js'


export function createFetchOptions<T extends keyof paths, K extends keyof paths[T]>(path: T, method: K) {
  type Options = paths[T][K]

  return (options: {
    parameters: Options extends { parameters: infer P } ? P : null;
    requestBody: Options extends { requestBody: infer R } ? R : null;
  }) => {
    return options
  }
}


async function fetchWidgets({ token }: { token: string }) {
  const path = '/widgets'
  const method = 'get'
  const init = createFetchOptions(path, method)({
    parameters: {
      header: {
        authorization: `Bearer ${token}`,
      }
    },
    requestBody: undefined
  })

  const res = await fetch(path, {
    method,
    headers: {
      ...init.parameters.header,
      'Content-Type': 'application/json',
    }
  })

  type Response = paths[typeof path][typeof method]['responses']
  if (res.status === 200) {
    const data = await res.json() as Response[200]['content']['application/json']
    return data
  } else {
    return 
  }
}
