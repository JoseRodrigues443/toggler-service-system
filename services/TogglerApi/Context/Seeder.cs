using TogglerApi.Models.Toggle;
using TogglerApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
namespace TogglerApi.Context
{
    public class Seeder
    {

        /// <summary>
        /// Seeds the database
        /// </summary>
        /// <param name="context"> Context to use</param>
        /// <param name="numberOfRelations"></param>
        /// <returns>Creation state</returns>
        public static bool SeedModel(ToggleContext context, int numberOfRelations = 5)
        {
            var rand = new Random();

            string seedMask = "Seed_" + rand.NextDouble() + "_";

            var toggles = BuildToggles(numberOfRelations, seedMask);
            var services = BuildServices(numberOfRelations, seedMask);
            // failed creation
            if (toggles == null || services == null | toggles.Count != numberOfRelations || services.Count != numberOfRelations)
            {
                return false;
            }

            context.Toggles.AddRange(toggles);
            context.Services.AddRange(services);

            // Create relations
            var states = BuildStates(toggles, services);

            // States
            context.States.AddRange(states);

            // Saved all with success
            return context.SaveChanges() == (toggles.Count + services.Count + states.Count);
        }

        /// <summary>
        /// Build States to be persisted
        /// </summary>
        /// <param name="toggles"></param>
        /// <param name="services"></param>
        /// <returns></returns>
        public static List<ToggleState> BuildStates(List<Toggle> toggles, List<Service> services)
        {
            List<ToggleState> toReturn = new List<ToggleState>();
            for (int i = 0; i < toggles.Count; i++)
            {
                toReturn.Add(
                    new ToggleState
                    {
                        ToggleId = toggles[i].Id,
                        Toggle = toggles[i],
                        ServiceId = services[i].Id,
                        Service = services[i],
                        Value = i % 2 == 0 // even ones have the value true
                    }
                );
            }
            return toReturn;
        }



        /// <summary>
        /// Build Toggles to persist
        /// </summary>
        /// <param name="numberOfRelations"></param>
        /// <param name="seedMask"></param>
        /// <returns></returns>
        public static List<Toggle> BuildToggles(int numberOfRelations, string seedMask)
        {
            List<Toggle> toReturn = new List<Toggle>();
            for (int i = 0; i < numberOfRelations; i++)
            {
                toReturn.Add(
                    new Toggle
                    {
                        Description = seedMask + "Description_" + i,
                        Key = seedMask + "TestToggler_" + i
                    }
                );
            }
            return toReturn;
        }

        /// <summary>
        /// Build Services to persist
        /// </summary>
        /// <param name="numberOfRelations"></param>
        /// <param name="seedMask"></param>
        /// <returns></returns>
        public static List<Service> BuildServices(int numberOfRelations, string seedMask)
        {
            List<Service> toReturn = new List<Service>();
            for (int i = 0; i < numberOfRelations; i++)
            {
                toReturn.Add(
                    new Service
                    {
                        Description = seedMask + "Description_" + i,
                        Key = seedMask + "TestService_" + i
                    }
                );
            }
            return toReturn;
        }

    }
}
