// routes/conversation.routes.js
const express = require('express');
const router = express.Router();
const databases  = require('../config/databases'); // Adjust the path to your database connection file
const { generateSingleConversationHTML } = require('../utils/reportTemplates'); // Adjust path

// Route to get a single conversation by ID
router.get('/conversation/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send('Conversation ID is required');
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).send('Conversation ID must be a number');
    }

    // Use the correct column name: id
    const result = await databases.CUSTOMER_INTERACTION.query(
      'SELECT * FROM conversations WHERE id = $1',
      [numericId]
    );

    if (!result.rows.length) {
      return res.status(404).send('Conversation not found');
    }

    const conversation = result.rows[0];
    res.send(generateSingleConversationHTML(conversation));
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
