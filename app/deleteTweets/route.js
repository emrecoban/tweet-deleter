import axios from "axios";

export async function POST(request) {
  const { url, bearer, csrf, id } = await request.json();
  console.log("gelen id:", id);

  const queryId = url.split("/")[6];

  const headersList = {
    Accept: "*/*",
    "X-Csrf-Token": csrf,
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    Referer: "https://twitter.com/",
    "Content-Type": "application/json",
    Authorization: bearer,
  };

  const bodyContent = JSON.stringify({
    variables: { tweet_id: id, dark_request: false },
    queryId: queryId,
  });

  const reqOptions = {
    url: `https://twitter.com/i/api/graphql/${queryId}/DeleteTweet`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
    maxRedirects: 0,
  };

  const response = await axios.request(reqOptions);
  console.log("\n*********************SONUÇ:", response.data);
  return new Response(response.data, {
    status: response.status,
  });
}
