export default async () => {
  const body = document.querySelector('body')
  const style = getComputedStyle(body)
  const fontSizeBase = parseInt(style.getPropertyValue('--low-text-font-size-base'))
  const fontSizeRatio = parseFloat(style.getPropertyValue('--low-text-font-size-ratio'))
  const upm = parseInt(style.getPropertyValue('--low-text-font-upm'))
  const capHeight = parseInt(style.getPropertyValue('--low-text-font-cap-height'))
  const scales = []
  /**
   * Gets the line height.
   *
   * @param  {number}    fontSize    The font size
   * @return {number}    The line height.
   */
  const getLineHeight = (fontSize: number): number => {
    const ratio = 1.2 + 1.8 * Math.pow(Math.E, -0.12 * fontSize)

    return Math.round((fontSize * ratio) / 2) * 2
  }

  /**
   * Gets the letter spacing.
   *
   * @param  {number}    fontSize    The font size
   * @return {number}    The letter spacing.
   */
  const getLetterSpacing = (fontSize: number): number => {
    const ratio = -0.0223 + 0.185 * Math.pow(Math.E, -0.1745 * fontSize)

    return Math.round(ratio * 1000) / 1000
  }

  /**
   * Gets the leading trim.
   *
   * @param  {number}    fontSize      The font size
   * @param  {number}    lineHeight    The line height
   * @return {number}    The leading trim.
   */
  const getLeadingTrim = (fontSize: number, lineHeight: number): number => {
    const height = 2 * Math.round(((capHeight / upm) * fontSize) / 2)

    return (lineHeight - height) / 2
  }

  for (let level = -2; level < 7; level++) {
    const sign = level < 0 ? 'minus' : level > 0 ? 'plus' : ''
    const fontSize = Math.round(fontSizeBase * Math.pow(fontSizeRatio, level))
    const lineHeight = getLineHeight(fontSize)
    const letterSpacing = getLetterSpacing(fontSize)
    const leadingTrim = getLeadingTrim(fontSize, lineHeight)

    scales.push({
      name: `${sign}${sign !== '' ? '-' : ''}${Math.abs(level)}`,
      fontSize: fontSize,
      lineHeight: lineHeight,
      letterSpacing: letterSpacing,
      leadingTrim: leadingTrim,
    })
  }

  // document.

  // scales.forEach((scale) => {

  // })
}
