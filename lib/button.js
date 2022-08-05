const template = document.createElement('template')

template.innerHTML = `
  <style>
  	:host {
  		display: block;
  	}

  	:host([theme="main"]) {
			--low-button-container-background: red;
		}

		:host([theme="accent"]) {
			--low-button-container-background: green;
		}

  	#container {
  		background: var(--low-button-container-background);
  		color: white;
  		font-size: 16px;
  	}
  </style>
  <div id="container">
  	<slot>Button</slot>
  </div>`

class LowButton extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.clickEvent = new CustomEvent('lowButtonClick', {
			bubbles: true,
			cancelable: false,
		})
	}

	connectedCallback() {
		this.shadowRoot.appendChild(template.content.cloneNode(true))
		this.onclick = () => this.handleClick()
	}

	handleClick() {
		this.dispatchEvent(this.clickEvent)
	}
}

customElements.define('low-button', LowButton)
