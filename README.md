# Queueing Time Calculation Based on Number of Barbers and Customers

### Get Started

## Add or register new barber
POST http://localhost:3005/api/barber/create

Request body:
```json
{
  "name": "John Doe",
  "id": 1
}
```

Response:
```json
{
  "status": "OK",
  "message": "Barber details saved",
  "name": "John Doe",
  "id": 1
}
```

## Add or increment customer waiting count
POST http://localhost:3005/api/customer-count/add

Request Body:
```json
{
  "count": 2
}
```

Response:
```json
{
  "_id": "654bb0802af7d4ad8e77f025",
  "day": "11/9/2023",
  "timestamp": 1699459179142,
  "done": 0,
  "ongoing": 0,
  "waiting": 2,
  "__v": 0
}
```

## Start Barber Service

POST http://localhost:3005/api/barber/start

Request Body:
```json
{
  "id": 1
}
```

Response:
```json
{
  "status": "OK",
  "message": "John Doe started",
  "startTimestamp": 1699493281801,
  "endTimestamp": 1699495081801
}
```

## Get Queue Waiting Time

GET http://localhost:3005/api/customer-count/waiting-time

Response:

```json
{
  "hours": 0,
  "minutes": 58,
  "seconds": 42
}
```

*Ive added a CronJob to automatically lets the barber start a new service to another customer*
