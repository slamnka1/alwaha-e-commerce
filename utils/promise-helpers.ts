/**
 * Utility functions for handling Promise.allSettled with proper error handling
 *
 * @example
 * ```typescript
 * // Group multiple API calls to run in parallel
 * const [result1, result2, result3] = await Promise.allSettled([
 *   apiCall1(),
 *   apiCall2(),
 *   apiCall3()
 * ])
 *
 * // Extract data with fallbacks
 * const data1 = safeExtract(result1, defaultValue1)
 * const data2 = safeExtractNested(result2, (response) => response.data.items, [])
 * const data3 = safeExtract(result3, null)
 *
 * // Log errors for debugging
 * if (result1.status === 'rejected') {
 *   console.error('Failed to fetch data1:', result1.reason)
 * }
 * ```
 */

/**
 * Creates a fallback function for translations
 * @returns Function that returns the key as fallback
 */
export function createTranslationFallback() {
  return (key: string) => key
}

/**
 * Helper function to safely extract data from API responses
 * @param result Promise.allSettled result
 * @param fallback Fallback value if promise was rejected
 * @returns Extracted data or fallback
 */
export function safeExtract<T>(
  result: PromiseSettledResult<T>,
  fallback: T
): T {
  return result.status === 'fulfilled' ? result.value : fallback
}

/**
 * Helper function to safely extract nested data from API responses
 * @param result Promise.allSettled result
 * @param extractor Function to extract data from the response
 * @param fallback Fallback value if promise was rejected
 * @returns Extracted data or fallback
 */
export function safeExtractNested<T, R>(
  result: PromiseSettledResult<T>,
  extractor: (value: T) => R,
  fallback: R
): R {
  return result.status === 'fulfilled' ? extractor(result.value) : fallback
}
