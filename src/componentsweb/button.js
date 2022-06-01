let template = document.createElement('template')

template.innerHTML = `
  <div class="container">
    <button class="text">Label</button>
  </div>

  <style>
    .container {
      padding: 8px;
    }

    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;

      width: 100%;
      height: 40px;

      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: red;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
      cursor: pointer;
    }
  </style>
`

class ButtonDefined extends HTMLElement {
  constructor() {
    super()
    let shadowRoot = this.attachShadow( {mode: 'open'} )
    // this.getAttribute
    let cloneContent = template.content.cloneNode(true)
    cloneContent.querySelector('.container>.text').innerText = this.getAttribute('label')
    shadowRoot.appendChild(cloneContent)
  }
}
window.customElements.define('button-defined', ButtonDefined)