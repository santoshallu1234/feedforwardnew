import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '../models/UserModel'
import { emitWarning } from 'process';
import Link from 'next/link';
import { link } from 'fs';
import QRCode from 'qrcode';
/*const extra = `<p>Click <a href="${process.env.DOMAIN}/
            verifyemail?token=${hashedToken}"> here </a> to 
            ${emailType === 'VERIFY' ? "verify your email" : "reset your pass"}
            or copy paste the link below in yout browser.
            <br>
            </p>
            `
*/
export  const sendEmailQr = async(email) => 
{
      try{
        console.log("function called");
        const transporter = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            port:465,
            auth: {
                user: "santoshallu1234@gmail.com",
                pass: "spufdfwtjmtkhoqr"
              },
          
          });
           
        console.log(email.email);
        console.log(email.src);
       const reciver = {
        from: 'santoshallu1234@gmail.com', // sender address
        to: email.email, // list of receivers
        subject: 'attendance qr code ', // Subject line
        text: "registered for event and this is your qr code", // plain text body
        html: `<p>Click 
               <br>
                <img src="${email.src}" alt="QR Code" />
                <h2>${email.email} </h2>
            </p>
            `, // html body
        attachments: [
                {
                  filename: 'qr-code.png ',
                  content: email.src.split('base64,')[1],
                  encoding: 'base64',
                },
            ],     
       }
       const info = await transporter.sendMail(reciver);
       return info;
       // const info = await transporter.sendMail(reciver);
       // console.log("Message sent: %s", info.messageId);
       // return info;

         }
      catch(error){
          throw new Error(error.message);
      }
}