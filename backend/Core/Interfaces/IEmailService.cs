using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Interfaces
{
    public interface IEmailService
    {
        int SendVerificationEmail(string link, string receiverAddress);
        int SendEmailChangeConfirmation(string link, string receiverAddress);
        int SendOrderUpdateEmail(int OrderId, string receiverAddress, string newStatus);
    }
}
