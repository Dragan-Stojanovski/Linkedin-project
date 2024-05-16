import instance from "../../infra/http";
export interface ISearchUserBody {
    searchTerm:string;
}

export async function searchUsers(body:ISearchUserBody) {
    const result = await instance.post('/search', body);
    return result;
}