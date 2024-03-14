import { useEffect, useState } from "react";
import { LocalStorageMethod, StorageModelFactory } from "../storage";

/**
 * React hook for managing form data in local storage.
 *
 * @example
 * // In a React component
 * import useOfflineStorage from './useOfflineStorage';
 *
 * function MyComponent() {
 *   const { createOfflineDataEntry, findOfflineData, updateOfflineDataEntry } = useOfflineStorage();
 *
 *   // Use the hook to create, find, or update data
 *   createOfflineDataEntry({ species: 'Grouper', numberOfFish: 10 });
 *   findOfflineData({ uuid: '1234' });
 *   updateOfflineDataEntry({ species: 'Grouper', numberOfFish: 100 }, { uuid: '1234' });
 *   const allEntries = findOfflineData().map((entry) => entry[1]);
 *
 *   // Render the component
 *   return <div>{JSON.stringify(allEntries)}</div>;
 * }
 *
 * export default MyComponent;
 *
 * @returns {Object} The storage methods for creating, finding, and updating data, e.g. `{ createOfflineDataEntry, findOfflineData, updateOfflineDataEntry }`.
 */
function useOfflineStorage() {
  /**
   * Initialize the storage method to use and pass in the required parameters, e.g. LocalStorageMethod("formData") or IndexedDBMethod("dbName", "dbVersion").
   * @type {LocalStorageMethod or IndexedDBMethod}
   * @example const storageMethod = new LocalStorageMethod("formData");
   */
  const storageMethod = new LocalStorageMethod(import.meta.env.VITE_LOCAL_STORAGE_KEY);

  /**
   * Create the Storage Model and pass in the `storageMethod` that was initialized above, e.g. `storageMethod`.
   * @type {StorageModelFactory}
   * @example const storageModel = StorageModelFactory.createModel(storageMethod);
   */
  const storageModel = StorageModelFactory.createModel(storageMethod);

  /**
   * Create data in the storage.
   *
   * @param {Object} data - The data to create, e.g. { numberOfFish: "1", species: "Grouper" }.
   * @returns {Promise} A promise that resolves when the data is created.
   */
  function createOfflineDataEntry(data) {
    return storageModel.create(data);
  }

  /**
   * Find data in the storage.
   *
   * @param {Object} criteria - The criteria to use for finding data, e.g. { uuid: "1234" }.
   * @returns {Promise} A promise that resolves with the found data.
   */
  function findOfflineData(criteria) {
    return storageModel.find(criteria);
  }

  /**
   * Update data in the storage.
   *
   * @param {Object} criteria - The criteria to use for updating data, e.g. { uuid: "1234" }.
   * @param {Object} data - The new data.
   * @returns {Promise} A promise that resolves when the data is updated, e.g. { numberOfFish: "10", species: "Grouper" }.
   */
  function updateOfflineDataEntry(criteria, data) {
    return storageModel.update(criteria, data);
  }

  return {
    createOfflineDataEntry,
    findOfflineData,
    updateOfflineDataEntry,
  };
}

export default useOfflineStorage;
