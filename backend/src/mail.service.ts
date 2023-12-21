/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mail.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/10 12:08:39 by mhugueno          #+#    #+#             */
/*   Updated: 2023/10/10 12:31:16 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'donotreplypeachill@gmail.com',
                pass: 'zkppnlksupxazxqj'
            }
        });
    }

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: '"Peachill" donotreplypeachill@gmail.com',
            to: to,
            subject: subject,
            text: text,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
