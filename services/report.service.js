const escapeHtml = (text = '') =>
  text
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const truncate = (text, max = 600) =>
  text && text.length > max ? text.slice(0, max) + '…' : text;

const formatDate = (text) => {
  if (!text) return '-';
  const d = new Date(text);
  return isNaN(d.getTime()) ? escapeHtml(text) : d.toLocaleDateString();
};

const generateHTMLReport = (title, rows) => {
  if (!rows.length) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>${title}</h2>
        <p>No data found for this report.</p>
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial, sans-serif;">
  <div style="max-width:900px;margin:0 auto;padding:24px;">
    
    <!-- Header -->
    <div style="
      background:#1f2937;
      color:#ffffff;
      padding:24px;
      border-radius:10px;
      margin-bottom:24px;
    ">
      <h1 style="margin:0;font-size:22px;">${title}</h1>
      <p style="margin:6px 0 0;font-size:14px;opacity:0.8;">
        Total records: ${rows.length}
      </p>
    </div>

    <!-- Cards -->
    ${rows.map((row, index) => `
      <div style="
        background:#ffffff;
        border-radius:10px;
        padding:20px;
        margin-bottom:16px;
        box-shadow:0 2px 8px rgba(0,0,0,0.05);
      ">
        
        <!-- Card Header -->
        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:12px;
        ">
          <strong style="font-size:15px;color:#111827;">
            Conversation #${index + 1}
          </strong>
          <span style="font-size:12px;color:#6b7280;">
            ${formatDate(row.date_conversation)}
          </span>
        </div>

        <!-- Metadata -->
        <div style="
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
          gap:10px;
          font-size:13px;
          color:#374151;
          margin-bottom:14px;
        ">
          <div><strong>User:</strong> ${escapeHtml(row.user_name)}</div>
          <div><strong>Client:</strong> ${escapeHtml(row.client_name || '-')}</div>
          <div><strong>Assistant:</strong> ${escapeHtml(row.assistant_name || '-')}</div>
        </div>

        <!-- Conversation -->
        <div style="
          background:#f9fafb;
          border-left:4px solid #2563eb;
          padding:14px;
          border-radius:6px;
          font-size:14px;
          line-height:1.6;
          color:#111827;
          white-space:pre-line;
        ">
          ${escapeHtml(truncate(row.conversation))}
        </div>
      </div>
    `).join('')}

    <!-- Footer -->
    <div style="
      text-align:center;
      font-size:12px;
      color:#6b7280;
      margin-top:32px;
    ">
      Generated automatically by STS Reporting System
    </div>

  </div>
</body>
</html>
  `;
};
const generateprojectsReport = (title, rows) => {
  if (!rows.length) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>${title}</h2>
        <p>No data found for this report.</p>
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial, sans-serif;">
  <div style="max-width:900px;margin:0 auto;padding:24px;">

    <!-- Header -->
    <div style="
      background:#1f2937;
      color:#ffffff;
      padding:24px;
      border-radius:10px;
      margin-bottom:24px;
    ">
      <h1 style="margin:0;font-size:22px;">${title}</h1>
      <p style="margin:6px 0 0;font-size:14px;opacity:0.8;">
        Total projects: ${rows.length}
      </p>
    </div>

    <!-- Project Cards -->
    ${rows.map((row, index) => `
      <div style="
        background:#ffffff;
        border-radius:10px;
        padding:20px;
        margin-bottom:16px;
        box-shadow:0 2px 8px rgba(0,0,0,0.05);
      ">

        <!-- Card Header -->
        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:12px;
        ">
          <strong style="font-size:15px;color:#111827;">
            Project #${row.project_id} - ${escapeHtml(row['project-name'] || 'Unnamed')}
          </strong>
          <span style="font-size:12px;color:#6b7280;">
            Status: ${escapeHtml(row.status || '-')}
          </span>
        </div>

        <!-- Project Details -->
        <div style="
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
          gap:10px;
          font-size:13px;
          color:#374151;
          margin-bottom:14px;
        ">
          <div><strong>Start Date:</strong> ${formatDate(row['start-date'])}</div>
          <div><strong>End Date:</strong> ${formatDate(row['end-date'])}</div>
          <div><strong>Assigned User ID:</strong> ${escapeHtml(row.user_id ?? '-')}</div>
        </div>

        <!-- Comment / Description -->
        <div style="
          background:#f9fafb;
          border-left:4px solid #2563eb;
          padding:14px;
          border-radius:6px;
          font-size:14px;
          line-height:1.6;
          color:#111827;
          white-space:pre-line;
        ">
          <strong>Comment:</strong><br/>
          ${escapeHtml(truncate(row.comment || 'No comment'))}
        </div>

      </div>
    `).join('')}

    <!-- Footer -->
    <div style="
      text-align:center;
      font-size:12px;
      color:#6b7280;
      margin-top:32px;
    ">
      Generated automatically by STS Reporting System
    </div>

  </div>
</body>
</html>
  `;
};

module.exports = { generateHTMLReport, generateprojectsReport };
