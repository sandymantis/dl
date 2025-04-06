class HealthProfileDashboard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const patient = {
        name: 'Emily Adams',
        dob: '02/20/1950',
        age: 75,
        gender: 'Female',
        email: 'emilya@example.com',
        phone: '+1 (555) 222-3344',
        address: '123 Main St, Springfield, IL'
      };

      const summary = {
        Medications: [
          { name: 'Metformin', dose: '500mg', freq: '2x/day', lastRefilled: '2024-03-01' },
          { name: 'Lisinopril', dose: '10mg', freq: '1x/day', lastRefilled: '2024-02-15' },
          { name: 'Atorvastatin', dose: '20mg', freq: '1x/day', lastRefilled: '2024-03-05' },
          { name: 'Amlodipine', dose: '5mg', freq: '1x/day', lastRefilled: '2024-02-25' },
          { name: 'Levothyroxine', dose: '75mcg', freq: '1x/day', lastRefilled: '2024-03-10' }
        ],
        Allergies: [
          { name: 'Peanuts', reaction: 'Anaphylaxis', diagnosed: '2010-06-10' },
          { name: 'Penicillin', reaction: 'Rash', diagnosed: '2015-08-21' },
          { name: 'Latex', reaction: 'Itching', diagnosed: '2012-04-17' },
          { name: 'Bee stings', reaction: 'Swelling', diagnosed: '2009-07-30' },
          { name: 'Shellfish', reaction: 'Vomiting', diagnosed: '2013-11-02' }
        ],
        Conditions: [
          { name: 'Type 2 Diabetes', status: 'Chronic', diagnosed: '2018-04-12' },
          { name: 'Hypertension', status: 'Controlled', diagnosed: '2020-01-03' },
          { name: 'Asthma', status: 'Stable', diagnosed: '2010-03-15' },
          { name: 'Hypothyroidism', status: 'Ongoing', diagnosed: '2016-09-25' },
          { name: 'GERD', status: 'Mild', diagnosed: '2019-06-14' }
        ],
        Procedures: [
          { name: 'Appendectomy', date: '2010-07-19' },
          { name: 'Cataract surgery', date: '2021-08-10' },
          { name: 'Colonoscopy', date: '2023-04-05' },
          { name: 'Hernia repair', date: '2015-12-01' },
          { name: 'Knee arthroscopy', date: '2018-10-22' }
        ]
      };

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            font-family: 'Segoe UI', sans-serif;
            display: block;
            background: #f0f4f9;
            padding: 0;
            color: #333;
          }
          .profile-container {
            width: 95vw;
            padding: 20px 20px;
            box-sizing: border-box;
          }
          .demographics {
            background: linear-gradient(135deg, #f8fafc, #e0e7ff);
            padding: 24px;
            border-radius: 12px;
            margin-bottom: 24px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          }
          .demographics h2 {
            margin-top: 0;
            font-size: 22px;
            font-weight: 700;
            color: #1f2937;
          }
          .demographics p {
            margin: 6px 0;
            font-size: 14px;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
            border-left: 6px solid #7f56d9;
            transition: transform 0.2s ease;
          }
          .card:hover {
            transform: translateY(-4px);
          }
          .card h3 {
            margin-top: 0;
            font-size: 18px;
            color: #4f46e5;
          }
          .card .count {
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 10px;
          }
          .card table {
            width: 100%;
            border-collapse: collapse;
          }
          .card th, .card td {
            text-align: left;
            padding: 6px 10px;
            font-size: 13px;
            border-bottom: 1px solid #e5e7eb;
          }
          .card th {
            color: #374151;
            font-weight: 600;
            background: #f9fafb;
          }
        </style>
        <div style="background: white; padding: 20px 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); margin-bottom: 20px;">
<h2 style="font-size: 22px; font-weight: 600; color: #333; margin: 0;">Patient Health Profile</h2>

        <div class="profile-container">
          <div class="demographics">
            <h2>Health Profile</h2>
            <p><strong>Name:</strong> ${patient.name}</p>
            <p><strong>DOB:</strong> ${patient.dob} | <strong>Age:</strong> ${patient.age} | <strong>Gender:</strong> ${patient.gender}</p>
            <p><strong>Email:</strong> ${patient.email}</p>
            <p><strong>Phone:</strong> ${patient.phone}</p>
            <p><strong>Address:</strong> ${patient.address}</p>
          </div>

          <div class="summary-grid">
            ${Object.entries(summary).map(([title, data]) => {
              let headers = '', rows = '';
              if (title === 'Medications') {
                headers = '<tr><th>Name</th><th>Dosage</th><th>Frequency</th><th>Last Refilled</th></tr>';
                rows = data.map(item => `<tr><td>${item.name}</td><td>${item.dose}</td><td>${item.freq}</td><td>${item.lastRefilled}</td></tr>`).join('');
              } else if (title === 'Allergies') {
                headers = '<tr><th>Allergen</th><th>Reaction</th><th>Date Diagnosed</th></tr>';
                rows = data.map(item => `<tr><td>${item.name}</td><td>${item.reaction}</td><td>${item.diagnosed}</td></tr>`).join('');
              } else if (title === 'Conditions') {
                headers = '<tr><th>Condition</th><th>Status</th><th>Date Diagnosed</th></tr>';
                rows = data.map(item => `<tr><td>${item.name}</td><td>${item.status}</td><td>${item.diagnosed}</td></tr>`).join('');
              } else if (title === 'Procedures') {
                headers = '<tr><th>Procedure</th><th>Date Performed</th></tr>';
                rows = data.map(item => `<tr><td>${item.name}</td><td>${item.date}</td></tr>`).join('');
              }
              return `
                <div class="card">
                  <h3>${title}</h3>
                  <div class="count">${data.length} items</div>
                  <table>
                    <thead>${headers}</thead>
                    <tbody>${rows}</tbody>
                  </table>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        </div>
      `;
    }
  }

  customElements.define('health-profile-dashboard', HealthProfileDashboard);