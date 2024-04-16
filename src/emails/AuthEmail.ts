import { transporter } from "../config/nodemailer";

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        await transporter.sendMail({
            from: 'Uptask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - Confirm your account',
            text: 'Uptask - Confirm your account',
            html: `<p>Hi ${user.name} you have been created an account in Uptask, it's almost everything already, you just need to confirm your account</p>
                <p>Visit the following link:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirm Account</a>
                <p>And enter the code: ${user.token}</p>
                <p>It expires in 10 minutes</p>
            `
        })
    }

    static sendForgotPasswordEmail = async (user: IEmail) => {
        await transporter.sendMail({
            from: 'Uptask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - Reset your Password',
            text: 'Uptask - Reset your Password',
            html: `<p>Hi ${user.name} you have requested to reset your password, please visit the following link</p>
                <p>Visit the following link:</p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Reset your password</a>
                <p>And enter the code: ${user.token}</p>
                <p>It expires in 10 minutes</p>
            `
        })
    }
}