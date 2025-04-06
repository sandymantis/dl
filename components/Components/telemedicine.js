class TelemedicineDashboard extends HTMLElement {
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
          :host {
      font-family: Arial, sans-serif;
            display: block;
            background: #f8fafc;
            padding: 20px;
            color: #111827;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #1f2937;
          }
          .header {
            background: white;
            padding: 20px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
            margin-bottom: 24px;
          }
          .header .info {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .header .info strong {
            font-size: 18px;
          }
          .tabs {
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
          }
          .tab {
            background: white;
            padding: 10px 16px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            cursor: pointer;
          }
          .section {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
            margin-bottom: 20px;
          }
          .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-top: 16px;
            margin-bottom: 16px;
          }
          label {
            font-weight: 600;
            font-size: 14px;
            display: block;
            margin-bottom: 6px;
          }
          input, select, textarea {
            width: 100%;
            padding: 8px 10px;
            font-size: 14px;
            border-radius: 6px;
            border: 1px solid #d1d5db;
          }
          textarea {
            min-height: 100px;
            resize: vertical;
          }
          .interaction-entry {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
          }
          .interaction-entry h4 {
            margin: 0 0 6px;
            font-size: 15px;
            font-weight: 600;
          }
          .interaction-entry span {
            font-size: 13px;
            color: #6b7280;
          }
          .interaction-entry p {
            margin: 4px 0 0;
            font-size: 14px;
          }
        </style>

        <div class="title">Telemedicine</div>

        <div class="header">
          <div class="info">
            <strong>Emily Adams</strong>
            <span>DOB: 06/20/1950 (75y) • Female</span>
            <span>MRN: 456789 • Phone: (701) 293-4945</span>
            <span>Address: 123 Main St, Springfield, IL</span>
          </div>
          <button style="padding: 10px 16px; border-radius: 6px; background: #7f56d9; color: white; border: none; cursor: pointer;">Start Video Call</button>
        </div>

        <div class="tabs">
          <div class="tab">Demographics</div>
          <div class="tab">Interactions</div>
        </div>

        <div class="section">
          <h3>New Interactions</h3>
          <div class="form-grid">
            <div>
              <label for="route">Route</label>
              <select id="route">
                <option>Outgoing</option>
                <option>Incoming</option>
              </select>
            </div>
            <div>
              <label for="type">Interaction Type</label>
              <select id="type">
                <option>Primary Contact/Caregiver</option>
                <option>Patient</option>
                <option>PCP</option>
              </select>
            </div>
     
      
            <div>
              <label for="status">Call Status</label>
              <select id="status">
                <option>Talked to Patient Contact</option>
                <option>No Answer</option>
                <option>Left Voicemail</option>
              </select>
            </div>
          </div>
          <div>
            <label for="note">Note</label>
            <textarea id="note" placeholder="Enter interaction notes..."></textarea>
          </div>
          <div style="margin-top: 12px;">
            <button style="padding: 10px 16px; border-radius: 6px; background: #7f56d9; color: white; border: none; cursor: pointer;">Save Interaction</button>
          </div>
        </div>

        <div class="section">
          <h3>Interaction History</h3>
          <div class="interaction-entry">
            <h4>Math Smith <span>(Caregiver)</span></h4>
            <span>10/04/2024, 12:10 PM - No Answer</span>
            <p>Note: No answer, try again later in the evening.</p>
          </div>
          <div class="interaction-entry">
            <h4>Matt Smith <span>(Caregiver)</span></h4>
            <span>08/02/2024, 11:20 AM - Connected</span>
            <p>Talked to caregiver about recent medication changes.</p>
          </div>
          <div class="interaction-entry">
            <h4>Emily Adams <span>(Patient)</span></h4>
            <span>10/01/2024, 09:30 AM - Left Voicemail</span>
            <p>Left a voicemail requesting callback for lab results.</p>
          </div>
        </div>
      `;
    }
  }

  customElements.define('telemedicine-dashboard', TelemedicineDashboard);