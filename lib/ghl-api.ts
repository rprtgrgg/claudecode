/**
 * GHL (GoHighLevel) API client
 *
 * To connect to the real GHL API:
 * 1. Create a .env.local file with:
 *    GHL_API_KEY=your_api_key_here
 *    GHL_LOCATION_ID=your_location_id_here
 *
 * 2. Replace the mock data imports in each page with calls to the functions below.
 *
 * GHL API docs: https://highlevel.stoplight.io/docs/integrations
 */

const BASE_URL = 'https://services.leadconnectorhq.com'

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  }
}

export async function getContacts(locationId = process.env.GHL_LOCATION_ID) {
  const res = await fetch(`${BASE_URL}/contacts/?locationId=${locationId}&limit=100`, {
    headers: getHeaders(),
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`GHL contacts fetch failed: ${res.status}`)
  return res.json()
}

export async function getOpportunities(locationId = process.env.GHL_LOCATION_ID) {
  const res = await fetch(`${BASE_URL}/opportunities/search?location_id=${locationId}&limit=100`, {
    headers: getHeaders(),
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`GHL opportunities fetch failed: ${res.status}`)
  return res.json()
}

export async function getCampaigns(locationId = process.env.GHL_LOCATION_ID) {
  const res = await fetch(`${BASE_URL}/campaigns/?locationId=${locationId}`, {
    headers: getHeaders(),
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`GHL campaigns fetch failed: ${res.status}`)
  return res.json()
}

export async function getAppointments(locationId = process.env.GHL_LOCATION_ID) {
  const res = await fetch(`${BASE_URL}/appointments/?locationId=${locationId}`, {
    headers: getHeaders(),
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`GHL appointments fetch failed: ${res.status}`)
  return res.json()
}
