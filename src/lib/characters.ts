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
        next: string | null;
        prev: string | null;
    };
    results: CharacterInterface[];
}

export const getSearchUrl = (name: string): string =>
    `https://rickandmortyapi.com/api/character?name=${name}`;

export async function getCharacters(url?: string): Promise<APIResponse> {
    const response = await fetch(
        url || 'https://rickandmortyapi.com/api/character'
    );
    let apiResponse: APIResponse;
    if (response.ok) {
        apiResponse = await response.json();
    } else {
        apiResponse = {
            info: {
                count: 0,
                pages: 0,
                next: null,
                prev: null,
            },
            results: [],
        };
    }

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

    return Array.isArray(result) ? result : [result];
}
