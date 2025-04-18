import useSWR from "swr";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Get = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

const Post = async (url) => {
  await delay(1000);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export function useSalesReps() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/data`,
    Post,
  );
  return {
    dataSalesReps: data,
    errorSalesReps: error,
  };
}

export async function getSalesRep(id) {
  await delay(1000);
  let isLoading = true;
  let data = null;
  let error = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/data?id=${id}`,
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    data = await res.json();
  } catch (err) {
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      console.error("Connection refused or network unreachable");
      error = { message: "Connection refused or network unreachable" };
    } else {
      error = err;
    }
    console.error("Error fetching sales rep:", error);
  } finally {
    isLoading = false;
  }

  return { data, error, isLoading };
}

export async function postSalesReps(search, filters, sortBy, sortOrder) {
  await delay(1000);
  let isLoading = true;
  let data = null;
  let error = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        search,
        filters: JSON.stringify(filters),
        order_by: sortBy,
        order_type: sortOrder,
      }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    data = await res.json();
  } catch (err) {
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      console.error("Connection refused or network unreachable");
      error = { message: "Connection refused or network unreachable" };
    } else {
      error = err;
    }
    console.error("Error fetching sales rep:", error);
  } finally {
    isLoading = false;
  }

  return { data, error, isLoading };
}

export async function postChatAI(question) {
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
