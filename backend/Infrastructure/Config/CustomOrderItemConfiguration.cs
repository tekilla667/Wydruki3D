using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Config
{
    public class CustomOrderItemConfiguration : IEntityTypeConfiguration<CustomOrderItem>
    {
        public void Configure(EntityTypeBuilder<CustomOrderItem> builder)
        {
            builder.Property(i => i.Price)
               .HasColumnType("decimal(18,2)");
        }
    }
}
