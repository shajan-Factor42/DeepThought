/**
 * DeepThought lead catcher — Google Apps Script web app.
 * Receives the website's "Free Second Opinion" form, adds a row to the DeepThought Leads
 * sheet and emails the sheet owner. Paste into the sheet: Extensions > Apps Script.
 */
const SHEET_ID = '1mRslUWDkAtXkYyrya8j_KQT6ssQbdZ_EswaZY5mwpFk';

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return out_('ok');                       // spam trap field
  const name = clean_(p.name), phone = clean_(p.phone), biz = clean_(p.business);
  if (!name || !phone) return out_('missing fields');

  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    const when = Utilities.formatDate(new Date(), 'America/New_York', 'yyyy-MM-dd HH:mm');
    sheet.appendRow([when, name, "'" + phone, biz, clean_(p.page), clean_(p.place),
                     clean_(p.utm), clean_(p.referrer), 'New', '']);
  } finally {
    lock.releaseLock();
  }

  const to = Session.getEffectiveUser().getEmail();       // you, the owner
  const digits = String(p.phone || '').replace(/\D/g, '');
  MailApp.sendEmail({
    to: to,
    subject: 'New Second Opinion lead: ' + (biz || name),
    htmlBody:
      '<p><b>' + esc_(name) + '</b> from <b>' + esc_(biz) + '</b> wants a free Second Opinion.</p>' +
      '<p>Phone: <a href="tel:+1' + digits.slice(-10) + '">' + esc_(phone) + '</a></p>' +
      '<p>Page: ' + esc_(p.page) + ' (' + esc_(p.place) + ')<br>Source: ' + esc_(p.utm || 'none') +
      '<br>Referrer: ' + esc_(p.referrer || 'none') + '</p>' +
      '<p><a href="https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit">Open the leads sheet</a></p>' +
      '<p>We promise a reply within one business day.</p>'
  });
  return out_('ok');
}

// Run this once from the editor to authorize and to check the row + email arrive.
function testLead() {
  doPost({ parameter: { name: 'Test Lead', phone: '770-555-0100', business: 'Test Plumbing, Lawrenceville',
                        page: '/test', place: 'test', utm: '{}', referrer: '' } });
}

function clean_(v) {                                     // trim, cap length, block spreadsheet formulas
  return String(v || '').trim().slice(0, 300).replace(/^[=+\-@]/, "'$&");
}
function esc_(v) { return String(v || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function out_(t) { return ContentService.createTextOutput(t); }
