import express from 'express';

//import { Prisma } from '../../generated/prisma/client.js'; // not sure about this, although it matches what was in database/prisma

import { prisma } from '../database/prisma.js';

const layout = express.Router();

// GET
layout.get('/', (req, res) => {
  res.status(200).send('LAYOUT GET');
});


//this should get all public layouts
layout.get('/public', async (req, res) => {
  try {
    const layouts = await prisma.layout.findMany({
      where: {
        public: true
      },
      include: {
        layoutElements: {
          include: {
            widget: true
          }
        }
      }
    })
    res.status(200).send(layouts)
  } catch (error) {
    res.status(500).send({'Could not fetch public layouts:': error})
  }

})






export default layout;