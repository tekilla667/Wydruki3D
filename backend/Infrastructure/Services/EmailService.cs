using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        SmtpClient client = new SmtpClient("smtp.mailtrap.io", 2525)
        {
            Credentials = new NetworkCredential("4e7180d21f4674", "7c74c438232a93"),
            EnableSsl = true
        };
        public int SendEmailChangeConfirmation(string link, string receiverAddress)
        {
            try
            {
                
                MailMessage msg = new MailMessage();
                msg.To.Add(receiverAddress);
                msg.From = new MailAddress("Drukarexwydruki@gmail.com");
                msg.Subject = "Weryfikacja zmiany adresu Email";
                msg.Body = "Aby zmienić swój adres email kliknij link: " + link;
                client.Send(msg);
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

   
        public int SendOrderUpdateEmail(int OrderId, string receiverAddress, string newStatus)
        {
            try
            {
               
                MailMessage msg = new MailMessage();
                msg.To.Add(receiverAddress);
                msg.From = new MailAddress("Drukarexwydruki@gmail.com");
                msg.Subject = "Nowy status zamówienia";
                msg.Body = "Twoje zamówienie numer: " + OrderId.ToString() + "zmieniło status na: " + newStatus;
                client.Send(msg);
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int SendVerificationEmail(string link, string receiverAddress)
        {
            try
            {
                
                MailMessage msg = new MailMessage();
                msg.To.Add(receiverAddress);
                msg.From = new MailAddress("Drukarexwydruki@gmail.com");
                msg.Subject = "Weryfikacja adresu Email";
                msg.Body = "Oto link weryfikacyjny Twojego adresu email: " + link;
                client.Send(msg);
                return 1;
            }
            catch(Exception ex)
            {
                Console.WriteLine("Nie wysłano emaila :(");
                return 0;
            }
        }
    }
}
