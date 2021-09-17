using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagement.ApplicationClasses;
using EmployeeManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        readonly EmployeeContext EmpDetails;
        public EmployeeController(EmployeeContext employeeContext)
        {
            EmpDetails = employeeContext;
        }

        [HttpGet]
        public IEnumerable<EmployeeClass> Get()
        {
            List<EmployeeClass> employees = new List<EmployeeClass>();
            var empData = EmpDetails.Employee.Include(x=>x.Department).Include(x=>x.Designation).ToList();
            foreach (var item in empData)
            {
                EmployeeClass employee = new EmployeeClass
                {
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    Designation = EmpDetails.Designation.FirstOrDefault(x => x.Id == item.DesignationId)?.DesignationName,
                    Department = EmpDetails.Department.FirstOrDefault(x => x.Id == item.DepartmentId)?.DepartmentName,
                    HaveKnowledgeOf = item.HaveKnowledgeOf,
                    Salary = item.Salary,
                    JoiningDate = item.JoiningDate,
                    ReportingPerson = EmpDetails.Employee.FirstOrDefault(x => x.Id == item.ReportingPerson)?.FirstName

                };
                employees.Add(employee);
            }
            return employees;
        }

        [Route("GetDesignation")]
        [HttpGet]
        public IEnumerable<Designation> GetDesignation()
        {
            var data = EmpDetails.Designation.ToList();
            return data;
        }

        [Route("GetDepartment")]
        [HttpGet]
        public IEnumerable<Department> GetDepartment()
        {
            var data = EmpDetails.Department.ToList();
            return data;
        }

       


        [HttpPost]
        public IActionResult Post([FromBody] Employee obj)
        {
            var data = EmpDetails.Employee.Add(obj);
            EmpDetails.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Employee obj)
        {
            var data = EmpDetails.Employee.Update(obj);
            EmpDetails.SaveChanges();
            return Ok();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var data = EmpDetails.Employee.Where(a => a.Id == id).FirstOrDefault();
            EmpDetails.Employee.Remove(data);
            EmpDetails.SaveChanges();
            return Ok();

        }
    }
}
