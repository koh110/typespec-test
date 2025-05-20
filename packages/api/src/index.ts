import { schema } from 'shared/src/index'

type Response = schema.paths['/widgets']['get']['responses']
async function list(req: Request): Promise<Response[200]['content']['application/json']> {
  return {
    items: []
  }
}
