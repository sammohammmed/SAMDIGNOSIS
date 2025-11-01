import { useCallback, useEffect, useState } from 'react'

interface UseAsyncOptions<T> {
  immediate?: boolean
  transform?: (value: Awaited<T>) => Awaited<T>
}

export function useAsyncData<T>(fn: () => Promise<T>, options?: UseAsyncOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(options?.immediate ?? true)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      setData(options?.transform ? options.transform(result) : result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [fn, options])

  useEffect(() => {
    if (options?.immediate ?? true) {
      execute()
    }
  }, [execute, options?.immediate])

  return { data, loading, error, refetch: execute }
}
