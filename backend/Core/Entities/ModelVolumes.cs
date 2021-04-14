using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class ModelVolumes
    {
        public ModelVolumes()
        {
        }

        public ModelVolumes(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public double Volume { get; set; }
    }
}
