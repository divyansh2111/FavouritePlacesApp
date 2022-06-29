const GOOGLE_API_KEY = "AIzaSyDrWUH0eZJ9L1XLVZlE9YNwx2CKsuYpL6Q";

export function getMapPreview(lat, lng) {
  const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imageUrl;
}

export const getAddress = async (lat, lng) => {
  const addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const res = await fetch(addressUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch Address!");
  }

  const data = await res.json();
  address = data.results[0].formatted_address;

  return address;
};
