function formatValue(value: number): string {
  return String(value).padStart(2, '0')
}

export default function convertTime(time: string): string {
  const [hour, minutes] = time.split(':').map(Number)

  const AMOrPM = hour >= 12 ? 'PM' : 'AM'

  const finalHour = hour % 12 || 12

  return `${formatValue(finalHour)}:${formatValue(minutes)} ${AMOrPM}`
}
