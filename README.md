# Toggler Service System


## Installation

```

// root of project

// Build the system (take a coffee...) 
docker-compose build
// Run project
docker-compose up

```

Open browser on:

- [Toggler Manager - React Page](http://localhost:5001/) 
- [Toggler Manager - React Page with The Toggler Example](http://localhost:5001/example) 
- [Open Api Documentation of the Toggler API](http://localhost:5000/swagger/index.html) 

Rest Requests:

- [Open Api Usage of the Toggler API](http://localhost:5000/swagger/index.html) 
- [Use rest API on: localhost:5000/api/](localhost:5000/api)
    - GET/POST/PUT/DELETE on [/api/toggle](http://localhost:5000/api/toggle)
    - GET/POST/PUT/DELETE on [/api/service](http://localhost:5000/api/service)
    - GET/POST/PUT/DELETE on [/api/ToggleState](http://localhost:5000/api/toggle)



## Usage


## License
[GPL3](https://choosealicense.com/licenses/gpl-3.0/#)



## Notes
- Toggler API service keeps waiting till mssql container ready to accept connections. This waiting feature was implemented with wait-for-it.
(https://github.com/vishnubob/wait-for-it)
- mssql and rabbitmq volumes are exist and active by defauls in docker-compose.yml

---

## Project Structure


### System (docker compose)


```bash
   .
    ├── docker-compose.yml                  # Docker compose configurations       
    ├── LICENSE
    ├── mssql_volume                        # Container MSSQL Instance
    |  ├── data                             # Persisted Data
    |  ├── log
    |  └── secrets
    ├── rabbitmq_volume                     # RabbitMQ Volumn of Container
    ├── README.md
    ├── services
    |  ├── TogglerApi                       # Toggle manage REST API
    |  └── utils
    ├── tools
    |  └── scripts
    └── ui  
        └── toggler-manager                 # React UI

```

### UI

```bash

   src 
    ├───components                  # Components
    │   ├───navbar
    │   ├───serviceComponents
    │   │   ├───createEdit
    │   │   └───list
    │   └───toggleComponents
    │       ├───createEdit
    │       ├───list
    │       └───toggle
    │           └───accessLayer
    ├───pages                       # Views
    │   ├───exampleView
    │   ├───home
    │   ├───servicesViews
    │   │   ├───create
    │   │   ├───edit
    │   │   ├───list
    │   │   ├───relations
    │   │   └───view
    │   └───toggleViews
    │       ├───toggleCreateView
    │       ├───toggleEditView
    │       ├───toggleListView
    │       └───toggleView
    ├───sdk                         # Clients
    │   └───togglerApiClient                    # TogglerAPI OpenAPI typescript client
    └───state                       # Redux

```

### API

```bash

ToggleAPI
    ├───Context             # Data Context
    ├───Controllers         # Rest Controllers
    ├───Migrations
    ├───Models
    │   └───Toggle          # Domain
    ├───RabbitMQ            # RabbitMQ Client
    └───scripts

```
