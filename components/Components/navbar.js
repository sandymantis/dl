class AppNavbar extends HTMLElement {
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
          nav {
            background-color: #f75b2c;
            color: white;
            padding: .75rem 2rem;
            font-family: 'Segoe UI', sans-serif;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }
          .left {
            display: flex;
            align-items: center;
            gap: 2rem;
          }
          .logo {
            font-weight: bold;
            font-size: 1.5rem;
          }
          ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            gap: 2rem;
            padding: 0;
            margin: 0;
          }
          li {
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            transition: color 0.2s ease;
          }
          li:hover {
            text-decoration: underline;
            color: #cbd5e1;
          }
          .avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #1f2937;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.9rem;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .avatar:hover {
            background-color: #374151;
          }
        </style>
        <nav>
          <div class="left">
            <div class="logo">Care Management</div>
            <ul>
              <li id="nav-telemedicine">Telemedicine</li>
              <li id="nav-health-profile">Health Profile</li>
              <li id="nav-care-plans">Care Plans</li>
            </ul>
          </div>
          <div class="avatar" title="Logged in user">PR</div>
        </nav>
      `;

      this.shadowRoot.getElementById('nav-telemedicine')?.addEventListener('click', () => this.loadComponent('telemedicine-dashboard'));
      this.shadowRoot.getElementById('nav-health-profile')?.addEventListener('click', () => this.loadComponent('health-profile-dashboard'));
      this.shadowRoot.getElementById('nav-care-plans')?.addEventListener('click', () => this.loadComponent('care-plan-dashboard'));
    }

    loadComponent(tagName) {
      const content = document.getElementById('app-content');
      content.innerHTML = `<${tagName}></${tagName}>`;
    }
  }

  customElements.define('app-navbar', AppNavbar);