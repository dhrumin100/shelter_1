# Form Submission Setup Instructions

## Issues Fixed

1. **WhatsApp Integration**: Forms now only open WhatsApp after successful API submission
2. **Google Sheets Integration**: API route now properly writes form data to Google Sheets
3. **Error Handling**: Better error messages and validation

## Required Environment Variables

Create a `.env.local` file in the `tset1` directory with the following variables:

```env
# Google Sheets Integration
GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_BASE64=your_base64_encoded_service_account_key_here

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER=9714512452

# Optional: Path to service account key file (alternative to base64)
# GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./path/to/service-account-key.json
```

## Google Sheets Setup

1. **Create a Google Sheet** with the following columns (in order):
   - Timestamp
   - Form Type
   - Full Name
   - Email
   - Phone
   - Message
   - Property Name
   - Property Category
   - Project
   - Budget
   - Visit Date
   - Visit Time

2. **Set up Google Service Account**:
   - Go to Google Cloud Console
   - Create a new project or select existing
   - Enable Google Sheets API
   - Create a Service Account
   - Download the JSON key file
   - Convert the JSON to base64: `base64 -i service-account-key.json`
   - Add the base64 string to `GOOGLE_SERVICE_ACCOUNT_BASE64`

3. **Share the Google Sheet**:
   - Share your Google Sheet with the service account email
   - Give it "Editor" permissions

## Form Types

The system now handles three types of forms:

1. **Contact Form** (`formType: "contact"`)
   - Used in ContactSection and general contact forms
   - Basic fields: name, email, phone, message

2. **Enquiry Form** (`formType: "enquiry"`)
   - Used in EnquiryModal and property-specific enquiries
   - Includes property information

3. **Booking Form** (`formType: "booking"`)
   - Used in UniversalForm for property bookings
   - Includes additional fields like budget, visit date, etc.

## Testing

1. Fill out any form on the website
2. Submit the form
3. Check that:
   - Form data appears in your Google Sheet
   - WhatsApp opens only after successful submission
   - Error messages appear if submission fails

## Troubleshooting

- **"Server configuration error"**: Check environment variables
- **"Missing required fields"**: Ensure all required fields are filled
- **Google Sheets not updating**: Check service account permissions
- **WhatsApp not opening**: Check NEXT_PUBLIC_WHATSAPP_NUMBER 