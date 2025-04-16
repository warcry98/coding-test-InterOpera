import useSWR from "swr";

const Get = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export function useSalesReps() {
  const { data } = useSWR("http://localhost:8000/api/v1/data", Get);
  return {
    dataSalesReps: data,
  };
}

export function getSalesRep(id) {
  let isLoading = true;
  let data = null;
  let error = null;

  const promise = fetch(`http://localhost:8000/api/v1/data?id=${id}`)
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
