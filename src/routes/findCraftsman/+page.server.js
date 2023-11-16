import { redirect } from '@sveltejs/kit'
import { getCraftsmenWithinBuffer } from '$lib/usersdb.js'

const craftsmanTypes = {
  "plombier": "Plombier",
  "electricien": "Électricien",
  "serrurier": "Serrurier",
  "artisan_polyvalent": "Polyvalent"
}

export const load = async ({ locals, url }) => {
  // redirect user if not logged in
  if (!locals.user) {
    throw redirect(302, '/')
  }
  let coordsStr = "2.420317180618753, 48.85162094533567"
  let coordsParsed
  if (url.searchParams.get('coordinates')) {
    coordsParsed = JSON.parse(url.searchParams.get('coordinates')).coordinates
  } else
  {
    coordsParsed = coordsStr.split(',').map(coordinate => parseFloat(coordinate.trim()));
  }
  const craftsmen = await getCraftsmenWithinBuffer(coordsParsed)
  craftsmen.forEach(craftsman => {
    craftsman.professionDisplay = craftsmanTypes[craftsman.profession]
  })
  return {
    coordsParsed,
    craftsmen
  }
}