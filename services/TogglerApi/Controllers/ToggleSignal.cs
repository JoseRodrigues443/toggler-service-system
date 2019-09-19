using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TogglerApi.RabbitMQ;

namespace TogglerApi.Controllers
{
    public class SignalRToggle : Hub
    {


        public Task ToggleStateSignal(IMessage message)
        {

            List<String> ConnectionIDToIgnore = new List<String>();
            ConnectionIDToIgnore.Add(Context.ConnectionId);
            return Clients.AllExcept(ConnectionIDToIgnore).SendAsync("IncrementCounter");
        }
    }
}
