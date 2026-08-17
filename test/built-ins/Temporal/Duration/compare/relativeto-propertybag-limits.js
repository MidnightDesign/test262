// Copyright (C) 2026 Rudolph Gottesheim. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.duration.compare
description: Property bags at the edges of the representable range
info: |
  GetTemporalRelativeToOption ( _options_ )

  7. If _timeZone_ is ~unset~, then
    a. Let _plainDate_ be ? CreateTemporalDate(_isoDate_, _calendar_).
features: [Temporal]
---*/

const instance = new Temporal.Duration(0, 0, 0, 0, 0, /* minutes = */ 5);
const blankInstance = new Temporal.Duration();

// A property bag is range-checked when it is converted, exactly as the
// equivalent ISO string is while it is parsed.

const validPropertyBags = [
  { year: 275760, month: 9, day: 13 },
  { year: -271821, month: 4, day: 20 },
];

for (const relativeTo of validPropertyBags) {
  Temporal.Duration.compare(instance, blankInstance, { relativeTo });
}

const invalidPropertyBags = [
  { year: 275760, month: 9, day: 14 },
  { year: -271821, month: 4, day: 18 },
  { year: 300000, month: 1, day: 1 },
  { year: -300000, month: 1, day: 1 },
];

for (const relativeTo of invalidPropertyBags) {
  const label = `{ year: ${relativeTo.year}, month: ${relativeTo.month}, day: ${relativeTo.day} }`;
  assert.throws(
    RangeError,
    () => Temporal.Duration.compare(instance, blankInstance, { relativeTo }),
    `${label} is outside the representable range for a relativeTo parameter`
  );
}
