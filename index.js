// Time to do some sketchy s**t... doo da doo da,
// Hope I get away with it oh doo da day

const type = 'application/javascript';

const getCrossOriginWorkerURL = (originalWorkerUrl, _options = {}) => {

  const options = {
    skipSameOrigin: true,
    useBlob: true,

    ..._options,
  };

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
const _fixImports = (url) => new URL(url, '${workerPath.join('/') + '/'}').href;
importScripts = (...urls) => _importScripts(...urls.map(_fixImports));`;

        let finalURL = `data:${type},` + encodeURIComponent(importScriptsFix + codeString);

        if (options.useBlob) {
          finalURL = URL.createObjectURL(
            new Blob([`importScripts("${finalURL}")`], { type })
          )
        }

        resolve(finalURL);
      })
      .catch(reject)
  );
};

module.exports = getCrossOriginWorkerURL;
