# CrossOriginWorker
Method to run worker from other origins.

Workaround for the following error:
```
Uncaught (in promise) DOMEXception: Failed to construct 'Worker' (...) cannot be accessed from origin (...)
```

This solution works better than BLOB-based solutions, and doesnt break `importScripts`.
Some APIs like BarcodeDetector aren't working when executing worker this way. I don't know why.

## Usage
```
npm install crossoriginworker
```

```
import crossoriginworker from 'crossoriginworker';

async function createWorker() {
  const workerURL = await crossoriginworker('https://somedomain.com/lib/awesome.worker.js');
  return new Worker(workerURL);
}

const myWorker = await createWorker();
```
