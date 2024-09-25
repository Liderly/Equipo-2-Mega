# API Documentation

## Configuration

Go to `appsettings.json` file to add Database connection string:

```json
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MegaHackathon;User Id=sa;Password=YOUR_PASSWORD_HERE;TrustServerCertificate=true;"
  }
```

## Running API

On Terminal, make sure to be located at directory `/backend/Mega`, then run:

```Bash
dotnet run
```

You'll see on a new line with _url + port_ in which the server is listening (_`Now listening on: http://localhost:5009`_).
In your prefered browser, access the url and locate on the `Swagger UI`:

```Bash
http://localhost:5009/swagger
```

## Database

Database name: `MegaHackathon`

E-R Model of our data base:

![er-image](Mega/public/dbe-rdiagram.PNG)

![endopoints](Mega/public/endopoints-api.PNG)
