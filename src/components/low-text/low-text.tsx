import { Component, Prop, Host, Element, h } from '@stencil/core'
import { TextSize } from './../../types'

@Component({
  tag: 'low-text',
  styleUrl: 'low-text.css',
  shadow: true,
})
export class LowText {
  @Element() host: HTMLLowTextElement

  /**
   * The font size.
   */
  @Prop() size: TextSize

  private fontSize: number
  private upm: number
  private capHeight: number
  private lineHeight: number
  private letterSpacing: number
  private leadingTrim: number

  /**
   * Gets the line height.
   *
   * @return {number}    The line height.
   */
  private getLineHeight = (): number => {
    const ratio = 1.2 + 1.8 * Math.pow(Math.E, -0.12 * this.fontSize)

    return Math.round((this.fontSize * ratio) / 2) * 2
  }

  /**
   * Gets the letter spacing.
   *
   * @return {number}    The letter spacing.
   */
  private getLetterSpacing = (): number => {
    const ratio = -0.0223 + 0.185 * Math.pow(Math.E, -0.1745 * this.fontSize)

    return Math.round(ratio * 1000) / 1000
  }

  /**
   * Gets the leading trim.
   *
   * @return {number}    The leading trim.
   */
  private getLeadingTrim = (): number => {
    const height = 2 * Math.round(((this.capHeight / this.upm) * this.fontSize) / 2)

    return (this.lineHeight - height) / 2
  }

  componentDidRender() {
    const style = getComputedStyle(this.host)
    const stylesheet = this.host.shadowRoot.styleSheets[0]

    this.fontSize = parseInt(style.fontSize)
    this.upm = parseInt(style.getPropertyValue('--low-text-font-upm'))
    this.capHeight = parseInt(style.getPropertyValue('--low-text-font-cap-height'))
    this.lineHeight = this.getLineHeight()
    this.letterSpacing = this.getLetterSpacing()
    this.leadingTrim = this.getLeadingTrim()

    stylesheet.insertRule(
      `:host {${`
      --low-text-line-height: ${this.lineHeight}px;
      --low-text-letter-spacing: ${this.letterSpacing}em;
      --low-text-leading-trim: ${this.leadingTrim}px;
    `}}`
    )
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    )
  }
}
