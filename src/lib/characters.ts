export interface CharacterInterface {
  id: number
  name: string
  status: string
  species: string
  image: string
}

interface APIResponse {
  info: {
    count: number
    pages: number
    next: string
    prev: string
  }
  results: CharacterInterface[]
}

const MAIN_URL = 'https://rickandmortyapi.com/api/character'

export async function getCharacters(url?: string): Promise<CharacterInterface[]> {
  const response = await(fetch(url || MAIN_URL))
  const apiResponse:APIResponse = await(response.json())

  return apiResponse.results

}