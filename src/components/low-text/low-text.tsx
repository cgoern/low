import { Component, Prop, Host, Element, h } from '@stencil/core'
import { TextSize, TextWeight } from './../../types'

@Component({
  tag: 'low-text',
  styleUrl: 'low-text.css',
  shadow: true,
})
export class LowText {
  @Element() host: HTMLLowTextElement

  /**
   * { item_description }
   */
  @Prop() size: TextSize = '0'

  /**
   * { item_description }
   */
  @Prop() weight: TextWeight = 'soft'

  /**
   * { item_description }
   */
  @Prop() contentBefore: string

  /**
   * { item_description }
   */
  @Prop() contentAfter: string

  render() {
    return (
      <Host class={`${this.size} ${this.weight}`}>
        <span id="content" data-before={this.contentBefore} data-after={this.contentAfter}>
          <slot />
        </span>
      </Host>
    )
  }
}
