import instance from "../../infra/http";
export async function getUserOwn() {
  const result = await instance.get('/userown')
        return result
}