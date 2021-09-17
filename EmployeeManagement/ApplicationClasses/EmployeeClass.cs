using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.ApplicationClasses
{
    public class EmployeeClass
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int DesignationId { get; set; }
        public string Designation { get; set; }
        public int DepartmentId { get; set; }
        public string Department { get; set; }
        public string HaveKnowledgeOf { get; set; }
        public double Salary { get; set; }
        public DateTime JoiningDate { get; set; }
        public string ReportingPerson { get; set; } 
    }
}
