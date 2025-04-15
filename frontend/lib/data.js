import useSWR from "swr";

const delay =(ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Get = async (url) => {
  await delay(1000)
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch")
    return res.json()
}

export function useSalesReps() {
  const { data, error, isLoading } = useSWR("http://localhost:8000/api/v1/data", Get)
  return { dataSalesReps: data, errorSalesReps: error, isLoadingSalesReps: isLoading }
}