
export function fullName(data) {
  if (!data) return ''

  const first = data.firstName?.trim() || ''
  const last = data.lastName?.trim() || ''

  return `${first} ${last}`.trim()
}


export function currencyINR(value) {
  if (value == null || isNaN(value)) return '—'

  try {
    return value.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })
  } catch {
    return `₹${value}`
  }
}


export function skillsToString(skills) {
  if (!Array.isArray(skills) || skills.length === 0) return ''

  return skills
    .filter(Boolean)
    .map(s => String(s).trim())
    .join(', ')
}
