export interface IAddUserPostRequest {
    postTitle:string;
    postBody:string;
}

export interface IAddUserPostResponse {
    postTitle:string;
    postBody:string;
    userId:string;
}