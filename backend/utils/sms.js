async function sendSMS({ to, message }) {
    // Integrate with an SMS provider like Twilio here
    console.log(`SMS to ${to}: ${message}`);
    return Promise.resolve();
}

module.exports = { sendSMS }; 