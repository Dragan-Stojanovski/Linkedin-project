export interface IAddUserPostRequest {
    postTitle:string;
    postBody:string;
}

export interface IAddUserPostResponseData {
    _id:string;
    postTitle:string;
    postBody:string;
    userId:string;
}

export interface IAddUserPostResponse {
    data:IAddUserPostResponseData;
}