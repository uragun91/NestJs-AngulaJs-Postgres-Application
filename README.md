# AngularJS and NestJS TXT files uploading application

## Prerequisits

Install `docker` and `docker-compose` on your machine.

## Running the app

In the root folder run the following command:

```bash
docker-compose up --build --remove-orphans --force-recreate
```

The application will be available on `http://localhost:5000`. Backend is running in watch debug mode, so you can play with it, if you need it.

## Instructions

First sign up. Then login. After that you will be able to list and upload `.txt` files. Uploading page shows you the content of the file before uploading and gives you the link to dowload it after uploading. Files should be not more than 5mb. You can download up to 20 files in the row.
