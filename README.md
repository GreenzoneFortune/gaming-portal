# GreenZone Online Casino — GitHub Pages v2

## Included
- GreenZone logo in `/image/greenzone-logo.jpg`
- Game platform directory
- Gateway section
- Notice board
- Countdown timers for Free Play and Largest Win
- Email / WhatsApp / Telegram contact cards
- Player support form
- Complaint box
- Google Sheets integration through Google Apps Script

## Google Sheets setup

A GitHub Pages static website cannot securely write to a Google Sheet by itself. Use a Google Apps Script Web App as the small server-side bridge.

1. Create a Google Sheet, e.g. `GreenZone Player Support`.
2. Open **Extensions → Apps Script**.
3. Replace the script with:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.type || "",
    data.name || "",
    data.contact || "",
    data.platform || "",
    data.preferred || "",
    data.message || ""
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Create a sheet tab named `Responses` and add headers:
`Timestamp | Type | Name | Contact | Platform | Preferred Contact | Message`
5. Click **Deploy → New deployment → Web app**.
6. Set **Execute as: Me** and choose the access setting appropriate for your intended audience.
7. Copy the Web App `/exec` URL.
8. Open `script.js` and replace:
`PASTE_YOUR_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE`
with your `/exec` URL.
9. Upload the updated files to GitHub Pages.

### Important privacy note
Only collect information you actually need for support. Do not collect passwords, account PINs, full card numbers, crypto private keys, or other payment credentials through this form. Review applicable privacy, gambling, advertising, age-verification, and data-protection requirements before publishing.

## Updating the timers

In `script.js`, edit:

```javascript
const events={
 free:{title:"Next Free Play",date:"2026-10-01T20:00:00-05:00"},
 win:{title:"Next Largest Win Update",date:"2026-10-01T20:00:00-05:00"}
};
```

Use an ISO 8601 date/time with the correct timezone for your event.

## GitHub Pages

Upload the contents of this folder to a repository, then:
**Settings → Pages → Deploy from branch → main → root**.
