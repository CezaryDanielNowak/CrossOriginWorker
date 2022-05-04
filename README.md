# CrossOriginWorker
Method to run worker from other origins.

Workaround for the following error:
```
Uncaught (in promise) DOMEXception: Failed to construct 'Worker' (...) cannot be accessed from origin (...)
```

This solution doesnt break `importScripts`.
This method allows to use `BarcodeDetector` in a Worker from 3rd party origin.

## Installation
```
npm install crossoriginworker
```

## Usage
```
import getCrossOriginWorkerURL from 'crossoriginworker';

async function createWorker() {
  const workerURL = await getCrossOriginWorkerURL('https://somedomain.com/lib/awesome.worker.js');
  return new Worker(workerURL);
}

const myWorker = await createWorker();
```

## Options
CrossOriginWorker has several options, that might be useful in some instances:

```
  getCrossOriginWorkerURL(url, OPTIONS);
```

### options.skipSameOrigin (default true)
When worker is hosted on the same domain, load it right away.

### options.useBlob (default true)
Create additional proxy Blob that contains worker code. Disable in case of problems.
