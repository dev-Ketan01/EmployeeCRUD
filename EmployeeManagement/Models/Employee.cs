using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Models
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long DesignationId { get; set; }

        [ForeignKey("DesignationId")]
        public virtual Designation Designation { get; set; }

        public long DepartmentId { get; set; }

        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; }

        public string HaveKnowledgeOf { get; set; }
        public double Salary { get; set; }
        public DateTime JoiningDate { get; set; }

        public int ReportingPerson { get; set; }

    }
}
