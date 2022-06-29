import * as SQLite from "expo-sqlite";
import { Place } from "../models/places";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          //   console.log("boom");
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertPlaces(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          //   console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];

          result.rows._array.map((dp) => {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                { address: dp.address, lat: dp.lat, lng: dp.lng },
                dp.id
              )
            );
          });

          //   console.log(places);
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function searchPlaces(id) {
  //   console.log("ID", id);
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          const places = [];

          result.rows._array.map((dp) => {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                { address: dp.address, lat: dp.lat, lng: dp.lng },
                dp.id
              )
            );
          });

          //   console.log(places[0]);
          resolve(places[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
