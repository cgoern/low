const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: var(--low-text-font-family);
      font-feature-settings: var(--low-text-font-feature-settings, normal);
      font-kerning: normal;
      font-optical-sizing: auto;
      font-size: var(--low-text-font-size, var(--low-text-font-size-base));
      font-variation-settings: 'wght' var(--low-text-font-weight, 400);
      letter-spacing: var(--low-text-letter-spacing);
      line-height: var(--low-text-line-height);
      padding-bottom: 1px;
      padding-top: 1px;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: none;
    }

    :host([size='-2']) {
      --low-text-font-size: calc(
        var(--low-text-font-size-base)
          / var(--low-text-font-size-ratio)
          / var(--low-text-font-size-ratio)
      );
    }

    :host([size='-1']) {
      --low-text-font-size: calc(
        var(--low-text-font-size-base)
          / var(--low-text-font-size-ratio)
      );
    }

    :host([size='0']) {
      --low-text-font-size: var(--low-text-font-size-base);
    }

    :host([size='+1']) {
      --low-text-font-size: calc(
        var(--low-text-font-size-base)
          * var(--low-text-font-size-ratio)
      );
    }

    :host([size='+2']) {
      --low-text-font-size: calc(
        var(--low-text-font-size-base)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
      );
    }

    :host([size='+3']) {
      --low-text-font-size: calc(
        var(--low-text-font-size-base)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
      );
    }

    :host([size='+4']) {
      --low-text-font-size: calc(
        var(--low-text-font-size-base)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
      );
    }

    :host([size='+5']) {
      --low-text-font-size: calc(
        var(--low-text-font-size-base)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
      );
    }

    :host([size='+6']) {
      --low-text-font-size: calc(
        var(--low-text-font-size-base)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
          * var(--low-text-font-size-ratio)
      );
    }

    :host::before, :host::after {
      content: '';
      display: block;
      height: 0;
    }

    :host::before {
      margin-top: calc((var(--low-text-leading-trim) + 1px) * -1);
    }

    :host::after {
      margin-bottom: calc((var(--low-text-leading-trim) + 1px) * -1);
    }

    :host([weight='soft']) {
      --low-text-font-weight: var(--low-text-font-weight-soft);
    }

    :host([weight='strong']) {
      --low-text-font-weight: var(--low-text-font-weight-strong);
    }

    :host([weight='heavy']) {
      --low-text-font-weight: var(--low-text-font-weight-heavy);
    }

    ::slotted(a) {
      color: var(--low-text-anchor-color, blue);
      text-decoration: var(--low-text-anchor-text-decoration, underline);
    }

    ::slotted(strong) {
      font-variation-settings: 'wght' var(--low-text-strong-font-weight, 700);
    }
  </style>
  <slot>Text</slot>`

class LowText extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  async connectedCallback() {
    const style = getComputedStyle(this)

    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.fontSize = parseInt(style.fontSize)
    this.upm = parseInt(style.getPropertyValue('--low-text-font-upm'))
    this.capHeight = parseInt(style.getPropertyValue('--low-text-font-cap-height'))
    this.lineHeight = this.getLineHeight()
    this.letterSpacing = this.getLetterSpacing()
    this.leadingTrim = this.getLeadingTrim()

    this.setProperties()
  }

  getLineHeight() {
    const ratio = 1.2 + 1.8 * Math.pow(Math.E, -0.12 * this.fontSize)

    return Math.round((this.fontSize * ratio) / 2) * 2
  }

  getLetterSpacing() {
    const ratio = -0.0223 + 0.185 * Math.pow(Math.E, -0.1745 * this.fontSize)

    return Math.round(ratio * 1000) / 1000
  }

  getLeadingTrim() {
    const height = 2 * Math.round(((this.capHeight / this.upm) * this.fontSize) / 2)

    return (this.lineHeight - height) / 2
  }

  setProperties() {
    const stylesheet = this.shadowRoot.styleSheets[0]
    const styles = `
      --low-text-line-height: ${this.lineHeight}px;
      --low-text-letter-spacing: ${this.letterSpacing}em;
      --low-text-leading-trim: ${this.leadingTrim}px;
    `

    stylesheet.insertRule(`:host {${styles}}`)
  }
}

customElements.define('low-text', LowText)
