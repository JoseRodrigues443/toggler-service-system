using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TogglerApi.Models.Toggle;
using TogglerApi.Context;


namespace TogglerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToggleController : ControllerBase
    {

        /// <summary>
        /// Toggle context to the database
        /// </summary>
        private readonly ToggleContext _toggleContext;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="context"></param>
        public ToggleController(ToggleContext context)
        {
            _toggleContext = context;
        }



        // GET api/toggle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Toggle>>> Get()
        {
            return await _toggleContext.Toggles.ToListAsync();
        }

        // GET api/toggle/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Toggle>> Get(long id)
        {
            var toReturn = await _toggleContext.Toggles.FindAsync(id);

            if (toReturn == null)
            {
                return NotFound();
            }

            return toReturn;
        }


        // POST api/toggle
        [HttpPost]
        public async Task<ActionResult<Toggle>> Post([FromBody] Toggle value)
        {
            _toggleContext.Toggles.Add(value);
            await _toggleContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = value.Id }, value);
        }

        // PUT api/toggle
        [HttpPut]
        public async Task<IActionResult> Put(long id, [FromBody] Toggle value)
        {
            if (id != value.Id)
            {
                return BadRequest();
            }

            _toggleContext.Entry(value).State = EntityState.Modified;
            await _toggleContext.SaveChangesAsync();

            return NoContent(); // 204 (No Content), according to HTTP specification
        }

        // Patch api/toggle
        [HttpPatch]
        public async Task<IActionResult> Patch(long id, [FromBody] Toggle value)
        {
            if (id != value.Id)
            {
                return BadRequest();
            }

            _toggleContext.Entry(value).State = EntityState.Modified;
            await _toggleContext.SaveChangesAsync();

            return NoContent(); // 204 (No Content), according to HTTP specification
        }

        // DELETE api/toggle/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var toggle = await _toggleContext.Toggles.FindAsync(id);

            if (toggle == null)
            {
                return NotFound();
            }

            _toggleContext.Toggles.Remove(toggle);
            await _toggleContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
