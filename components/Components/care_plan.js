class CarePlan extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .care-plan-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
          }
          .header, .meta, .tabs, .task-table, .add-task {
            margin-bottom: 20px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .meta {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
          }
          .tabs button {
            padding: 10px 15px;
            margin-right: 10px;
            background-color: #e0e0e0;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .tabs button.active {
            background-color: #7f56d9;
            color: white;
          }
          .task-table table {
            width: 100%;
            border-collapse: collapse;
          }
          .task-table th, .task-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          .task-table th {
            background-color: #f0f0f0;
          }
          .add-task a {
            color: #007bff;
            cursor: pointer;
            text-decoration: none;
          }
          .filters label {
            margin-right: 15px;
          }
        </style>
        <div class="care-plan-container">
          <div class="header">
            <h2>Care Plan for Diabetes and Senior Health</h2>
            <button>New Care Plan</button>
          </div>

          <div class="meta">
            <div><strong>Case Number:</strong> 00001052</div>
            <div><strong>Status:</strong> New</div>
            <div><strong>Owner:</strong> Harryette Randall</div>
            <div><strong>Last Modified Date:</strong> May 10, 2022, 11:31:39 AM</div>
            <div><strong>Created Date:</strong> May 10, 2022, 11:31:39 AM</div>
          </div>

          <div class="tabs">
            <button class="active">Tasks</button>
            <button>Care Team</button>
            <button>Goals</button>
          </div>

          <div class="filters">
            <label>Group by:
              <select>
                <option>Problem & Goal</option>
              </select>
            </label>
            <label>Status:
              <select>
                <option>Open</option>
                <option>Closed</option>
              </select>
            </label>
          </div>

          <div class="task-table">
            <h3>Tasks Without Any Problems or Goals</h3>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>External</th>
                  <th>Task Owner</th>
                  <th>Closed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Blood Sugar Check</td>
                  <td>May 14, 2022</td>
                  <td>Normal</td>
                  <td>Not Started</td>
                  <td>false</td>
                  <td>April Guth...</td>
                  <td>false</td>
                </tr>
                <tr>
                  <td>Exercise: Daily Morning Walk</td>
                  <td>May 14, 2022</td>
                  <td>Normal</td>
                  <td>Not Started</td>
                  <td>false</td>
                  <td>April Guth...</td>
                  <td>false</td>
                </tr>
                <tr>
                  <td>Reminders to take medicine</td>
                  <td>May 14, 2022</td>
                  <td>Normal</td>
                  <td>Not Started</td>
                  <td>false</td>
                  <td>April Guth...</td>
                  <td>false</td>
                </tr>
                <tr>
                  <td>Dietary Changes</td>
                  <td>May 14, 2022</td>
                  <td>Normal</td>
                  <td>Not Started</td>
                  <td>false</td>
                  <td>April Guth...</td>
                  <td>false</td>
                </tr>
                <tr>
                  <td>Weekly check-ups with the primary care physician</td>
                  <td>May 14, 2022</td>
                  <td>Normal</td>
                  <td>Not Started</td>
                  <td>false</td>
                  <td>April Guth...</td>
                  <td>false</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="add-task">
            <a href="#">+ Add new task</a>
          </div>
        </div>
      `;
    }
  }

  customElements.define('care-plan', CarePlan);