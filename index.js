// index.js

const express = require('express');
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// --- NEW: Add a GET route for browser visits ---
// This will run when you visit the main URL in a browser
app.get('/', (req, res) => {
    res.status(200).json({
        message: "API is live and running.",
        status: "success",
        instruction: "Please send a POST request to the /bfhl endpoint to use the API.",
    });
});

// Define the POST route at /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Get the 'data' array from the request body
        const { data } = req.body;

        // --- Personal Information ---
        // ⚠️ IMPORTANT: Replace these with your actual details
        const my_user_id = "aakash_gonuguntla_17032005"; // Format: {full_name_ddmmyyyy}
        const my_email = "aakash@xyz.com";
        const my_roll_number = "aakash123";

        // --- Logic Implementation ---
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let all_alphabetic_chars = "";

        // Loop through the input array to process each item
        data.forEach(item => {
            if (!isNaN(item)) {
                // It's a number
                const num = Number(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                // It's an alphabet string
                alphabets.push(item.toUpperCase());
                all_alphabetic_chars += item;
            } else {
                // It's a special character
                special_characters.push(item);
            }
        });
        
        // --- Logic for 'concat_string' ---
        const reversed_alphabets = all_alphabetic_chars.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            concat_string += (i % 2 === 0) ? reversed_alphabets[i].toUpperCase() : reversed_alphabets[i].toLowerCase();
        }

        // --- Construct the Final Response ---
        const response = {
            is_success: true,
            user_id: my_user_id,
            email: my_email,
            roll_number: my_roll_number,
            sum: sum.toString(),
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            concat_string: concat_string
        };

        // Send the successful response
        return res.status(200).json(response);

    } catch (error) {
        // Handle any errors gracefully
        return res.status(500).json({ is_success: false, error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});