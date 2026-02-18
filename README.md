# Reactivities Project Repository

This project is being developed as part of the course "Complete Guide to Building an App with .NET Core and React" on [Udemy](https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react).

The goal of this repository is to:

 - Follow the course step by step
 - Practice building a full-stack application with ASP.NET Core and React
 - Experiment beyond the course material where appropriate
 - Document my learning progress

While the foundation follows the course structure, I may introduce custom improvements, refactoring, or additional features over time.

# Running the project

You can currentlu only run this app locally. Most of the functionality will work except for the photo upload which would require you to sign up to Cloudinary (free) and use your own API keys here.  You need to have the following installed on your computer for this to work:

1. .Net SDK v9
2. NodeJS (at least version 18+ or 20+)
3. git (to be able to clone the project repo)

Once you have these then you can do the following: 
1. Clone the project in a User folder on your computer by running:

```bash
# you will of course need git installed to run this
git clone https://github.com/TryCatchLearn/Reactivities.git
cd Reactivities
```
2. Restore the packages by running:

```bash
# From the solution folder (Reactivities)
dotnet restore

# Change directory to client to run the npm install.  Only necessary if you want to run
# the react app in development mode using the Vite dev server
cd client
npm install
```

3. If you wish for the photo upload to work create a file called appsettings.json in the Reactivities/API folder and copy/paste the following configuration.

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "CloudinarySettings": {
    "CloudName": "REPLACEME",
    "ApiKey": "REPLACEME",
    "ApiSecret": "REPLACEME"
  },
  "AllowedHosts": "*"
}
```
4. Create an account (free of charge, no credit card required) at https://cloudinary.com and then replace the Cloudinary keys in the appsettings.json file with your own cloudinary keys.

5. You can then run the app and browse to it locally by running:

```bash
# run this from the API folder in one terminal/command prompt
cd API
dotnet run

# open another terminal/command prompt tab and run the following
cd client
npm run dev

```

6. You can then browse to the app on https://localhost:3000 and login with either of the test users:

    email: bob@test.com or tom@test.com
    
    password: Pa$$w0rd 
