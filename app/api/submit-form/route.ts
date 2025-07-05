import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON!);

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { formType, fullName, email, phone, propertyCategory, project, budget, message, propertyName, propertyLocation, propertyType, propertyPrice } = body;
        const sheets = google.sheets({ version: 'v4', auth });
        // Format timestamp as 'DD-MM-YYYY hh:mm:ss AM/PM (IST)'
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const istOffset = 5.5 * 60 * 60000;
        const istNow = new Date(utc + istOffset);
        const pad = (n: number) => n.toString().padStart(2, '0');
        let hours = istNow.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedTimestamp = `${pad(istNow.getDate())}-${pad(istNow.getMonth() + 1)}-${istNow.getFullYear()} ${pad(hours)}:${pad(istNow.getMinutes())}:${pad(istNow.getSeconds())} ${ampm} (IST)`;
        const row = [
            formattedTimestamp, // Human-readable Timestamp
            formType || '',          // Form Type
            fullName || '',          // Full Name
            email || '',             // Email
            phone || '',             // Phone
            propertyCategory || '',  // Property Category
            project || '',           // BHK/Type
            budget || '',            // Budget
            message || '',           // Message
            propertyName || '',      // Property Name
            propertyLocation || '',  // Property Location
            propertyType || '',      // Property Type
            propertyPrice || '',     // Property Price
        ];
        await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A1', // Change 'Sheet1' if your tab is named differently
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: [row] },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
    }
} 