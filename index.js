const Circuit = require('opossum')

const mib = 1048576
const options = {
  timeout: false,
  rollingCountTimeout: 5000,
  rollingCountBuckets: 5,
  rollingPercentilesEnabled: false
}
const circuit = new Circuit(memoryUsed, options)
const startMemory = memoryUsed()
let endMemory

function second() { return 1000 }
function minute() { return 60*second() }
function hour() { return 60*minute() }
function day() { return 24*hour() }

// run the test for 12 hours
setTimeout(end, day()/2)

start()

// fire the circuit, adding two random integers
// then do it again a half second later
async function start() {
  endMemory = await circuit.fire()
  // console.log(`Memory used: ${endMemory} MiB`)
  setTimeout(start, 500)
}

// A simple function that we can use in our circuit
function memoryUsed() {
  return (process.memoryUsage.rss())/mib
}

// Clean up and print results
function end() {
  console.log(`
  Start memory: ${startMemory}
  End memory: ${endMemory}

  Difference: ${endMemory - startMemory}
`)
  process.exit()
}

