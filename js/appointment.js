// ══════════════════════════════════════════════════════
//  Pratibha Ultra Scan Center — Appointment Page Logic
// ══════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────

// ── Mobile Hamburger Menu ─────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Set today as minimum date ─────────────────────────
const dateInput = document.getElementById('b-date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ── Generate a simple receipt ID ──────────────────────
function generateReceiptId() {
    const ts  = Date.now().toString(36).toUpperCase();
    const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `PUSC-${ts}-${rnd}`;
}

// ── Format date for display ───────────────────────────
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Form Submission ───────────────────────────────────
const bookingForm    = document.getElementById('bookingForm');
const formSection    = document.getElementById('formSection');
const receiptSection = document.getElementById('receiptSection');
const waBtn          = document.getElementById('waBtn');
const newApptBtn     = document.getElementById('newApptBtn');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate required fields — highlight red if empty
    const fields = bookingForm.querySelectorAll('[required]');
    let valid = true;
    fields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            valid = false;
        } else {
            field.classList.remove('error');
        }
    });
    if (!valid) return;

    // Collect values
    const name    = document.getElementById('b-name').value.trim();
    const phone   = document.getElementById('b-phone').value.trim();
    const date    = document.getElementById('b-date').value;
    const time    = document.getElementById('b-time').value;
    const service = document.getElementById('b-service').value;
    const note    = document.getElementById('b-note').value.trim() || 'None';
    const receiptId = generateReceiptId();

    // Fill receipt display
    document.getElementById('receiptId').textContent  = `Receipt ID: ${receiptId}`;
    document.getElementById('r-name').textContent     = name;
    document.getElementById('r-phone').textContent    = phone;
    document.getElementById('r-date').textContent     = formatDate(date);
    document.getElementById('r-time').textContent     = time;
    document.getElementById('r-service').textContent  = service;
    document.getElementById('r-note').textContent     = note;

    // Build WhatsApp message — clean, beautiful formatting
    const message =
`━━━━━━━━━━━━━━━━━━━━━━━━━
*APPOINTMENT RECEIPT*
*Pratibha Ultra Scan Center*
_Ranaghat, West Bengal_
━━━━━━━━━━━━━━━━━━━━━━━━━

*Receipt ID:* \`${receiptId}\`

*PATIENT DETAILS*
> *Name:*    ${name}
> *Phone:*   ${phone}

*APPOINTMENT*
> *Date:*    ${formatDate(date)}
> *Time:*    ${time}
> *Service:* ${service}
> *Notes:*   ${note}

━━━━━━━━━━━━━━━━━━━━━━━━━
_Please arrive 10 minutes before your slot._
_Address: Jagpur Road, Anulia, Ranaghat_
_Near Sub-Divisional Hospital, Nadia 741201_
_Call: +91 74790 02181 / +91 96415 80544_
━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Set WhatsApp link (sends to the clinic's number)
    const encodedMsg = encodeURIComponent(message);
    waBtn.href = `https://wa.me/?text=${encodedMsg}`;

    // Swap form → receipt
    formSection.style.display    = 'none';
    receiptSection.classList.add('visible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Book Another Appointment ──────────────────────────
newApptBtn.addEventListener('click', () => {
    bookingForm.reset();
    receiptSection.classList.remove('visible');
    formSection.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
