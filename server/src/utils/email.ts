

import { BrevoClient } from "@getbrevo/brevo";

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY as string,
});

export const sendVerificationEmail = async (
  email: string,
  username: string,
  token: string
) => {
  const verificationUrl =
    `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  try {
    const response =
      await client.transactionalEmails.sendTransacEmail({
        sender: {
          name: "PulseBeat",
          email: process.env.BREVO_SENDER_EMAIL as string,
        },

        to: [
          {
            email,
            name: username,
          },
        ],

        subject: "Verify your PulseBeat account",

        htmlContent: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Welcome to PulseBeat, ${username}!</h2>

            <p>
              Thanks for creating your PulseBeat account.
              Please verify your email address to continue.
            </p>

            <a
              href="${verificationUrl}"
              style="
                display: inline-block;
                padding: 12px 20px;
                background: #22c55e;
                color: white;
                text-decoration: none;
                border-radius: 8px;
              "
            >
              Verify Email
            </a>

            <p>
              This verification link will expire in 24 hours.
            </p>
          </div>
        `,
      });

    // console.log("Brevo email sent successfully:", response);

    return response;
  } catch (error) {
    console.error("Brevo email error:", error);
    throw error;
  }
};


export const sendPasswordResetEmail = async (
  email: string,
  username: string,
  token: string
) => {
  const resetUrl =
    `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  try {
    const response =
      await client.transactionalEmails.sendTransacEmail({
        sender: {
          name: "PulseBeat",
          email: process.env.BREVO_SENDER_EMAIL as string,
        },

        to: [
          {
            email,
            name: username,
          },
        ],

        subject: "Reset your PulseBeat password",

        htmlContent: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Reset your PulseBeat password</h2>

            <p>
              Hi ${username},
            </p>

            <p>
              We received a request to reset your PulseBeat
              account password.
            </p>

            <p>
              Click the button below to create a new password.
            </p>

            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                padding: 12px 20px;
                background: #22c55e;
                color: white;
                text-decoration: none;
                border-radius: 8px;
              "
            >
              Reset Password
            </a>

            <p style="margin-top: 20px;">
              This password reset link will expire in 1 hour.
            </p>

            <p>
              If you didn't request a password reset,
              you can safely ignore this email.
            </p>
          </div>
        `,
      });

    return response;
  } catch (error) {
    console.error(
      "Brevo password reset email error:",
      error
    );

    throw error;
  }
};