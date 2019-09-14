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
    public class ToggleStateController : ControllerBase
    {

        /// <summary>
        /// Toggle context to the database
        /// </summary>
        private readonly ToggleStateContext _toggleStateContext;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="context"></param>
        public ToggleStateController(ToggleStateContext context)
        {
            _toggleStateContext = context;
        }



        // GET api/toggle/state
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToggleState>>> Get()
        {
            return await _toggleStateContext.States.ToListAsync();
        }

        // GET api/toggle/state/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToggleState>> Get(long id)
        {
            var toReturn = await _toggleStateContext.States.FindAsync(id);

            if (toReturn == null)
            {
                return NotFound();
            }

            return toReturn;
        }


        // POST api/toggle/state
        [HttpPost]
        public async Task<ActionResult<ToggleState>> Post([FromBody] ToggleState value)
        {
            _toggleStateContext.States.Add(value);
            await _toggleStateContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = value.Id }, value);
        }

        // PUT api/toggle/state
        [HttpPut]
        public async Task<IActionResult> Put(long id, [FromBody] ToggleState value)
        {
            if (id != value.Id)
            {
                return BadRequest();
            }

            _toggleStateContext.Entry(value).State = EntityState.Modified;
            await _toggleStateContext.SaveChangesAsync();

            return NoContent(); // 204 (No Content), according to HTTP specification
        }

        // DELETE api/toggle/state/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var state = await _toggleStateContext.States.FindAsync(id);

            if (state == null)
            {
                return NotFound();
            }

            _toggleStateContext.States.Remove(state);
            await _toggleStateContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
