import { useState, useEffect, useRef, useCallback } from "react"

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const fetchData = useCallback(
    async (fetchUrl = url, fetchOptions) => {
      setLoading(true)
      setError(null)
      abortControllerRef.current = new AbortController()

      try {
        const response = await fetch(fetchUrl, {
          ...(fetchOptions || optionsRef.current),
          signal: abortControllerRef.current.signal,
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    },
    [url]
  )

  useEffect(() => {
    if (url) {
      fetchData()
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [url, fetchData])

  const refetch = (newUrl, newOptions) => {
    fetchData(newUrl, newOptions)
  }

  return { data, loading, error, refetch }
}

export default useFetch
