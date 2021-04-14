using Core.Entities.OrderEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class OrderAddress
    {
        public OrderAddress()
        {
        }

        public OrderAddress(string firstName, string lastName, string street, string city, string postCode)
        {
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            City = city;
            PostCode = postCode;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
      
    }
}
