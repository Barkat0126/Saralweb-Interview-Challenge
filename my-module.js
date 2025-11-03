/**
 * Merges discontinuous time ranges within a given threshold.
 *
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */
const mergeTimeRanges = (ranges, threshold) => {
  // Handle trivial inputs
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  // Normalize threshold: treat invalid/negative values as 0
  const t = Math.max(0, Number.isFinite(threshold) ? threshold : 0);

  // Filter invalid or empty ranges and copy values
  const clean = ranges
    .filter(
      (r) =>
        Array.isArray(r) &&
        r.length === 2 &&
        Number.isFinite(r[0]) &&
        Number.isFinite(r[1]) &&
        r[1] > r[0]
    )
    .map(([s, e]) => [s, e]);

  if (clean.length === 0) return [];

  // Sort by start ascending, then end ascending
  clean.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));

  const merged = [];
  let [curStart, curEnd] = clean[0];

  for (let i = 1; i < clean.length; i++) {
    const [s, e] = clean[i];

    // Overlap or within threshold gap: merge
    // Overlap: s <= curEnd
    // Gap merge: (s - curEnd) < t (strictly smaller than threshold)
    if (s <= curEnd || (s - curEnd) < t) {
      if (e > curEnd) curEnd = e;
    } else {
      // Gap is >= threshold: finalize current interval
      merged.push([curStart, curEnd]);
      curStart = s;
      curEnd = e;
    }
  }

  merged.push([curStart, curEnd]);
  return merged;
};

module.exports = {
  mergeTimeRanges,
};