const DAY_MS = 24 * 60 * 60 * 1000;
const eligibleStatuses = new Set(['reviewed', 'stable']);

export function parseDateOnly(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const [year, month, day] = value.split('-').map(Number);
  const timestamp = Date.UTC(year, month - 1, day);
  const parsed = new Date(timestamp);

  if (
    parsed.getUTCFullYear() !== year
    || parsed.getUTCMonth() !== month - 1
    || parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return Math.floor(timestamp / DAY_MS);
}

export function normalizeThresholdDays(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Freshness thresholds must contain at least one day value.');
  }

  const normalized = [...new Set(values)].sort((left, right) => left - right);
  if (normalized.some((value) => !Number.isInteger(value) || value < 0)) {
    throw new Error('Freshness thresholds must be unique non-negative integers.');
  }

  return normalized;
}

function categoryFor(id) {
  return id.includes('/') ? id.split('/', 1)[0] : 'root';
}

function compareEntryAge(left, right) {
  return right.ageDays - left.ageDays || left.id.localeCompare(right.id);
}

function bucketDefinitions(thresholdDays) {
  const buckets = [];
  let minimum = 0;

  for (const threshold of thresholdDays) {
    buckets.push({
      label: minimum === 0 ? `0-${threshold}` : `${minimum}-${threshold}`,
      minDays: minimum,
      maxDays: threshold,
    });
    minimum = threshold + 1;
  }

  buckets.push({
    label: `${minimum}+`,
    minDays: minimum,
    maxDays: null,
  });

  return buckets;
}

function bucketForAge(ageDays, definitions) {
  if (ageDays < 0) return 'future';
  return definitions.find((bucket) => bucket.maxDays === null || ageDays <= bucket.maxDays).label;
}

function sortedIssueEntries(entries) {
  return entries
    .map((entry) => ({
      id: entry.id,
      title: entry.title ?? entry.id,
      category: categoryFor(entry.id),
      path: entry.path,
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
}

export function buildFreshnessReport(entries, options) {
  const asOf = options?.asOf;
  const asOfDay = parseDateOnly(asOf);
  if (asOfDay === null) throw new Error(`Invalid as-of date '${asOf}'. Expected YYYY-MM-DD.`);

  const thresholdDays = normalizeThresholdDays(options?.thresholdDays);
  const bucketDefs = bucketDefinitions(thresholdDays);
  const eligible = entries.filter(
    (entry) => eligibleStatuses.has(entry.status) && entry.type !== 'index'
  );
  const missing = [];
  const invalid = [];
  const dated = [];

  for (const entry of eligible) {
    if (entry.lastReviewed === undefined || entry.lastReviewed === null || entry.lastReviewed === '') {
      missing.push(entry);
      continue;
    }

    const reviewDay = parseDateOnly(entry.lastReviewed);
    if (reviewDay === null) {
      invalid.push(entry);
      continue;
    }

    const ageDays = asOfDay - reviewDay;
    dated.push({
      id: entry.id,
      title: entry.title ?? entry.id,
      category: categoryFor(entry.id),
      path: entry.path,
      status: entry.status,
      lastReviewed: entry.lastReviewed,
      ageDays,
      ageBucket: bucketForAge(ageDays, bucketDefs),
    });
  }

  dated.sort(compareEntryAge);
  const ageBuckets = [
    ...bucketDefs.map((bucket) => ({ ...bucket, count: 0 })),
    { label: 'future', minDays: null, maxDays: -1, count: 0 },
  ];
  const bucketByLabel = new Map(ageBuckets.map((bucket) => [bucket.label, bucket]));
  for (const entry of dated) bucketByLabel.get(entry.ageBucket).count += 1;

  const statusCounts = ['reviewed', 'stable'].map((status) => ({
    status,
    count: eligible.filter((entry) => entry.status === status).length,
  }));

  const categoryNames = [...new Set(eligible.map((entry) => categoryFor(entry.id)))].sort();
  const categories = categoryNames.map((category) => {
    const categoryEligible = eligible.filter((entry) => categoryFor(entry.id) === category);
    const categoryDated = dated.filter((entry) => entry.category === category);
    return {
      category,
      eligibleCount: categoryEligible.length,
      datedCount: categoryDated.length,
      missingCount: missing.filter((entry) => categoryFor(entry.id) === category).length,
      invalidCount: invalid.filter((entry) => categoryFor(entry.id) === category).length,
      oldestAgeDays: categoryDated.length > 0
        ? Math.max(...categoryDated.map((entry) => entry.ageDays))
        : null,
    };
  });

  const thresholds = thresholdDays.map((threshold) => ({
    thresholdDays: threshold,
    count: dated.filter((entry) => entry.ageDays > threshold).length,
    entries: dated
      .filter((entry) => entry.ageDays > threshold)
      .map((entry) => entry.id),
  }));

  return {
    asOf,
    thresholdDays,
    eligibleCount: eligible.length,
    datedCount: dated.length,
    missingRequiredReviewDates: sortedIssueEntries(missing),
    invalidReviewDates: sortedIssueEntries(invalid),
    statusCounts,
    ageBuckets,
    thresholds,
    categories,
    oldestEntries: dated,
  };
}
