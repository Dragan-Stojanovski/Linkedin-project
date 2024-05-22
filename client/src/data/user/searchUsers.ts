import instance from "../../infra/http";
export interface ISearchUserBody {
    searchTerm:string;
}

/**
 * Searches for users based on the provided search term.
 * 
 * @param body - The search criteria containing the search term.
 * @returns A promise that resolves to the result of the user search.
 */
export async function searchUsers(body:ISearchUserBody) {
    const result = await instance.post('/search', body);
    return result;
}