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
        /// Toggle context to the database
        /// </summary>
        private readonly ToggleContext _toggleContext;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="context"></param>
        public ServiceController(ToggleContext context)
        {
            _toggleContext = context;
        }



        // GET api/service
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> Get()
        {
            return await _toggleContext.Services.ToListAsync();
        }

        // GET api/service/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> Get(long id)
        {
            var toReturn = await _toggleContext.Services.FindAsync(id);

            if (toReturn == null)
            {
                return NotFound();
            }

            return toReturn;
        }


        // GET api/service/5/states
        [HttpGet("{id}/states")]
        public async Task<ActionResult<IEnumerable<ToggleState>>> GetServiceStates(long id)
        {
            var toReturn = await _toggleContext.Services.FindAsync(id);

            if (toReturn == null)
            {
                return NotFound();
            }

            return toReturn.States;
        }


        // POST api/service
        [HttpPost]
        public async Task<ActionResult<Service>> Post([FromBody] Service value)
        {
            _toggleContext.Services.Add(value);
            await _toggleContext.SaveChangesAsync();
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

            _toggleContext.Entry(value).State = EntityState.Modified;
            await _toggleContext.SaveChangesAsync();

            return NoContent(); // 204 (No Content), according to HTTP specification
        }


        // Patch api/service
        [HttpPatch]
        public async Task<IActionResult> Patch(long id, [FromBody] Service value)
        {
            if (id != value.Id)
            {
                return BadRequest();
            }

            _toggleContext.Entry(value).State = EntityState.Modified;
            await _toggleContext.SaveChangesAsync();

            return NoContent(); // 204 (No Content), according to HTTP specification
        }

        // DELETE api/service/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var services = await _toggleContext.Services.FindAsync(id);

            if (services == null)
            {
                return NotFound();
            }

            _toggleContext.Services.Remove(services);
            await _toggleContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
