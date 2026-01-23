import express from 'express';

//import { Prisma } from '../../generated/prisma/client.js'; // not sure about this, although it matches what was in database/prisma

import { prisma } from '../database/prisma.js';

const layout = express.Router();

// GET
// layout.get('/', (req, res) => {
//   res.status(200).send('LAYOUT GET');
// });


//READ: This should get all public layouts.
layout.get('/public', async (req, res) => {
  //console.log(req.params)
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

//READ: This route will load one layout by id.
layout.get('/:layoutId', async (req, res) => {
  //needed to be converted to number
  const layoutId = Number(req.params.layoutId);
  try {
    const layout = await prisma.layout.findUnique({
      where: { id: layoutId },
      include: {
        layoutElements: {
          include: { widget: true }
        }
      }
    });

    if(!layoutId){
      return res.status(404).send('Could find layout:');
    }
    res.status(200).send(layout)
  } catch (error) {
    res.status(500).send({'Could not load layout:': error})
  }
})



export default layout;