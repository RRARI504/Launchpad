import { readFile } from 'node:fs/promises';
import express from 'express';

import type { Event } from '../../types/Event.ts';

const router = express.Router();

async function getDummyData() {
  const dummyJson = await readFile('./data/dummydata.json', "utf8"); // relative to project root, apparently

  return JSON.parse(dummyJson);
}

router.get('/', async (req, res) => {
  try {
    const response = await getDummyData();

    const events: [Event] = response.data.items.map((event: Event) => {
      return {
        summary: event.summary,
        id: event.id,
        start: event.start,
        end: event.end
      }
    });

    res.status(200).send(events);

  } catch (error) {
    console.error('Failed to get calendar data:', error);
    res.sendStatus(500);
  }
});


export default router;
