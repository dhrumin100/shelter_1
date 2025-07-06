// Test script to verify form submission API
// Run this with: node test-form-submission.js

const testFormSubmission = async () => {
    const testData = {
        formType: "contact",
        fullName: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        message: "This is a test message",
        propertyName: "Test Property",
        propertyCategory: "Residential",
        project: "",
        budget: "",
        visitDate: "",
        visitTime: ""
    };

    try {
        console.log('Testing form submission...');
        console.log('Test data:', testData);

        const response = await fetch('http://localhost:3000/api/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('✅ Form submission successful!');
            console.log('Response:', result);
        } else {
            console.log('❌ Form submission failed!');
            console.log('Status:', response.status);
            console.log('Error:', result);
        }
    } catch (error) {
        console.log('❌ Network error:', error.message);
    }
};

// Only run if this file is executed directly
if (require.main === module) {
    testFormSubmission();
}

module.exports = { testFormSubmission }; 