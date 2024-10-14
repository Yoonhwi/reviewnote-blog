import postRequest from "./post";

export async function serverGetPost(id: string) {
  const res = await postRequest.getPost(id);
  return res;
}
