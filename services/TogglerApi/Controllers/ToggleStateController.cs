using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TogglerApi.Models.Toggle;
using TogglerApi.Context;
using Microsoft.EntityFrameworkCore;
using TogglerApi.RabbitMQ;

namespace TogglerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToggleStateController : ControllerBase
    {


        /// <summary>
        /// Toggle context to the database
        /// </summary>
        private readonly ToggleContext _toggleContext;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="context"></param>
        public ToggleStateController(ToggleContext context)
        {
            _toggleContext = context;
        }



        // GET api/toggle/state
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToggleState>>> Get()
        {
            return await _toggleContext.States.ToListAsync();
        }

        // GET api/toggle/state/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToggleState>> Get(long id)
        {
            var toReturn = await _toggleContext.States.FindAsync(id);

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
            _toggleContext.States.Add(value);
            await _toggleContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = value.Id }, value);
        }

        // PUT api/toggle/state
        [HttpPut]
        public async Task<IActionResult> Put(long id, [FromBody] ToggleState toggleState)
        {
            if (id != toggleState.Id)
            {
                return BadRequest();
            }

            _toggleContext.Entry(toggleState).State = EntityState.Modified;
            await _toggleContext.SaveChangesAsync();

            // publish toggleState change
            RabbitMqClient.Publish(new TogglerStateMessage
            {
                ToggleKey = toggleState.Toggle.Key,
                Value = toggleState.Value
            }, toggleState.Service.Key);

            return NoContent(); // 204 (No Content), according to HTTP specification
        }

        
        // Patch toggle/state
        [HttpPatch]
        public async Task<IActionResult> Patch(long id, [FromBody] ToggleState toggleState)
        {
            if (id != toggleState.Id)
            {
                return BadRequest();
            }

            _toggleContext.Entry(toggleState).State = EntityState.Modified;
            await _toggleContext.SaveChangesAsync();

            // publish toggleState change
            RabbitMqClient.Publish(new TogglerStateMessage
            {
                ToggleKey = toggleState.Toggle.Key,
                Value = toggleState.Value
            }, toggleState.Service.Key);

            return NoContent(); // 204 (No Content), according to HTTP specification
        }


        // DELETE api/toggle/state/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var state = await _toggleContext.States.FindAsync(id);

            if (state == null)
            {
                return NotFound();
            }

            _toggleContext.States.Remove(state);
            await _toggleContext.SaveChangesAsync();

            return NoContent();
        }
    }

    public class TogglerStateMessage : IMessage
    {

        /// <summary>
        /// The toggle key that is altered
        /// </summary>
        /// <value></value>
        public string ToggleKey { get; set; }

        /// <summary>
        /// Teh serviceToggle Value
        /// </summary>
        /// <value></value>
        public bool Value { get; set; }
    }
}
