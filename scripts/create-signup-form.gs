/**
 * Let's Pepper — tournament signup form generator.
 *
 * One-shot Apps Script. Paste into https://script.google.com,
 * run createSignupForm(), grant the requested OAuth scopes,
 * and copy the URLs that print to the execution log.
 *
 * What it creates:
 *   - A Google Form titled "Let's Pepper — Team Signup"
 *   - A linked Google Sheet (auto-created on first response)
 *   - All fields below, in order
 *
 * Re-running creates a NEW form each time. To edit fields on an
 * existing form, open the form's edit URL directly.
 */

function createSignupForm() {
  const form = FormApp.create("Let's Pepper — Team Signup");

  form.setDescription(
    "Sign your team up for an upcoming Let's Pepper tournament. " +
    "Questions? DM @letspepper on Instagram."
  );
  form.setCollectEmail(true);
  form.setConfirmationMessage(
    "You're in. We'll DM your captain on Instagram to confirm. " +
    "See you on the sand."
  );

  // --- Captain ---
  form.addTextItem()
    .setTitle('Captain name')
    .setRequired(true);

  form.addTextItem()
    .setTitle("Captain's Instagram handle")
    .setHelpText('Without the @. We DM confirmations here.')
    .setRequired(true);

  // --- Event ---
  form.addMultipleChoiceItem()
    .setTitle('Which tournament are you playing in?')
    .setChoiceValues([
      'Bell Pepper Open — June 7, 2026',
      'Jalapeño Open — July 18, 2026',
      'Poblano Open — August 1, 2026',
    ])
    .setRequired(true);

  // --- Team ---
  form.addParagraphTextItem()
    .setTitle('Teammates (one per line)')
    .setHelpText('Full names. Include yourself if you want — we copy/paste this into the bracket.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Team name (optional)')
    .setHelpText('What should we call you on the bracket?');

  // --- Link a Sheet for the organizer ---
  const sheet = SpreadsheetApp.create("Let's Pepper — Signups");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // --- Output ---
  const formUrl = form.getPublishedUrl();
  const editUrl = form.getEditUrl();
  const embedUrl = formUrl.replace('/viewform', '/viewform?embedded=true');
  const sheetUrl = sheet.getUrl();

  Logger.log('=== DONE ===');
  Logger.log('Public form (share this):     ' + formUrl);
  Logger.log('Embed URL (for letspepper):   ' + embedUrl);
  Logger.log('Edit form (you):              ' + editUrl);
  Logger.log('Responses sheet (organizer):  ' + sheetUrl);
}
