## Administration Guide
### Installation
### Connecting to databases
### Managing user accounts
### Annotating data for your users
### Setting up email
### Production Deployments
* Beanstalk
* running a container
    * injecting database variables vs using an embedded database
* running a jar
    * where to put the database?
* HTTPS!
	* if beanstalk, use an ELB and terminate there
	* otherwise, recommend nginx as a proxy + provide instructions
