using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Core.Entities
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Oczekiwanie na zapłatę")]
        Pending,
        [EnumMember(Value = "Płatność zaksięgowana")]
        PaymentRecevied,
        [EnumMember(Value = "Płatność zakończona niepowodzeniem")]
        PaymentFailed,
        [EnumMember(Value = "Wysłano")]
        Sent
    }
}
