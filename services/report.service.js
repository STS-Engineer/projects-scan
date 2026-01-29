
const generateHTMLReport = (title, rows) => {
  // Helper function for escaping HTML - Node.js compatible
  const escapeHtml = (text) => {
    if (!text) return '';
    return text
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Helper function for formatting dates
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  if (!rows.length) {
    return `
      <div style="
        font-family: 'Inter', sans-serif;
        padding: 80px 40px;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
      ">
        <div style="
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 60px 40px;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
        ">
          <div style="font-size: 72px; color: #94a3b8; margin-bottom: 24px; opacity: 0.5;">💬</div>
          <h2 style="color: #1f2937; margin-bottom: 16px; font-size: 28px; font-weight: 700;">
            ${escapeHtml(title)}
          </h2>
          <p style="color: #6b7280; font-size: 16px; margin-bottom: 32px;">
            No conversations found for this report.
          </p>
        </div>
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background: #f8fafc;
      color: #334155;
      padding: 20px;
    }
    
   .container {
     max-width: 1200px;
     margin: 0 auto;
      }

    .header {
    background: linear-gradient(135deg, 
    rgba(67, 97, 238, 0.95) 0%, 
    rgba(58, 12, 163, 0.9) 100%);
      backdrop-filter: blur(20px);
      padding: 40px 50px;
      border-radius: 24px;
      box-shadow: 
      0 20px 60px rgba(67, 97, 238, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
      margin-bottom: 30px;
      border: 1px solid rgba(255, 255, 255, 0.15);
     position: relative;
     overflow: hidden;
      }
  
   .header::before {
    content: '';
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     height: 1px;
     background: linear-gradient(90deg, 
     transparent, 
    rgba(255, 255, 255, 0.4), 
    transparent);
     }

   .header::after {
      content: '';
      position: absolute;
      top: 0;
       left: 0;
      width: 100%;
      height: 100%;
      background: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0H120V120H0ZM60,20A40,40,0,1,1,20,60,40,40,0,0,1,60,20Z' fill='%23ffffff' fill-opacity='0.03'/%3E%3C/svg%3E");
      opacity: 0.4;
     }

    
   .header h1 {
     font-size: 42px;
     font-weight: 800;
     color: white;
     margin-bottom: 12px;
     background: linear-gradient(135deg, #ffffff 0%, #e2e8ff 100%);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
     background-clip: text;
     letter-spacing: -0.5px;
     position: relative;
     z-index: 1;
     }

   .header p {
     color: rgba(255, 255, 255, 0.9);
     font-size: 18px;
     font-weight: 500;
     position: relative;
     z-index: 1;
      }
  .stat-badge {
     background: rgba(255, 255, 255, 0.15);
     backdrop-filter: blur(10px);
     border: 1px solid rgba(255, 255, 255, 0.2);
     padding: 12px 20px;
     border-radius: 12px;
     color: white;
     font-size: 14px;
     font-weight: 600;
     display: flex;
     align-items: center;
     gap: 8px;
    }

   .stat-badge i {
     font-size: 16px;
     opacity: 0.8;
       }

    
    /* Filter/Search Bar Styles */
    .filter-bar {
      background: white;
      padding: 20px 30px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      margin-bottom: 20px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;
    }
    
    .search-container {
      flex: 1;
      min-width: 300px;
      position: relative;
    }
    
    .search-input {
      width: 100%;
      padding: 14px 20px 14px 48px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 15px;
      font-family: 'Inter', sans-serif;
      color: #334155;
      background: #f8fafc;
      transition: all 0.3s ease;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #6366f1;
      background: white;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    }
    
    .search-icon {
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      font-size: 18px;
    }
    
    .filter-buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: 12px 20px;
      border: 2px solid #e2e8f0;
      background: white;
      color: #64748b;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .filter-btn:hover {
      border-color: #6366f1;
      color: #6366f1;
      background: #f8fafc;
    }
    
    .filter-btn.active {
      background: #6366f1;
      color: white;
      border-color: #6366f1;
    }
    
    .clear-filters {
      padding: 12px 20px;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .clear-filters:hover {
      background: #dc2626;
      transform: translateY(-1px);
    }
    
    .results-info {
      color: #64748b;
      font-size: 14px;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #e2e8f0;
      display: none;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    
    .results-info.show {
      display: flex;
    }
    
    .table-wrapper {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    thead {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
    }
    
    th {
      padding: 18px 20px;
      text-align: left;
      color: white !important;
      font-weight: 600;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    th i {
      margin-right: 8px;
    }
    
    tbody tr {
      border-bottom: 1px solid #f1f5f9;
      transition: background-color 0.2s ease;
    }
    
    tbody tr:hover {
      background-color: #f8fafc;
    }
    
    td {
      padding: 18px 20px;
      color: #475569;
    }
    
    .user-cell {
      font-weight: 600;
      color: #1e293b;
    }
    
    .client-cell {
      color: #475569;
    }
    
    .date-cell {
      color: #64748b;
      font-size: 14px;
    }
    
    .details-cell {
      text-align: center;
      padding: 8px;
    }

    .details-cell a {
      display: inline-block;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      text-decoration: none;
      padding: 10px 24px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
      border: none;
      cursor: pointer;
      letter-spacing: 0.3px;
      position: relative;
      overflow: hidden;
    }

    /* Hover effect */
    .details-cell a:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(99, 102, 241, 0.35);
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
    }

    /* Ripple effect on click */
    .details-cell a:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
    }

    /* Optional: Add an arrow icon */
    .details-cell a::after {
      content: '→';
      margin-left: 8px;
      transition: transform 0.3s ease;
    }

    .details-cell a:hover::after {
      transform: translateX(3px);
    }
    
    /* Assistant Details Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: 20px;
    }
    
    .modal-content {
      background: white;
      border-radius: 20px;
      width: 100%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      animation: modalSlideIn 0.4s ease;
    }
    
    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    .modal-header {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      padding: 30px;
      border-radius: 20px 20px 0 0;
      color: white;
      position: relative;
    }
    
    .modal-header h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .modal-header p {
      opacity: 0.9;
      font-size: 14px;
    }
    
    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: white;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;
    }
    
    .modal-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    
    .modal-body {
      padding: 30px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .info-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #e2e8f0;
    }
    
    .info-card h3 {
      font-size: 12px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    
    .info-card p {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
    }
    
    .conversation-section {
      background: #f8fafc;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 30px;
      border: 1px solid #e2e8f0;
    }
    
    .conversation-section h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .conversation-content {
      background: white;
      border-radius: 8px;
      padding: 20px;
      max-height: 300px;
      overflow-y: auto;
      font-size: 15px;
      line-height: 1.6;
      color: #475569;
      border: 1px solid #e2e8f0;
    }
    
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }
    
    .analytics-card {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      color: white;
    }
    
    .analytics-card .value {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    
    .analytics-card .label {
      font-size: 12px;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      color: #64748b;
      font-size: 14px;
    }
    
    /* Scrollbar Styling */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
      
      .header, .filter-bar, .table-wrapper {
        padding: 20px;
      }
      
      .header h1 {
        font-size: 24px;
      }
      
      .search-container {
        min-width: 100%;
      }
      
      .filter-buttons {
        width: 100%;
        justify-content: space-between;
      }
      
      .filter-btn, .clear-filters {
        flex: 1;
        text-align: center;
        justify-content: center;
        min-width: 120px;
      }
      
      table {
        display: block;
        overflow-x: auto;
      }
      
      .info-grid, .analytics-grid {
        grid-template-columns: 1fr;
      }
      
      .modal-body {
        padding: 20px;
      }
      
      .details-cell a {
        padding: 8px 16px;
        font-size: 13px;
      }
    }
    
    /* Animation for table rows */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    tbody tr {
      animation: fadeIn 0.3s ease forwards;
    }
    
    /* No results message */
    .no-results {
      text-align: center;
      padding: 60px 20px;
      color: #64748b;
      display: none;
    }
    
    .no-results.show {
      display: block;
    }
    
    .no-results i {
      font-size: 48px;
      color: #94a3b8;
      margin-bottom: 20px;
      opacity: 0.5;
    }
  </style>
</head>
<body>
  <div class="container">
<div class="header" style="
  background: #4361ee;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  margin-bottom: 20px;
  border: 1px solid #3a0ca3;
  text-align: center;
">
  <h1 style="
    font-size: 32px;
    font-weight: 700;
    color: white;
    margin-bottom: 12px;
    margin-top: 0;
    font-family: 'Segoe UI', Arial, sans-serif;
    line-height: 1.3;
  ">
    ${escapeHtml(title)}
    </h1>
    <p style="
    color: rgba(255, 255, 255, 0.9);
    font-size: 18px;
    margin-bottom: 0;
    margin-top: 0;
    font-family: 'Segoe UI', Arial, sans-serif;
    font-weight: 500;
    ">
    Total Conversations: ${rows.length}
    </p>
   </div>
    
    <!-- Filter/Search Bar -->
    <div class="filter-bar">
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input 
          type="text" 
          class="search-input" 
          id="searchInput"
          placeholder="Search conversations by user, client, or date..."
        >
      </div>
      
      <div class="filter-buttons">
        <button class="filter-btn active" data-filter="all">
          <i class="fas fa-list"></i> All (${rows.length})
        </button>
        <button class="filter-btn" data-filter="today">
          <i class="fas fa-calendar-day"></i> Today
        </button>
        <button class="filter-btn" data-filter="week">
          <i class="fas fa-calendar-week"></i> This Week
        </button>
        <button class="filter-btn" data-filter="no-client">
          <i class="fas fa-building"></i> No Client
        </button>
        <button class="clear-filters" id="clearFilters">
          <i class="fas fa-times"></i> Clear Filters
        </button>
      </div>
      
      <div class="results-info" id="resultsInfo">
        <span id="filterStatus">Showing all conversations</span>
        <span id="resultsCount">${rows.length} results</span>
      </div>
    </div>
    
    <div class="table-wrapper">
      <table id="conversationsTable">
        <thead>
          <tr>
            <th><i class="fas fa-user"></i> User</th>
            <th><i class="fas fa-building"></i> Client</th>
            <th><i class="fas fa-calendar"></i> Date</th>
            <th><i class="fas fa-eye"></i> Actions</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          ${rows.map((row, index) => `
            <tr>
              <td class="user-cell">${escapeHtml(row.user_name || 'Unknown')}</td>
              <td class="client-cell">${escapeHtml(row.client_name || 'No Client')}</td>
              <td class="date-cell">${formatDate(row.date_conversation)}</td>
              <td class="details-cell" align="center" style="padding: 12px 8px;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td align="center">
                      <a 
                        href="https://db-scan.azurewebsites.net/conversation/${row.id}"
                        style="
                          background: #4361ee;
                          border: 1px solid #3a0ca3;
                          border-radius: 6px;
                          color: #ffffff;
                          display: inline-block;
                          font-family: Arial, sans-serif;
                          font-size: 14px;
                          font-weight: bold;
                          line-height: 40px;
                          text-align: center;
                          text-decoration: none;
                          width: 140px;
                          -webkit-text-size-adjust: none;
                        "
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <!-- No results message -->
      <div class="no-results" id="noResults">
        <i class="fas fa-search"></i>
        <h3>No conversations found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    </div>
  </div>
  
  <!-- Assistant Details Modal -->
  <div class="modal-overlay" id="assistantModal">
    <div class="modal-content">
      <!-- Modal content will be inserted here by JavaScript -->
    </div>
  </div>
  
  <script>
    // Store conversations data
    const conversations = ${JSON.stringify(rows.map(row => ({
      ...row,
      conversation: row.conversation || '',
      user_name: row.user_name || 'Unknown',
      client_name: row.client_name || 'No Client',
      date_conversation: row.date_conversation || '',
      id: row.id || Math.random().toString(36).substr(2, 9),
      // Add date object for filtering
      dateObj: row.date_conversation ? new Date(row.date_conversation) : null
    })))};
    
    // Helper functions
    function escapeHtml(text) {
      if (!text) return '';
      return text
        .toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
    
    function formatDate(dateString) {
      if (!dateString) return 'No date';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        return 'Invalid date';
      }
    }
    
    // Filtering and search functionality
    let currentFilter = 'all';
    let currentSearch = '';
    
    function filterConversations() {
      const tbody = document.getElementById('tableBody');
      const noResults = document.getElementById('noResults');
      const resultsInfo = document.getElementById('resultsInfo');
      const filterStatus = document.getElementById('filterStatus');
      const resultsCount = document.getElementById('resultsCount');
      
      let filteredConversations = conversations;
      
      // Apply search filter
      if (currentSearch.trim()) {
        const searchTerm = currentSearch.toLowerCase();
        filteredConversations = filteredConversations.filter(conv => 
          (conv.user_name && conv.user_name.toLowerCase().includes(searchTerm)) ||
          (conv.client_name && conv.client_name.toLowerCase().includes(searchTerm)) ||
          (conv.date_conversation && formatDate(conv.date_conversation).toLowerCase().includes(searchTerm))
        );
      }
      
      // Apply time filter
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      if (currentFilter === 'today') {
        filteredConversations = filteredConversations.filter(conv => {
          if (!conv.dateObj) return false;
          const convDate = new Date(conv.dateObj.getFullYear(), conv.dateObj.getMonth(), conv.dateObj.getDate());
          return convDate.getTime() === today.getTime();
        });
      } else if (currentFilter === 'week') {
        filteredConversations = filteredConversations.filter(conv => {
          if (!conv.dateObj) return false;
          return conv.dateObj >= weekAgo;
        });
      } else if (currentFilter === 'no-client') {
        filteredConversations = filteredConversations.filter(conv => 
          !conv.client_name || conv.client_name === 'No Client'
        );
      }
      
      // Update table
      if (filteredConversations.length === 0) {
        tbody.innerHTML = '';
        noResults.classList.add('show');
        resultsInfo.classList.remove('show');
      } else {
        noResults.classList.remove('show');
        resultsInfo.classList.add('show');
        
        tbody.innerHTML = filteredConversations.map(conv => \`
          <tr>
            <td class="user-cell">\${escapeHtml(conv.user_name)}</td>
            <td class="client-cell">\${escapeHtml(conv.client_name)}</td>
            <td class="date-cell">\${formatDate(conv.date_conversation)}</td>
            <td class="details-cell" align="center" style="padding: 12px 8px;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center">
                    <a 
                      href="https://db-scan.azurewebsites.net/conversation/\${conv.id}"
                      style="
                        background: #4361ee;
                        border: 1px solid #3a0ca3;
                        border-radius: 6px;
                        color: #ffffff;
                        display: inline-block;
                        font-family: Arial, sans-serif;
                        font-size: 14px;
                        font-weight: bold;
                        line-height: 40px;
                        text-align: center;
                        text-decoration: none;
                        width: 140px;
                        -webkit-text-size-adjust: none;
                      "
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        \`).join('');
      }
      
      // Update results info
      resultsCount.textContent = \`\${filteredConversations.length} result\${filteredConversations.length !== 1 ? 's' : ''}\`;
      
      let filterText = '';
      switch(currentFilter) {
        case 'all': filterText = 'all conversations'; break;
        case 'today': filterText = "today's conversations"; break;
        case 'week': filterText = "this week's conversations"; break;
        case 'no-client': filterText = 'conversations with no client'; break;
      }
      
      if (currentSearch.trim()) {
        filterStatus.textContent = \`Showing \${filterText} matching "\${currentSearch}"\`;
      } else {
        filterStatus.textContent = \`Showing \${filterText}\`;
      }
      
      // Re-add hover effects
      const rows = document.querySelectorAll('#tableBody tr');
      rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
          this.style.backgroundColor = '#f8fafc';
        });
        row.addEventListener('mouseleave', function() {
          this.style.backgroundColor = '';
        });
      });
    }
    
    // Event listeners for filtering
    document.addEventListener('DOMContentLoaded', function() {
      const searchInput = document.getElementById('searchInput');
      const filterButtons = document.querySelectorAll('.filter-btn');
      const clearFiltersBtn = document.getElementById('clearFilters');
      
      // Search input
      let searchTimeout;
      searchInput.addEventListener('input', function(e) {
        currentSearch = e.target.value;
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterConversations, 300);
      });
      
      // Filter buttons
      filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          filterButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          currentFilter = this.dataset.filter;
          filterConversations();
        });
      });
      
      // Clear filters
      clearFiltersBtn.addEventListener('click', function() {
        searchInput.value = '';
        currentSearch = '';
        filterButtons.forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        currentFilter = 'all';
        filterConversations();
      });
      
      // Initial hover effects
      const rows = document.querySelectorAll('tbody tr');
      rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
          this.style.backgroundColor = '#f8fafc';
        });
        row.addEventListener('mouseleave', function() {
          this.style.backgroundColor = '';
        });
      });
    });
    
    // Modal functions (keep your existing modal functions here)
    function showAssistantDetails(index) {
      // Your existing modal code
    }
    
    function closeModal() {
      const modalOverlay = document.getElementById('assistantModal');
      modalOverlay.style.display = 'none';
    }
    
    document.getElementById('assistantModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
  </script>
</body>
</html>
  `;
};

module.exports = { generateHTMLReport };
