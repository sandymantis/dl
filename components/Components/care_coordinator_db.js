
class CareCoordinatorDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
           font-family: Arial, sans-serif;
          display: block;
          height: 100vh;
          background-color: #f3f2f1;
          margin: 0;
        }

        h1 {
          margin: 0;
          padding: 10px;
          font-size: 24px;
          background-color: #ffffff;
          border-bottom: 1px solid #ddd;
        }

        .dashboard {
          display: flex;
          gap: 16px;
          padding: 20px;
          height: calc(100% - 72px);
          box-sizing: border-box;
        }

        .panel {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .panel-header {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
          border-bottom: 1px solid #e1e1e1;
          padding-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .panel-header::after {
          content: "\u2807";
          font-size: 20px;
          color: #666;
          cursor: pointer;
          margin-left: auto;
        }

        .scrollable {
          overflow-y: auto;
          flex: 1;
        }

        .activity, .appointment, .contact {
          background-color: #fafafa;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 10px;
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 1.5;
          position: relative;
        }

        .activity::after, .appointment::after, .contact::after {
          content: "\u2807";
          font-size: 16px;
          color: #888;
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }

        .appointment .join-button {
          margin-top: 10px;
          padding: 6px 12px;
          background-color: #e1e1e1;
          border: none;
          border-radius: 4px;
          color: #666;
          font-size: 13px;
          cursor: not-allowed;
        }

        .patient-name {
          color: #0078d4;
          font-weight: 500;
          cursor: pointer;
        }

        .contact {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          background-color: #764abc;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          flex-shrink: 0;
        }
      </style>

      <h1>Care Coordinator Dashboard</h1>
      <div class="dashboard">
        <!-- Activities Panel -->
        <div class="panel">
          <div class="panel-header">All Activities</div>
          <div class="scrollable">
            <div class="activity">A1 - Scheduled</div>
            <div class="activity">Activity-test - In Progress - Care Plan Dan</div>
            <div class="activity">Care Plan Activity - Amber Rodriguez - Completed</div>
            <div class="activity">Care Plan Activity - Amber Rodriguez - Scheduled</div>
            <div class="activity">Care Plan Activity - Amber Rodriguez - Completed</div>
            <div class="activity">Care Plan Activity - Amber Rodriguez - Not Started</div>
            <div class="activity">Care Plan Activity - Amber Rodriguez - Unknown</div>
          </div>
        </div>

        <!-- Appointments Panel -->
        <div class="panel">
          <div class="panel-header">Scheduled Virtual Appointments</div>
          <div class="scrollable">
            ${this.getAppointments().map(app => `
              <div class="appointment">
                <div><strong>Patient Name:</strong> <span class="patient-name">${app.patient}</span></div>
                <div><strong>Practitioner:</strong> ${app.practitioner}</div>
                <div><strong>Status:</strong> ${app.status}</div>
                <div><strong>Subject:</strong> ${app.subject}</div>
                <button class="join-button" disabled>Join Meeting</button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Contacts Panel -->
        <div class="panel">
          <div class="panel-header">All Open Appointments</div>
          <div class="scrollable">
            ${this.getContacts().map(contact => `
              <div class="contact">
                <div class="avatar">${contact.initials}</div>
                <div>${contact.name}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  getAppointments() {
    return [
      {
        patient: 'Casey Jensen',
        practitioner: 'Alex Johnson',
        status: 'No Show',
        subject: 'Virtual Appointment'
      },
      {
        patient: 'Eric Stuppard',
        practitioner: 'Alex Johnson',
        status: 'No Show',
        subject: 'Virtual Appointment'
      },
      {
        patient: 'Casey Jensen',
        practitioner: 'Alex Johnson',
        status: 'Fulfilled',
        subject: 'Casey Jensen - ONCOLOGY'
      }
    ];
  }

  getContacts() {
    return [
      { name: 'Care Manager', initials: 'CM' },
      { name: 'Cole117', initials: 'CO' },
      { name: 'Amber Rodriguez', initials: 'AR' },
      { name: 'Amber Rodriguez', initials: 'AR' },
      { name: 'Amber Rodriguez', initials: 'AR' },
      { name: 'Temp User', initials: 'TU' },
    ];
  }
}

customElements.define('care-coordinator-dashboard', CareCoordinatorDashboard);
