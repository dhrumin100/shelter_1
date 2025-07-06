import fs from 'fs';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function POST(req: NextRequest) {
    try {
        const SHEET_ID = process.env.GOOGLE_SHEET_ID;
        const KEY_PATH = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
        const KEY_B64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;

        if (!SHEET_ID || (!KEY_PATH && !KEY_B64)) {
            console.error('Missing required environment variables');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        let credentials;

        if (KEY_PATH && fs.existsSync(KEY_PATH)) {
            credentials = JSON.parse(fs.readFileSync(KEY_PATH, 'utf-8'));
        } else if (KEY_B64) {
            const jsonStr = Buffer.from(KEY_B64, 'base64').toString('utf-8');
            credentials = JSON.parse(jsonStr);
        } else {
            console.error('No valid credentials source found');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const auth = new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
        const sheets = google.sheets({ version: 'v4', auth });

        const body = await req.json();

        // Extract form data
        const {
            formType,
            fullName,
            email,
            phone,
            message,
            propertyName,
            propertyCategory,
            project,
            budget,
            visitDate,
            visitTime
        } = body;

        // Validate required fields
        if (!fullName || !email || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get current date and time in IST (Asia/Kolkata)
        const now = new Date();
        const istDate = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }); // YYYY-MM-DD
        const istTime = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }); // HH:MM:SS

        // Prepare data for Google Sheets (order must match sheet columns, no timestamp)
        const rowData = [
            formType || 'contact',      // A: fromType
            fullName,                   // B: fullName
            email,                      // C: email
            phone,                      // D: phone
            propertyCategory || '',     // E: propertyCategory
            project || '',              // F: project
            budget || '',               // G: budget
            message || '',              // H: message
            propertyName || '',         // I: propertyName
            istDate,                    // J: visitDate (auto, IST)
            istTime                     // K: visitTime (auto, IST)
        ];

        // Write to Google Sheets
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A:K', // Adjust range based on your sheet structure
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: [rowData]
            }
        });

        console.log('Data written to Google Sheets:', response.data);

        return NextResponse.json({
            success: true,
            message: 'Form submitted successfully',
            data: {
                formType,
                fullName,
                email,
                phone,
                propertyName
            }
        });

    } catch (err) {
        console.error('Error submitting form:', err);
        return NextResponse.json({
            error: 'Failed to submit form',
            details: err instanceof Error ? err.message : 'Unknown error'
        }, { status: 500 });
    }
}
