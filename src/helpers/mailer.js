import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '../models/UserModel'

/*const extra = `<p>Click <a href="${process.env.DOMAIN}/
            verifyemail?token=${hashedToken}"> here </a> to 
            ${emailType === 'VERIFY' ? "verify your email" : "reset your pass"}
            or copy paste the link below in yout browser.
            <br>
            </p>
            `
*/
export const sendEmail = async({email,emailType,userId}) => 
{
      try{
        console.log("function called");
        const hashedToken = await bcryptjs.hash(userId.toString(),10);
       
        if(emailType === "VERIFY"){
          const oho =  await User.findByIdAndUpdate(userId ,
                { $set: { verifyToken : hashedToken ,
                    verifyTokenExpiry : Date.now()+ 3600000}
        });
          
        }else if (emailType === "RESET"){
                await User.findByIdAndUpdate(userId,
                    {$set: {forgotPasswordToken : hashedToken ,
                        forgotPasswordTokenExpiry : Date.now()+ 3600000}})
            };
          
       
        const transporter = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            port:465,
            auth: {
                user: "santoshallu1234@gmail.com",
                pass: "spufdfwtjmtkhoqr"
              }
          });
           
        console.log(email);
       const reciver = {
        from: 'santoshallu1234@gmail.com', // sender address
        to: email, // list of receivers
        subject: emailType === "VERIFY" ? 'verify your email ' :'reset your passwword', // Subject line
        text: "Hello world?", // plain text body
        html: `<p>Click <a href="http://localhost:3000/verifyemail?token=${hashedToken}"> here </a> to 
            ${emailType === 'VERIFY' ? "verify your email" : "reset your pass"}
            or copy paste the link below in yout browser.
            <br>
            </p>
            `, // html body
     
       }
       const info = await transporter.sendMail(reciver);
       console.log("Message sent: %s", info.messageId);
       return info;

         }
      catch(error){
          throw new Error(error.message);
      }
}