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
            subject: 'Uptask - Confirma tu cuenta',
            text: 'Uptask - Confirma tu cuenta',
            html: `<p>Hi ${user.name} you have been created an account in Uptask, it's almost everything already, you just need to confirm your account</p>
                <p>Visit the following link:</p>
                <a href="">Confirm Account</a>
                <p>And enter the code: ${user.token}</p>
                <p>It expires in 10 minutes</p>
            `
        })
    }
}