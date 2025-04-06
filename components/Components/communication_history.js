class CommunicationDashboard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.patient = this.getPatients()[0];
      this.communications = this.getCommunications();
      this.expandedRows = new Set();
    }

    connectedCallback() {
      this.render();
      this.initEvents();
    }

    render() {
      const { name, age, gender, dob, diagnosis, subDiagnosis, acuity, email, phone } = this.patient;

      this.shadowRoot.innerHTML = `
        <style>
        
          @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");
          :host {
            font-family: 'Segoe UI', sans-serif;
            display: block;
            background-color: #f2f4f7;
            color: #1a1a1a;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 30px;
          }
          .patient-header {
            background: white;
            padding: 24px 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .header-row {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .header-name {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            color: #333;
          }
          .header-info {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            font-size: 14px;
            color: #555;
          }
          .label {
            background: #eef0f3;
            border-radius: 6px;
            padding: 4px 10px;
            font-size: 13px;
            margin-right: 8px;
            display: inline-block;
            color: #444;
          }
          .acuity-H { background-color: #ffe5e5; color: #b00020; }
          .acuity-M { background-color: #fff5db; color: #c77700; }
          .acuity-L { background-color: #e2fbe4; color: #007e33; }
          .tags {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          .actions {
            display: flex;
            gap: 12px;
            margin-top: 10px;
          }
          .action-btn {
            padding: 8px 14px;
            border-radius: 6px;
            border: none;
            background: #7f56d9;
            color: white;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: background 0.3s;
          }
          .action-btn:hover {
            background: #6841c6;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            overflow: hidden;
            margin-bottom: 20px;
          }
          th, td {
            padding: 16px 20px;
            text-align: left;
            border-bottom: 1px solid #f0f0f0;
            vertical-align: top;
          }
          th {
            background-color: #fafbfc;
            font-weight: 600;
            color: #555;
          }
          .modality {
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .modality i {
            color: #555;
          }
          .status {
            font-size: 13px;
            color: #666;
          }
          .content-box {
            padding: 12px 20px;
            background: #fcfcfc;
            border-left: 4px solid #7f56d9;
            border-radius: 0 0 6px 6px;
          }
          .chat-message {
            margin: 10px 0;
            display: flex;
            justify-content: flex-start;
            gap: 10px;
          }
          .chat-message.agent {
            justify-content: flex-end;
          }
          .chat-bubble {
            padding: 10px 14px;
            background: #eee;
            border-radius: 10px;
            max-width: 70%;
          }
          .chat-message.agent .chat-bubble {
            background: #d0e7ff;
          }
        </style>

        <div style="background: white; padding: 20px 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); margin-bottom: 20px;">
<h2 style="font-size: 22px; font-weight: 600; color: #333; margin: 0;">Patient Communication History</h2>
</div>

          <div class="patient-header">
            <div class="header-row">
              <h2 class="header-name">${name}</h2>
              <div class="header-info">
                <div>${age}y, ${gender}</div>
                <div>DOB: ${dob}</div>
              </div>
              <div class="header-info">
                <div>Email: ${email}</div>
                <div>Phone: ${phone}</div>
              </div>
            </div>
            <div class="tags">
              <span class="label">${diagnosis}</span>
              <span class="label">${subDiagnosis}</span>
              <span class="label acuity-${acuity}">${acuity}</span>
            </div>
            <div class="actions">
              <button class="action-btn"><i class="fas fa-envelope"></i> New Email</button>
              <button class="action-btn"><i class="fas fa-comment-dots"></i> New SMS</button>
              <button class="action-btn"><i class="fas fa-comments"></i> Start Chat</button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reason</th>
                <th>Modality</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${this.communications.map((entry, index) => `
                <tr class="entry-row" data-index="${index}" style="cursor:pointer">
                  <td>${entry.date}</td>
                  <td>${entry.reason}</td>
                  <td class="modality">
                    ${entry.modality === 'Email' ? '<i class="fas fa-envelope"></i>' : ''}
                    ${entry.modality === 'SMS' ? '<i class="fas fa-comment-dots"></i>' : ''}
                    ${entry.modality === 'Chat' ? '<i class="fas fa-comments"></i>' : ''}
                    <span>${entry.modality}</span>
                  </td>
                  <td class="status">${entry.status}</td>
                </tr>
                <tr class="content-row" id="detail-${index}" style="display: none;">
                  <td colspan="4">
                    <div class="content-box">
                      ${entry.modality === 'Chat' ? entry.thread.map(msg => `
                        <div class="chat-message ${msg.sender === 'agent' ? 'agent' : ''}">
                          <div class="chat-bubble">${msg.text}</div>
                        </div>
                      `).join('') : entry.content}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    initEvents() {
      const rows = this.shadowRoot.querySelectorAll('.entry-row');

      rows.forEach(row => {
        row.addEventListener('click', () => {
          const index = row.getAttribute('data-index');
          const detailRow = this.shadowRoot.getElementById(`detail-${index}`);
          const isVisible = detailRow.style.display === 'table-row';
          detailRow.style.display = isVisible ? 'none' : 'table-row';
        });
      });
    }

    getPatients() {
      return [
        {
          name: 'Emily Adams', dob: '02/20/1992', age: 32, gender: 'Female', diagnosis: 'Diabetes', subDiagnosis: 'Medication', acuity: 'M', email: 'emilya@example.com', phone: '+1 (555) 222-3344'
        }
      ];
    }

    getCommunications() {
      return [
        { date: '2024-03-15', reason: 'Medication Refill Reminder', modality: 'Email', status: 'Sent', content: 'Hi Emily, just a reminder to refill your medication by Friday.' },
        { date: '2024-03-10', reason: 'Blood Sugar Log Check-In', modality: 'Chat', status: 'Viewed', thread: [
          { sender: 'patient', text: 'Hi! My readings are uploaded.' },
          { sender: 'agent', text: 'Thanks, I’ll review them shortly.' },
          { sender: 'patient', text: 'Okay, let me know if you need anything else.' }
        ]},
        { date: '2024-02-27', reason: 'Follow-up Appointment', modality: 'SMS', status: 'Sent', content: 'Reminder: Your follow-up appointment is on March 1st at 2:00 PM.' },
        { date: '2024-02-20', reason: 'Annual Wellness Reminder', modality: 'Email', status: 'Opened', content: 'Hi Emily, time for your annual wellness check. Please schedule online.' }
      ];
    }
  }

  customElements.define('communication-dashboard', CommunicationDashboard);