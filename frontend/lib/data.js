import useSWR from "swr";

const Get = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export function useSalesReps() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/data`,
    Get,
  );
  return {
    dataSalesReps: data,
  };
}

export function getSalesRep(id) {
  let isLoading = true;
  let data = null;
  let error = null;

  const promise = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/data?id=${id}`,
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    })
    .then((json) => {
      data = json;
    })
    .catch((err) => {
      error = err;
      console.error("Error fetching sales rep:", err);
    })
    .finally(() => {
      isLoading = false;
    });

  return promise.then(() => ({ data, error, isLoading }));
}

export function postChatAI(question) {
  let isLoading = true;
  let data = null;
  let error = null;

  const promise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ai`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      question,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    })
    .then((json) => {
      data = json;
    })
    .catch((err) => {
      error = err;
      console.error("Error fetching sales rep:", err);
    })
    .finally(() => {
      isLoading = false;
    });

  return promise.then(() => ({ data, error, isLoading }));
}
