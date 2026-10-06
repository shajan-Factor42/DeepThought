/**
 * DeepThought lead catcher — Google Apps Script web app.
 * Receives the website's "Free Second Opinion" form, adds a row to the DeepThought Leads
 * sheet and emails the sheet owner. Paste into the sheet: Extensions > Apps Script.
 *
 * v2 (6 Oct 2026): adds Email, How they found us, First visit, First page, Time zone and a
 * phone check. New columns go after Notes (K–P), so existing rows and the Status/Notes
 * columns stay where they are. Leads with a non-US phone are marked "Check" instead of "New".
 */
const SHEET_ID = '1mRslUWDkAtXkYyrya8j_KQT6ssQbdZ_EswaZY5mwpFk';
const NEW_HEADERS = ['Email', 'How they found us (this visit)', 'First found us via', 'First visit', 'First page seen', 'Time zone'];

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return out_('ok');                       // spam trap field
  const name = clean_(p.name), phone = clean_(p.phone), biz = clean_(p.business);
  if (!name || !phone) return out_('missing fields');

  const digits = usDigits_(p.phone);
  const tz = clean_(p.timezone);
  const flags = [];
  if (!digits) flags.push('non-US phone');
  if (tz && !/^America\//.test(tz) && tz !== 'Pacific/Honolulu') flags.push('time zone ' + tz);
  const status = flags.length ? 'Check: ' + flags.join(', ') : 'New';

  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    ensureHeaders_(sheet);
    const when = Utilities.formatDate(new Date(), 'America/New_York', 'yyyy-MM-dd HH:mm');
    sheet.appendRow([when, name, "'" + phone, biz, clean_(p.page), clean_(p.place),
                     clean_(p.utm), clean_(p.referrer), status, '',
                     clean_(p.email), clean_(p.source), clean_(p.first_source), clean_(p.first_seen),
                     clean_(p.first_page), tz]);
  } finally {
    lock.releaseLock();
  }

  const to = Session.getEffectiveUser().getEmail();       // you, the owner
  const row = function (k, v) { return v ? '<tr><td style="color:#666;padding:2px 12px 2px 0">' + k + '</td><td>' + v + '</td></tr>' : ''; };
  MailApp.sendEmail({
    to: to,
    subject: (flags.length ? '[Check] ' : '') + 'New Second Opinion lead: ' + (biz || name),
    htmlBody:
      (flags.length ? '<p style="color:#B42318"><b>Check before calling:</b> ' + esc_(flags.join(', ')) + '. This may be spam or someone outside the US.</p>' : '') +
      '<p><b>' + esc_(name) + '</b> from <b>' + esc_(biz) + '</b> wants a free Second Opinion.</p>' +
      '<table style="font-size:14px">' +
      row('Phone', digits ? '<a href="tel:+1' + digits + '">' + esc_(phone) + '</a>' : esc_(phone)) +
      row('Email', p.email ? '<a href="mailto:' + esc_(p.email) + '">' + esc_(p.email) + '</a>' : '') +
      row('Found us via', esc_(p.source || 'unknown')) +
      row('First found us', esc_((p.first_source || '') + (p.first_seen ? ' on ' + p.first_seen : '') + (p.first_page ? ', landed on ' + p.first_page : ''))) +
      row('Form', esc_(p.page) + ' (' + esc_(p.place) + ')') +
      row('Time zone', esc_(tz)) +
      '</table>' +
      '<p><a href="https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit">Open the leads sheet</a></p>' +
      '<p>We promise a reply within one business day.</p>'
  });
  return out_('ok');
}

// Run this once from the editor to authorize and to check the row + email arrive.
function testLead() {
  doPost({ parameter: { name: 'Test Lead (delete me)', phone: '(770) 555-0100', email: 'test@example.com',
                        business: 'Test Plumbing, Lawrenceville', page: '/test', place: 'test', utm: '{}', referrer: '',
                        source: 'Google search', first_source: 'Google search', first_seen: '2026-10-06',
                        first_page: '/blog-home-services-marketing-gwinnett-county.html', timezone: 'America/New_York' } });
}

function ensureHeaders_(sheet) {
  if (sheet.getRange(1, 11).getValue() !== NEW_HEADERS[0]) {
    sheet.getRange(1, 11, 1, NEW_HEADERS.length).setValues([NEW_HEADERS]).setFontWeight('bold');
  }
}
function usDigits_(v) {                                  // 10-digit US/Canada number, or '' if not one
  let d = String(v || '').replace(/\D/g, '');
  if (d.length === 11 && d[0] === '1') d = d.slice(1);
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(d) ? d : '';
}
function clean_(v) {                                     // trim, cap length, block spreadsheet formulas
  return String(v || '').trim().slice(0, 300).replace(/^[=+\-@]/, "'$&");
}
function esc_(v) { return String(v || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function out_(t) { return ContentService.createTextOutput(t); }
