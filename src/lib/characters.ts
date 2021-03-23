export interface CharacterInterface {
  id: number
  name: string
  status: string
  species: string
  image: string
}

export interface APIResponse {
  info: {
    count: number
    pages: number
    next: string
    prev: string
  }
  results: CharacterInterface[]
}

const getUrl = (page?:number):string => {
  let url = 'https://rickandmortyapi.com/api/character'
  if (page) {
    url += `/?page=${page}`
  }

  return url;
} 

export async function getCharacters(page?:number): Promise<APIResponse> {
  const response = await(fetch(getUrl(page)))
  const apiResponse:APIResponse = await(response.json())

  return apiResponse

}