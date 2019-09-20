# Toggler Service System

Manages feature toggles for different services

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
    - [Also JSON Metadata API, Used for SDK generation](http://localhost:5000/swagger/v1/swagger.json)
- [Use rest API on: localhost:5000/api/](localhost:5000/api)
    - GET/POST/PUT/DELETE on [/api/toggle](http://localhost:5000/api/toggle)
    - GET/POST/PUT/DELETE on [/api/service](http://localhost:5000/api/service)
    - GET/POST/PUT/DELETE on [/api/ToggleState](http://localhost:5000/api/toggle)



## Usage


### OpenAPI - UI

![Open API Page](https://i.imgur.com/FvPHo6Z.png)

### UI API (React)

 - ![Base Page](https://i.imgur.com/cg2WPB1.png)
 -  Toggle
    - ![Toggle List](https://i.imgur.com/aHkZkOr.png)
    - ![Toggle Create](https://i.imgur.com/oPNtcNi.png)
    - ![Toggle Edit](https://i.imgur.com/oPNtcNi.png)
 - Services
    - ![Service List](https://i.imgur.com/Y1SGGru.png)
    - ![Service Create](https://i.imgur.com/vUx8MqJ.png)
    - ![Service Edit](https://i.imgur.com/qbeYIjg.png)
    - ![Service - Toggle Relation Manage](https://i.imgur.com/LDcx9R5.png)
        - ![Add Toggle Relation to a Given Service](https://i.imgur.com/vCkBdXk.png)
        - ![Edit toggle value for that service](https://i.imgur.com/HTBiW5T.png)
            - ![Edit toggle value for that service](https://i.imgur.com/MjvA6Xx.png)
 - Example Page
    - ![Edit toggle value for that service](https://i.imgur.com/lnTMVCw.png)


---

## License
[GPL3](https://choosealicense.com/licenses/gpl-3.0/#)



## Notes

- Toggler API service keeps waiting till mssql container ready to accept connections. This waiting feature was implemented with wait-for-it.
(https://github.com/vishnubob/wait-for-it)
- mssql and rabbitmq volumes, exist and are active by default in **docker-compose.yml**
- [Used Bootstrap Theme](https://bootswatch.com/journal/)

> Bootstrap Note: Bootstrap was used because is a well known UI library, easy to understand how the things were made.
> > No JQuery is used, the **react-bootstrap** removes the JQuery dependency

---

--

## Improvements for the future:

 - React Add Redux for a generic state management
 - Log System
 - C# SDK for api
    - (To better show the feature only the react one was generated/created)
 - Better Test Battery
    - Add Swagger generated ones for integration
    - Mockup RabbitMQ and database
 - Add UML documentation
 - Add multiple service workers on docker-compose
    - Multiple RabbitMQ instance + Redis Cluster (to centralize)
    - 

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


## Domain

![Domain Diagram](https://www.plantuml.com/plantuml/svg/hP4z2uCm48Rt_8eZOuj3rqxIkaX7I_SG3mdaGv9JaDB_tcXZgmXElINSyzvx7oGF93nrHiFTDOr6NpWZb6MC56cS8SoKUPGaR6JmZ1d4a5g4a0eZX1J7qXAKzI-lo2lRm0s73IimIAzQKivEsclRkI91k-qlpcbu2DtXkkPZNrQEj4BVApdZrRma_U-KwLrUmKyS3bdNPi2Di0DFuXckphGkgAzvrvJsNBlOE8_bQElufMy0)

## Deployment - Components

![Domain Diagram](
https://www.plantuml.com/plantuml/svg/bLAnRi8m4DtlAqvCNO9KTQz8cmeX0GK24w3AEDSq0knWEorLnR_t79mmG8Tci78lvtlltalFEc5SjTy1kCBj22T2RaLE5YDyrljIAr8EaqBaHkm1bCw8SUL4eSZW3m2KvmlOcUiytp4u4efhq-6lo8zifopxHfGVXSI59RDI0-N8l0j9J3KZ8TqQXSN-OW0d0BoU6qy6pSpbKsLPWBKur7aXrsSm4KvWB2NZzQWaljcCKOGlusJoEXZFwuOazf3VYexkhojtRSC90GuLLOGpiTaKRZG5OA5-mG0SS6BqyHjJBRVaC7LiGQsez31xnajYbEal5Jq6h3ungaf6l0MX3ZqjKVCIEiEyEfNM9zPfgpqPs_6Kigc2TMUbAPdFGjARUhl_1_fm2wtzkB2manTRCava8ooB6wNfTBXIRO0-gxKF-h9HsFNAUxX2mlONdjfFZgYD5JZJRhUXyJpG8vNnV_uB)

