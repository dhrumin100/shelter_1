import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// ✅ Validate env variables
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const RAW_CREDENTIALS = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON;

if (!SHEET_ID || !RAW_CREDENTIALS) {
    throw new Error('Missing GOOGLE_SHEET_ID or GOOGLE_SERVICE_ACCOUNT_KEY_JSON in environment variables');
}

// ✅ Convert escaped newlines to actual newlines
const credentials = JSON.parse(RAW_CREDENTIALS.replace(/\\n/g, '\n'));

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            formType,
            fullName,
            email,
            phone,
            propertyCategory,
            project,
            budget,
            message,
            propertyName,
            propertyLocation,
            propertyType,
            propertyPrice,
        } = body;

        const sheets = google.sheets({ version: 'v4', auth });

        // ✅ Format timestamp in IST
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const istOffset = 5.5 * 60 * 60000;
        const istNow = new Date(utc + istOffset);
        const pad = (n: number) => n.toString().padStart(2, '0');
        let hours = istNow.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        const formattedTimestamp = `${pad(istNow.getDate())}-${pad(istNow.getMonth() + 1)}-${istNow.getFullYear()} ${pad(hours)}:${pad(istNow.getMinutes())}:${pad(istNow.getSeconds())} ${ampm} (IST)`;

        // ✅ Prepare row for Google Sheet
        const row = [
            formattedTimestamp,
            formType || '',
            fullName || '',
            email || '',
            phone || '',
            propertyCategory || '',
            project || '',
            budget || '',
            message || '',
            propertyName || '',
            propertyLocation || '',
            propertyType || '',
            propertyPrice || '',
        ];

        // ✅ Append to sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [row],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
    }
}
