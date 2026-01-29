// utils/reportTemplates.js
function escapeHtml(text) {
  if (!text) return '';
  return text
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatDate(dateString) {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function generateSingleConversationHTML(conversation) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Conversation Details</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          :root {
            --primary-color: #4361ee;
            --primary-light: #eef2ff;
            --secondary-color: #3a0ca3;
            --accent-color: #f72585;
            --text-dark: #2b2d42;
            --text-light: #8d99ae;
            --bg-color: #f8fafc;
            --card-bg: #ffffff;
            --shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            --shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.1);
            --radius: 16px;
            --transition: all 0.3s ease;
          }
          
         body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          background-image: url('https://images.unsplash.com/photo-1581091870621-1f6f5f207147?auto=format&fit=crop&w=1350&q=80'); /* industrial theme */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          color: var(--text-dark);
          line-height: 1.6;
          min-height: 100vh;
         padding: 20px;
         display: flex;
        justify-content: center;
        align-items: center;
         }

          
        .conversation-container {
         max-width: 1000px;
         width: 100%;
         background-color: rgba(255, 255, 255, 0.85); /* semi-transparent */
         border-radius: var(--radius);
         box-shadow: var(--shadow);
         overflow: hidden;
         transition: var(--transition);
         }

          
          .conversation-container:hover {
            box-shadow: var(--shadow-hover);
          }
          
          .conversation-header {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            color: white;
            padding: 40px 40px 30px;
            position: relative;
            overflow: hidden;
          }
          
          .conversation-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            opacity: 0.2;
          }
          
          .conversation-header h1 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
          }
          
          .conversation-header p {
            font-size: 16px;
            opacity: 0.9;
            position: relative;
            z-index: 1;
          }
          
          .conversation-badge {
            position: absolute;
            top: 30px;
            right: 30px;
            background-color: var(--accent-color);
            color: white;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 12px rgba(247, 37, 133, 0.3);
          }
          
          .conversation-content {
            padding: 40px;
          }
          
          .meta-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
          }
          
          .meta-card {
            background-color: var(--primary-light);
            border-radius: 12px;
            padding: 20px;
            display: flex;
            align-items: center;
            transition: var(--transition);
            border-left: 4px solid var(--primary-color);
          }
          
          .meta-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(67, 97, 238, 0.1);
          }
          
          .meta-icon {
            width: 50px;
            height: 50px;
            background-color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: var(--primary-color);
            font-size: 22px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
          }
          
          .meta-info h3 {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-light);
            margin-bottom: 5px;
          }
          
          .meta-info p {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-dark);
          }
          
          .conversation-body {
            margin-top: 30px;
          }
          
          .conversation-body h2 {
            font-size: 20px;
            color: var(--secondary-color);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
          }
          
          .conversation-body h2::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 24px;
            background-color: var(--accent-color);
            margin-right: 10px;
            border-radius: 3px;
          }
          
          .conversation-text {
            background-color: #f8fafc;
            border-radius: 12px;
            padding: 30px;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
            font-size: 15px;
            line-height: 1.7;
            white-space: pre-wrap;
            word-break: break-word;
            border: 1px solid #e2e8f0;
            position: relative;
            max-height: 500px;
            overflow-y: auto;
          }
          
          .conversation-text::-webkit-scrollbar {
            width: 8px;
          }
          
          .conversation-text::-webkit-scrollbar-track {
            background: #e2e8f0;
            border-radius: 10px;
          }
          
          .conversation-text::-webkit-scrollbar-thumb {
            background: var(--primary-color);
            border-radius: 10px;
          }
          
          .conversation-text::-webkit-scrollbar-thumb:hover {
            background: var(--secondary-color);
          }
          
          .conversation-text::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
            border-radius: 12px 0 0 12px;
          }
          
          .conversation-footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-light);
            font-size: 14px;
          }
          
          .action-buttons {
            display: flex;
            gap: 10px;
          }
          
          .btn {
            padding: 10px 20px;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          
          .btn-primary {
            background-color: var(--primary-color);
            color: white;
          }
          
          .btn-primary:hover {
            background-color: var(--secondary-color);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(67, 97, 238, 0.2);
          }
          
          .btn-outline {
            background-color: transparent;
            color: var(--text-dark);
            border: 1px solid #cbd5e0;
          }
          
          .btn-outline:hover {
            background-color: #f1f5f9;
            border-color: var(--primary-color);
          }
          
          @media (max-width: 768px) {
            body {
              padding: 10px;
            }
            
            .conversation-header {
              padding: 30px 20px 20px;
            }
            
            .conversation-badge {
              position: relative;
              top: 0;
              right: 0;
              margin-bottom: 20px;
              display: inline-block;
            }
            
            .conversation-content {
              padding: 20px;
            }
            
            .meta-section {
              grid-template-columns: 1fr;
            }
            
            .conversation-footer {
              flex-direction: column;
              gap: 20px;
              align-items: flex-start;
            }
            
            .action-buttons {
              width: 100%;
              justify-content: flex-start;
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .conversation-container {
            animation: fadeInUp 0.6s ease-out;
          }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body>
        <div class="conversation-container">
          <div class="conversation-header">
            <div class="conversation-badge">
              <i class="fas fa-comments"></i> Conversation Details
            </div>
            <h1>Conversation Details</h1>
            <p>Detailed view of conversation between user and assistant</p>
          </div>
          
          <div class="conversation-content">
            <div class="meta-section">
              <div class="meta-card">
                <div class="meta-icon">
                  <i class="fas fa-user"></i>
                </div>
                <div class="meta-info">
                  <h3>User</h3>
                  <p>${escapeHtml(conversation.user_name)}</p>
                </div>
              </div>
              
              <div class="meta-card">
                <div class="meta-icon">
                  <i class="fas fa-headset"></i>
                </div>
                <div class="meta-info">
                  <h3>Client</h3>
                  <p>${escapeHtml(conversation.client_name)}</p>
                </div>
              </div>
              
              <div class="meta-card">
                <div class="meta-icon">
                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="meta-info">
                  <h3>Date</h3>
                  <p>${formatDate(conversation.date_conversation)}</p>
                </div>
              </div>
            </div>
            
            <div class="conversation-body">
              <h2>Conversation Transcript</h2>
              <div class="conversation-text">
${escapeHtml(conversation.conversation || 'No conversation available.')}
              </div>
            </div>
            
            <div class="conversation-footer">
              <div class="timestamp">
                <i class="far fa-clock"></i> Generated: ${new Date().toLocaleString()}
              </div>
              <div class="action-buttons">
                <button class="btn btn-outline" onclick="window.print()">
                  <i class="fas fa-print"></i> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = { generateSingleConversationHTML, escapeHtml, formatDate };
