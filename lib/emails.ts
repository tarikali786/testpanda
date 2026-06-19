import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const ADMIN_EMAIL = "tutorwiseau@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "TestPanda <noreply@testpanda.com.au>";

interface PaymentEmailData {
  userName: string;
  userEmail: string;
  productName: string;
  amount: number;
  sessionId: string;
  purchaseDate: string;
  validUntil: string;
  invoicePdfUrl?: string;
}

function userInvoiceHtml(d: PaymentEmailData): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Payment Confirmation</title></head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border:1px solid #e5e5e5;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed,#ec4899);padding:32px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:28px;letter-spacing:-0.5px;">TestPanda</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Australia's Smartest Exam Prep Platform</p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <h2 style="color:#111;margin:0 0 8px;font-size:22px;">Payment Confirmed!</h2>
      <p style="color:#555;margin:0 0 24px;">Hi ${d.userName}, your payment was successful. Here are your order details:</p>

      <!-- Invoice Box -->
      <div style="background:#f5f3ff;border:1px solid #e9d5ff;padding:24px;margin-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:#555;font-size:13px;padding-bottom:12px;">Order ID</td>
            <td style="color:#111;font-size:13px;text-align:right;padding-bottom:12px;font-family:monospace;">${d.sessionId.slice(-12).toUpperCase()}</td>
          </tr>
          <tr>
            <td style="color:#555;font-size:13px;padding-bottom:12px;">Product</td>
            <td style="color:#111;font-size:13px;text-align:right;padding-bottom:12px;font-weight:bold;">${d.productName}</td>
          </tr>
          <tr>
            <td style="color:#555;font-size:13px;padding-bottom:12px;">Purchase Date</td>
            <td style="color:#111;font-size:13px;text-align:right;padding-bottom:12px;">${d.purchaseDate}</td>
          </tr>
          <tr>
            <td style="color:#555;font-size:13px;padding-bottom:12px;">Access Valid Until</td>
            <td style="color:#111;font-size:13px;text-align:right;padding-bottom:12px;">${d.validUntil}</td>
          </tr>
          <tr style="border-top:1px solid #e9d5ff;">
            <td style="color:#111;font-size:16px;font-weight:bold;padding-top:12px;">Total Paid</td>
            <td style="color:#7c3aed;font-size:18px;font-weight:bold;text-align:right;padding-top:12px;">$${d.amount} AUD</td>
          </tr>
        </table>
      </div>

      <p style="color:#555;font-size:14px;">Your course materials will be shared via <strong>Google Drive</strong> within 24 hours to your email address: <strong>${d.userEmail}</strong></p>

      <!-- CTAs -->
      <div style="text-align:center;margin:32px 0;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a href="https://testpanda.vercel.app/dashboard" style="background:linear-gradient(135deg,#7c3aed,#ec4899);color:#ffffff;text-decoration:none;padding:14px 32px;font-size:15px;font-weight:bold;display:inline-block;">
          Go to Dashboard
        </a>
        ${d.invoicePdfUrl ? `<a href="${d.invoicePdfUrl}" style="background:#ffffff;border:2px solid #7c3aed;color:#7c3aed;text-decoration:none;padding:14px 32px;font-size:15px;font-weight:bold;display:inline-block;">
          Download Invoice PDF
        </a>` : ""}
      </div>

      <p style="color:#888;font-size:12px;border-top:1px solid #eee;padding-top:16px;margin:0;">
        If you have any questions, reply to this email or contact us at ${ADMIN_EMAIL}<br/>
        TestPanda — Australia's Smartest Exam Prep Platform
      </p>
    </div>
  </div>
</body>
</html>`;
}

function adminNotificationHtml(d: PaymentEmailData): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Payment</title></head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border:1px solid #e5e5e5;padding:32px;">
    <h2 style="color:#111;margin:0 0 16px;">New Payment Received</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;">
      <tr style="background:#f5f3ff;">
        <td style="padding:10px 16px;font-size:13px;color:#555;width:40%;">Customer Name</td>
        <td style="padding:10px 16px;font-size:13px;color:#111;font-weight:bold;">${d.userName}</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#555;">Customer Email</td>
        <td style="padding:10px 16px;font-size:13px;color:#111;">${d.userEmail}</td>
      </tr>
      <tr style="background:#f5f3ff;">
        <td style="padding:10px 16px;font-size:13px;color:#555;">Product</td>
        <td style="padding:10px 16px;font-size:13px;color:#111;font-weight:bold;">${d.productName}</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#555;">Amount</td>
        <td style="padding:10px 16px;font-size:16px;color:#7c3aed;font-weight:bold;">$${d.amount} AUD</td>
      </tr>
      <tr style="background:#f5f3ff;">
        <td style="padding:10px 16px;font-size:13px;color:#555;">Purchase Date</td>
        <td style="padding:10px 16px;font-size:13px;color:#111;">${d.purchaseDate}</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#555;">Stripe Session ID</td>
        <td style="padding:10px 16px;font-size:12px;color:#111;font-family:monospace;">${d.sessionId}</td>
      </tr>
      <tr style="background:#f5f3ff;">
        <td style="padding:10px 16px;font-size:13px;color:#555;">Access Valid Until</td>
        <td style="padding:10px 16px;font-size:13px;color:#111;">${d.validUntil}</td>
      </tr>
    </table>
    <p style="color:#555;font-size:13px;margin-top:16px;">
      Action required: Share Google Drive access with <strong>${d.userEmail}</strong> for <strong>${d.productName}</strong>.
    </p>
    ${d.invoicePdfUrl ? `<a href="${d.invoicePdfUrl}" style="display:inline-block;margin-top:8px;background:#7c3aed;color:#fff;padding:10px 20px;text-decoration:none;font-size:13px;font-weight:bold;">Download Invoice PDF</a>` : ""}
  </div>
</body>
</html>`;
}

export async function sendPaymentEmails(data: PaymentEmailData) {
  await Promise.all([
    resend.emails.send({
      from: FROM_EMAIL,
      to: data.userEmail,
      subject: `Payment Confirmed — ${data.productName} | TestPanda`,
      html: userInvoiceHtml(data),
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Payment: ${data.productName} — $${data.amount} AUD`,
      html: adminNotificationHtml(data),
    }),
  ]);
}
