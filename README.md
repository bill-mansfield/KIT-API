# KIT-API
A RESTful JSON API using firebase cloud functions for the keepittight project -

Simple CRUD functionality.

Available end points:

Create document:
https://us-central1-kitt-da2fa.cloudfunctions.net/app/api/create

Example body:
    {
        "id": 1,
        "name": "North Terrace Stroll",
        "grade": "5.11b",
        "ascentType": "Red ball"
    }

Read all documents:
https://us-central1-kitt-da2fa.cloudfunctions.net/app/api/read

Example response:
    [
        {
            "id": "1",
            "name": "North Terrace Stroll",
            "grade": "25",
            "ascentType": "Flash"
        },
        {
            "id": "3",
            "name": "Trundle down rundle",
            "grade": "25",
            "ascentType": "Onsight"
        }
    ]

Read by ID:
https://us-central1-kitt-da2fa.cloudfunctions.net/app/api/read/1

Example response:
    {
        "id": "1",
        "name": "North Terrace Stroll",
        "grade": "25",
        "ascentType": "Flash"
    }

Upate by ID:
https://us-central1-kitt-da2fa.cloudfunctions.net/app/api/update/1

Delete by ID:
https://us-central1-kitt-da2fa.cloudfunctions.net/app/api/delete/1
