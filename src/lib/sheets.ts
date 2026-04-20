import { google } from 'googleapis'
import type { Activity } from '@/types/activity'
import { parseActivity } from './transforms'

const SHEET_NAME = 'Actividades'
const RANGE = `${SHEET_NAME}!A:I`

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
}

export async function getActivities(): Promise<Activity[]> {
  try {
    const auth = getAuth()
    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: RANGE,
    })

    const rows = response.data.values
    if (!rows || rows.length < 2) return []

    const [_headers, ...dataRows] = rows

    return dataRows
      .map(parseActivity)
      .filter((a): a is Activity => a !== null)
  } catch (error) {
    console.error('Error fetching activities from Google Sheets:', error)
    return []
  }
}