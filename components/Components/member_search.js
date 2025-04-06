
    class PatientSearch extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.patients = [
          { name: "John Smith", age: 72, condition: "Diabetes", lastSeen: "04/01/25" },
          { name: "Alice Smith", age: 65, condition: "CHF", lastSeen: "04/05/25" },
          { name: "John Doe", age: 72, condition: "Diabetes", lastSeen: "04/01/25" },
          { name: "Alice Wong", age: 65, condition: "CHF", lastSeen: "04/05/25" },
          { name: "Jane Smith", age: 72, condition: "Diabetes", lastSeen: "04/01/25" },
          { name: "Christy Wong", age: 65, condition: "CHF", lastSeen: "04/05/25" },
          // Add more dummy patients as needed
        ];
        this.resultsPerPage = 10;
        this.currentPage = 1;
        // this.shadowRoot.innerHTML = `
        // <style>
        //     button {
        //     padding: 10px 15px;
        //     border: none;
        //     border-radius: 4px;
        //     background-color: #7f56d9;
        //     color: white;
        //     cursor: pointer;
        //   }
        //   button:hover {
        //     background-color: #0056b3;
        //   }
        // </style>`
        this.shadowRoot.innerHTML = `
          <div class="container">
            <h2>Patient Search</h2>
            <div class="search-bar">
              <input type="text" id="searchInput" placeholder="Search by name or ID...">
              <button id="searchBtn">Search</button>
              <button id="resetBtn">Reset</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Condition</th>
                  <th>Last Seen</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="tableBody">
              </tbody>
            </table>

            <div class="pagination" id="paginationControls"></div>
          </div>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      background-color: #f9f9f9;
    }
    .container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    h2 {
      margin-bottom: 20px;
    }
    .search-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    input[type="text"] {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      background-color: #7f56d9;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    .pagination {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .pagination button {
      padding: 6px 12px;
      background-color: #f1f1f1;
      border: 1px solid #ccc;
    }
  </style>
        `;
      }
          // <style>${document.querySelector('style').innerHTML}</style>

      connectedCallback() {
        this.renderTable(this.patients);
        this.renderPagination(this.patients.length);
        this.shadowRoot.getElementById('searchBtn').onclick = () => this.searchPatients();
        this.shadowRoot.getElementById('resetBtn').onclick = () => this.resetSearch();
      }

      renderTable(data) {
        const tbody = this.shadowRoot.getElementById('tableBody');
        tbody.innerHTML = '';

        const start = (this.currentPage - 1) * this.resultsPerPage;
        const paginatedData = data.slice(start, start + this.resultsPerPage);

        for (const patient of paginatedData) {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.condition}</td>
            <td>${patient.lastSeen}</td>
            <td><button>View</button></td>
          `;
          tbody.appendChild(row);
        }
      }

      renderPagination(dataLength) {
        const pagination = this.shadowRoot.getElementById('paginationControls');
        pagination.innerHTML = '';
        const totalPages = Math.ceil(dataLength / this.resultsPerPage);

        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.onclick = () => {
            this.currentPage = i;
            this.renderTable(this.filteredPatients || this.patients);
          };
          pagination.appendChild(btn);
        }
      }

      searchPatients() {
        const input = this.shadowRoot.getElementById('searchInput').value.toLowerCase();
        this.filteredPatients = this.patients.filter(p =>
          p.name.toLowerCase().includes(input) || String(p.age).includes(input)
        );
        this.currentPage = 1;
        this.renderTable(this.filteredPatients);
        this.renderPagination(this.filteredPatients.length);
      }

      resetSearch() {
        this.shadowRoot.getElementById('searchInput').value = '';
        this.currentPage = 1;
        this.renderTable(this.patients);
        this.renderPagination(this.patients.length);
      }
    }

    customElements.define('patient-search', PatientSearch);
