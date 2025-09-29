import { Product, ProductFullData } from '@/@types/product'
import { UserSize } from '@/@types/sizes'

type SizeChartItem = {
  size_code: string
  hip: number
  chest: number
}

// جدول مقاسات افتراضي (سم)
// يمكن تعديله لاحقاً أو جعله قابل للتهيئة من لوحة التحكم
const defaultSizeChart: SizeChartItem[] = [
  { size_code: 'XS', hip: 86, chest: 78 },
  { size_code: 'S', hip: 90, chest: 82 },
  { size_code: 'M', hip: 94, chest: 86 },
  { size_code: 'L', hip: 100, chest: 92 },
  { size_code: 'XL', hip: 106, chest: 98 },
  { size_code: 'XXL', hip: 112, chest: 104 },
]

function toNumber(value: string | number | null | undefined): number | null {
  if (value == null) return null
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  const parsed = parseFloat(String(value).replace(/[^0-9.]/g, ''))
  return Number.isFinite(parsed) ? parsed : null
}

function getAvailableSizeCodes(product: Product | ProductFullData): string[] {
  return (product.sizes ?? [])
    .map((s) => s.size_code)
    .filter((code): code is string => Boolean(code))
}

function pickBestFit(
  chart: SizeChartItem[],
  allowedSizeCodes: Set<string>,
  userHip: number,
  userChest: number,
  maxDiff: number
): string | null {
  let best: { code: string; score: number } | null = null

  for (const item of chart) {
    if (!allowedSizeCodes.has(item.size_code)) continue

    const hipDiff = item.hip - userHip
    const chestDiff = item.chest - userChest

    // لازم المنتج يكون أكبر أو يساوي قياسات المستخدم
    if (hipDiff < 0 || chestDiff < 0) continue

    // لا نتجاوز الحد الأقصى للفرق المسموح
    if (hipDiff > maxDiff || chestDiff > maxDiff) continue

    const score = hipDiff + chestDiff

    if (!best || score < best.score) {
      best = { code: item.size_code, score }
    }
  }

  return best?.code ?? null
}

export type GetFitSizeOptions = {
  maxDiff?: number // الحد الأقصى للفارق بالسنتيمتر لكل قياس (افتراضياً 3 سم)
  sizeChart?: SizeChartItem[] // السماح بتمرير جدول مخصص
}

// ترجع أفضل مقاس متاح في المنتج بناءً على قياسات المستخدم
export function getFitSize(
  product: Product | ProductFullData,
  userSize: UserSize,
  options: GetFitSizeOptions = {}
): string | null {
  const hip = toNumber(userSize.hip_size)
  const chest = toNumber(userSize.chest_size)

  if (hip == null || chest == null) return null

  const maxDiff = options.maxDiff ?? 3
  const chart = options.sizeChart ?? defaultSizeChart
  const allowed = new Set(getAvailableSizeCodes(product))

  return pickBestFit(chart, allowed, hip, chest, maxDiff)
}
