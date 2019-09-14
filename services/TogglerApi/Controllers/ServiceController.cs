using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TogglerApi.Models.Toggle;
using TogglerApi.Context;
using Microsoft.EntityFrameworkCore;

namespace TogglerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {

        /// <summary>
        /// Service context to the database
        /// </summary>
        private readonly ServiceContext _serviceContext;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="context"></param>
        public ServiceController(ServiceContext context)
        {
            _serviceContext = context;
        }



        // GET api/service
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> Get()
        {
            return await _serviceContext.Services.ToListAsync();
        }

        // GET api/service/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> Get(long id)
        {
            var toReturn = await _serviceContext.Services.FindAsync(id);

            if (toReturn == null)
            {
                return NotFound();
            }

            return toReturn;
        }


        // POST api/service
        [HttpPost]
        public async Task<ActionResult<Service>> Post([FromBody] Service value)
        {
            _serviceContext.Services.Add(value);
            await _serviceContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = value.Id }, value);
        }

        // PUT api/service
        [HttpPut]
        public async Task<IActionResult> Put(long id, [FromBody] Service value)
        {
            if (id != value.Id)
            {
                return BadRequest();
            }

            _serviceContext.Entry(value).State = EntityState.Modified;
            await _serviceContext.SaveChangesAsync();

            return NoContent(); // 204 (No Content), according to HTTP specification
        }

        // DELETE api/service/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var services = await _serviceContext.Services.FindAsync(id);

            if (services == null)
            {
                return NotFound();
            }

            _serviceContext.Services.Remove(services);
            await _serviceContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
