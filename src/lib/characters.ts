export interface CharacterInterface {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    episode: string[];
}

export interface EpisodeInterface {
    id: number;
    name: string;
    episode: string;
}

export interface APIResponse {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: CharacterInterface[];
}

const getUrl = (page?: number): string => {
    let url = 'https://rickandmortyapi.com/api/character';
    if (page) {
        url += `/?page=${page}`;
    }

    return url;
};

export async function getCharacters(page?: number): Promise<APIResponse> {
    const response = await fetch(getUrl(page));
    const apiResponse: APIResponse = await response.json();

    return apiResponse;
}

const getEpisodeIds = (episodeUrls: string[]): string[] => {
    return episodeUrls.map((episodeUrl) => {
        const match = episodeUrl.match(/\d+$/);
        if (match && match.length > 0) {
            return match[0];
        }
        return '';
    });
};

export async function getEpisodes(
    episodeUrls: string[]
): Promise<EpisodeInterface[]> {
    const episodesInfoResponse = await fetch(
        `https://rickandmortyapi.com/api/episode/${getEpisodeIds(
            episodeUrls
        ).join(',')}`
    );

    const result = await episodesInfoResponse.json();

    return Array.isArray(result) ? result : [result]
}
