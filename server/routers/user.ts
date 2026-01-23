import express from 'express';
import passport from 'passport';
import { User } from '../../generated/prisma/client.js' // * 'User' Type.

import { prisma } from '../database/prisma.js';

const user = express.Router();

// GET

// This is a temporary example function. It demonstrates how to 
user.get('/', (req : any, res) => {
  if (req.user) {
    prisma.user.findUnique({where: {id: req.user.id}}).then((user: any) => { // ? Open Request: Update 'any' to accurately reflect what it is. It should be a User, but it freaks out when it is.
      res.status(200).send(user.name);
    })
  } else {
    res.status(200).send('You are not logged in.');
  }
});

user.post('/create', async (req, res) => {
  const { name }: { name: string} = req.body;

  try {
    await prisma.user.create({
      data: {
        name,
        credentialProvider: "",
        credentialSubject: 0
      }
    });

    console.log("Created user... hopefully");
    res.sendStatus(201);
  } catch (error) {
    console.error("Failed to create user:", error);
    res.sendStatus(500);
  }
});

export default user;
