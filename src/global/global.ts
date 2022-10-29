export default async () => {
  const body: HTMLBodyElement = document.querySelector('body')
  const head: HTMLHeadElement = document.querySelector('head')
  const style: CSSStyleDeclaration = getComputedStyle(body)
  const fontSizeBase: number = parseInt(style.getPropertyValue('--low-text-font-size-base'))
  const fontSizeRatio: number = parseFloat(style.getPropertyValue('--low-text-font-size-ratio'))
  const fontUpm: number = parseInt(style.getPropertyValue('--low-text-font-fontUpm'))
  const fontCapHeight: number = parseInt(style.getPropertyValue('--low-text-font-cap-height'))

  let stylesheet: HTMLStyleElement = document.createElement('style')
  let fontScales: {
    name: string
    fontSize: number
    lineHeight: number
    letterSpacing: Number
    leadingTrim: number
  }[] = []

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
    const textHeight = 2 * Math.round(((fontCapHeight / fontUpm) * fontSize) / 2)

    return (lineHeight - textHeight) / 2
  }

  for (let level = -2; level < 7; level++) {
    const levelSign = level < 0 ? 'minus' : level > 0 ? 'plus' : ''
    const fontSize = Math.round(fontSizeBase * Math.pow(fontSizeRatio, level))
    const lineHeight = getLineHeight(fontSize)
    const letterSpacing = getLetterSpacing(fontSize)
    const leadingTrim = getLeadingTrim(fontSize, lineHeight)

    fontScales.push({
      name: `${levelSign}${levelSign !== '' ? '-' : ''}${Math.abs(level)}`,
      fontSize: fontSize,
      lineHeight: lineHeight,
      letterSpacing: letterSpacing,
      leadingTrim: leadingTrim,
    })
  }

  stylesheet.textContent = `:root {
      ${fontScales
        .map(
          (scale) => `
        --low-text-font-size-${scale.name}: ${scale.fontSize}px;
        --low-text-line-height-${scale.name}: ${scale.lineHeight}px;
        --low-text-letter-spacing-${scale.name}: ${scale.letterSpacing}em;
        --low-text-leading-trim-${scale.name}: ${scale.leadingTrim}px;
      `
        )
        .join('')}
    }`

  stylesheet.setAttribute('data-low-styles', '')
  head.appendChild(stylesheet)
}
