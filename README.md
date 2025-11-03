# Saralweb SDE Assignment — Merge Discontinuous Time Ranges

This repository contains a NodeJS module that merges discontinuous time ranges into sorted, non-overlapping intervals, treating small gaps below a threshold as continuous.

## Project Contents
- `my-module.js` — Exports `mergeTimeRanges(ranges, threshold)` per the assignment signature.
- `demo.js` — Runs the three provided examples and prints outputs.
- `readme.file` — You are here.

## Requirements
- Node.js (v14+ recommended, any modern version works)
- No external dependencies

## Installation & Setup
- Clone or download this folder.
- Ensure Node.js is installed.

## Usage
Import the function and call it with an array of `[start, end)` ranges and a `threshold` in milliseconds.

```js
const { mergeTimeRanges } = require('./my-module.js');

const ranges = [
  [1000, 2000],
  [2500, 4000],
  [3900, 4100]
];

const threshold = 200; // gaps strictly smaller than 200ms will be merged
const merged = mergeTimeRanges(ranges, threshold);
console.log(merged);
```

### Function Signature
```
mergeTimeRanges(ranges: Array<[number, number]>, threshold: number): Array<[number, number]>
```

### Behavior Notes
- Ranges use half-open semantics: `[start, end)` includes `start` and excludes `end`.
- Overlaps merge when `next.start <= current.end`.
- Gaps merge when `(next.start - current.end) < threshold` (strictly smaller). If the gap is `>= threshold`, ranges do not merge.
- Invalid ranges where `end <= start` are ignored.
- Non-finite values are ignored.
- `threshold <= 0` behaves like merging only overlaps; touching ranges are not merged when `threshold === 0`.

## Run the Demo
From the project directory:

```
node demo.js
```

Expected outputs for the provided examples:

Example 1 (threshold = 200)
```
[ [1000, 2000], [2500, 4100], [8000, 9500] ]
```

Example 2 (threshold = 4)
```
[ [0, 10], [15, 20], [25, 30] ]
```

Example 3 (threshold = 3)
```
[ [0, 35] ]
```

## Edge Cases
- `[]` returns `[]`.
- Ranges with `end <= start` are skipped.
- Negative or non-finite `threshold` is treated as `0`.
- Works with unsorted input and large timestamps.

## Complexity
- Time: `O(n log n)` due to sorting, followed by a linear pass.
- Space: `O(n)` for filtered and merged arrays.

## Submission Guidelines
- Email the code as a NodeJS module to `careers@saralweb.com` with subject `SDE Assignment - Nov 2025`.
- If email attachment is restricted, check in to GitHub and share the link in your email.
- Ensure at minimum `my-module.js` is included and matches the required signature.

## Notes
- No external libraries are used.
- The module is self-contained and ready to drop into other NodeJS projects.
