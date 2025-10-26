import { useState, useEffect } from "react"

const useCurrencyConverter = () => {
  const [usdToIdr, setUsdToIdr] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://api.frankfurter.dev/v1/latest?base=USD"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate")
        }
        const data = await response.json()
        setUsdToIdr(data.rates.IDR)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchExchangeRate()
  }, [])

  const convertToIdr = (usdAmount) => {
    return Math.round(usdAmount * usdToIdr)
  }

  return { usdToIdr, convertToIdr, loading, error }
}

export default useCurrencyConverter
