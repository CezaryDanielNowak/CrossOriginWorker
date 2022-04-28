const getLocalWorkerUrl = (originalWorkerUrl) => {
  if (!originalWorkerUrl.includes('://') || originalWorkerUrl.includes(window.location.origin)) {
    // The same origin - Worker will run fine
    return Promise.resolve(originalWorkerUrl);
  }

  return new Promise((resolve, reject) =>
    fetch(originalWorkerUrl)
      .then((res) => res.text())
      .then((codeString) => {
        let workerPath = new URL(originalWorkerUrl).href.split('/');
        workerPath.pop();

        const importScriptsFix = `const _importScripts = importScripts;
importScripts = (...urls) => {

  return _importScripts(...urls.map((url) => new URL(url, '${workerPath.join('/') + '/'}').href))
};`;

        resolve('data:application/javascript,' + encodeURIComponent(importScriptsFix + codeString));
      })
      .catch(reject)
  );
};

module.exports = getLocalWorkerUrl;
