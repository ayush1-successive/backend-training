// This file is to be removed later on.

Jobs Module:

GetAll query Response -
{
    status: true/false,
    data: job listings (array),
    count: array_size
}

-> Check RapidGate.api

module should have 15 properties
use ant design react

papa pass package / csv to json (for uploading data)

upload in batches of 1000


Bulk Upload Entity Interface {
bulk upload ID
start time
end time
error records
csv file name (from which we are uploading data)
succussful entries count
failed entries count
status: still running or not
}

-------------------------------------------------------------------------------------

user module

config
	IConfig.ts
	configuration.ts
lib
	base
		baseRepository
		BaseSchema
	Middlewares
	utils
	Entities
		Base.ts
		BaseSchema.ts
		BaseInterface.ts
	response-handler
		StatusCodes.ts
		SystemResponse.ts
Modules
	users
		routes.ts
		controller.ts
		services.ts
		repositories
			Repository.ts
			Schema.ts
			Model.ts
		index.ts
		validation.ts
		helpers.ts
	Entities
		ITodo.ts
		ITodoQueryGet.ts
		ITodoQueryPost.ts
router.ts
server.ts


--------------------------------------------------------------------


UsersSchema
	name
	phone-no
	email
	address
	password (b-crypt)

--------------------------------------------------------------------

Module - Yours
	CRUD -> Authenticated Routes

	
