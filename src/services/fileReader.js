export default {
  readJsonFile(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      };
      fileReader.onerror = (e) => {
        reject(e);
      };
      fileReader.readAsText(file);
    });
  },
};
