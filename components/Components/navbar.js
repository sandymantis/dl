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
   const navItems = this.shadowRoot.querySelectorAll('li[id]');

navItems.forEach((item) => {
  const id = item.id; // e.g., "telemedicine"
  const componentTag = `${id}-dashboard`; // → "telemedicine-dashboard"

  item.addEventListener('click', () => this.loadComponent(componentTag));
});

    }

    loadComponent(tagName) {
      const content = document.getElementById('app-content');
      content.innerHTML = `<${tagName}></${tagName}>`;
    }
  }

  customElements.define('app-navbar', AppNavbar);



async render() {
  const response = await fetch('/path/to/navbar.html');
  const navHtml = await response.text();

  this.shadowRoot.innerHTML = `
    <style>
      /* your CSS styles */
    </style>
    ${navHtml}
  `;

  this.setupEventListeners();
}

setupEventListeners() {
  const navItems = this.shadowRoot.querySelectorAll('li[id]');
  navItems.forEach(item => {
    const id = item.id;
    const componentTag = `${id}-dashboard`;
    item.addEventListener('click', () => this.loadComponent(componentTag));
  });
}


import openai

# ✅ System message (from earlier)
system_message = {
    "role": "system",
    "content": """
You are a web developer assistant responsible for updating the navigation bar of a web application based on user requests.

You will be given:
1. A list of components. Each component includes:
   - `id`: the unique identifier of the component (used as the `id` attribute in the navbar <li>).
   - `name`: the display name to show in the navbar.
   - `description`: a brief summary of what the component does (used to infer intent).

2. The current `navbar.html` content (which contains a list of <li> elements in a <ul>).

3. A user request in natural language. The request may include multiple intents such as:
   - Adding one or more new components to the navbar.
   - Removing existing components from the navbar.
   - Updating the position/order of components.
   - Replacing components with others.

Your task is to:
- Analyze the user request.
- Match any mentioned functionalities to components in the provided list using their `name`, `id`, or `description`.
- If matching components are found:
  - Update the `navbar.html` by modifying the <ul> inside the <nav> to reflect the request.
  - Use the matched component's `id` as the `id` attribute in the <li>.
  - Use the component's `name` as the text shown in the <li>.

Rules:
- If a component from the user request does not match any component in the provided list, ignore it.
- If no matches are found at all, return the `navbar.html` unchanged.
- Do not modify anything outside the <ul> in `navbar.html`.
- Ensure the final HTML remains valid.

Your response must include only the updated `navbar.html`, without explanation or extra text.
"""
}

# ✅ Example component list
components = [
    {
        "id": "member-search",
        "name": "Member Search",
        "description": "Component used to look up members etc..."
    },
    {
        "id": "health-profile-dashboard",
        "name": "Health Profile",
        "description": "Shows the patient's full health record"
    },
    {
        "id": "care-plan-dashboard",
        "name": "Care Plans",
        "description": "Used to manage patient care plans"
    }
]

# ✅ Current navbar.html (just the relevant part — the <ul> inside <nav>)
navbar_html = """
<nav>
  <div class="left">
    <div class="logo">Care Management</div>
    <ul>
      <li id="health-profile-dashboard">Health Profile</li>
      <li id="care-plan-dashboard">Care Plans</li>
    </ul>
  </div>
  <div class="avatar" title="Logged in user">PR</div>
</nav>
"""

# ✅ User's natural language request
user_prompt = "Please add functionality to search for members and remove the care plans option."

# ✅ Combine all into one user message
user_message = {
    "role": "user",
    "content": f"""Component List:
{components}

Current navbar.html:
{navbar_html}

User request:
{user_prompt}
"""
}

# ✅ Send to OpenAI
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[system_message, user_message]
)

# ✅ Output
updated_navbar_html = response['choices'][0]['message']['content']
print(updated_navbar_html)

