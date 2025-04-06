

  class AppFooter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          footer {
            text-align: center;
            padding: 20px;
            background-color: #f3f4f6;
            color: #4b5563;
            font-family: 'Segoe UI', sans-serif;
            font-size: 0.95rem;
          }
        </style>
        <footer>
          Powered by <strong>Fusion AI</strong>, a homegrown agentic framework for Vibe Coding.
        </footer>
      `;
    }
  }

  customElements.define('app-footer', AppFooter);

