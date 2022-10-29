import { Component, Prop, State, Host, Event, EventEmitter, Watch, h } from '@stencil/core'
import { TextFieldBehavior } from './../../types'

@Component({
  tag: 'low-text-field',
  styleUrl: 'low-text-field.css',
  shadow: true,
})
export class LowTextField {
  /**
   * { item_description }
   */
  @Prop() fieldType: TextFieldBehavior = 'text'

  /**
   * { item_description }
   */
  @Prop() fieldName: string = 'field'

  /**
   * { item_description }
   */
  @Prop() isRequired: boolean = false

  /**
   * { item_description }
   */
  @Prop() isReadOnly: boolean = false

  /**
   * { item_description }
   */
  @Prop() isDisabled: boolean = false

  /**
   * { item_description }
   */
  @Prop() isClearable: boolean = false

  /**
   * { item_description }
   */
  @Prop({ mutable: true }) fieldValue: string = ''

  /**
   * { item_description }
   */
  @State() isFocused: boolean = false

  /**
   * Emits the changed value.
   */
  @Event() changeFieldValue: EventEmitter

  /**
   * { function_description }
   */
  @Watch('fieldValue')
  watchFieldValue() {
    this.changeFieldValue.emit(this.fieldValue)
  }

  /**
   * { item_description }
   */
  private fieldElement: HTMLInputElement

  /**
   * { function_description }
   */
  private handleFieldInput = (): void => {
    this.fieldValue = this.fieldElement.value
  }

  /**
   * { function_description }
   */
  private handleFieldFocus = (): void => {
    this.isFocused = true
  }

  /**
   * { function_description }
   */
  private handleFieldBlur = (): void => {
    this.isFocused = false
  }

  /**
   * { function_description }
   */
  private handleClearClick = (): void => {
    this.fieldValue = ''
  }

  render() {
    return (
      <Host
        class={{
          'is-required': this.isRequired,
          'is-read-only': this.isReadOnly,
          'is-disabled': this.isDisabled,
          'is-focused': this.isFocused,
        }}
      >
        <label id="label" htmlFor="input">
          <low-text size="-1" contentAfter={this.isRequired ? '*' : ''}>
            <slot />
          </low-text>
        </label>
        <input
          id="field"
          type={this.fieldType}
          value={this.fieldValue}
          name={this.fieldName}
          ref={(field) => (this.fieldElement = field)}
          onInput={this.handleFieldInput}
          onFocus={this.handleFieldFocus}
          onBlur={this.handleFieldBlur}
          required={this.isRequired}
          readOnly={this.isReadOnly}
          disabled={this.isDisabled}
        />
        {this.isClearable && this.fieldValue !== '' && (
          <button onClick={this.handleClearClick}>Clear</button>
        )}
      </Host>
    )
  }
}
