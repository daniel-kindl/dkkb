const visibleStatuses = new Set(['reviewed', 'stable']);
const externallySourcedProvenance = new Set(['literature', 'primary-source']);
const staleTerms = /\b(deprecated|obsolete|superseded|withdrawn)\b/i;
const secondaryTerms = /\b(survey|review|overview)\b/i;

function normalizeText(value) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

function sourceKey(source) {
  return [
    normalizeText(source.type).toLocaleLowerCase('en-US'),
    normalizeText(source.title).toLocaleLowerCase('en-US'),
    normalizeText(source.url).toLocaleLowerCase('en-US'),
  ].join('\u0000');
}

function finding(kind, entry, message, detail = {}) {
  return {
    kind,
    id: entry.id,
    path: entry.path,
    message,
    ...detail,
  };
}

function compareFindings(left, right) {
  return left.id.localeCompare(right.id)
    || left.kind.localeCompare(right.kind)
    || left.message.localeCompare(right.message);
}

function eligibleEntry(entry) {
  return visibleStatuses.has(entry.status) && entry.type !== 'index';
}

export function auditSourceQuality(entries) {
  const deterministicFindings = [];
  const reviewQueue = [];
  const eligible = entries.filter(eligibleEntry);

  for (const entry of eligible) {
    const provenance = Array.isArray(entry.provenance) ? entry.provenance : [];
    const sources = Array.isArray(entry.sources) ? entry.sources : [];
    const provenanceSet = new Set(provenance);
    const sourceTypes = new Set(sources.map((source) => source.type));

    if (sources.length === 0) {
      if (provenance.some((type) => externallySourcedProvenance.has(type))) {
        deterministicFindings.push(finding(
          'external-provenance-without-source',
          entry,
          'External provenance is declared but no source metadata is present.'
        ));
      } else {
        reviewQueue.push(finding(
          'source-presence-review',
          entry,
          'No source metadata is present; confirm that the entry is intentionally based only on experience or derived guidance.'
        ));
      }
    }

    for (const sourceType of [...sourceTypes].sort()) {
      if (!provenanceSet.has(sourceType)) {
        deterministicFindings.push(finding(
          'source-type-missing-provenance',
          entry,
          `Source type '${sourceType}' is not declared in provenance.`,
          { sourceType }
        ));
      }
    }

    for (const provenanceType of [...externallySourcedProvenance].sort()) {
      if (provenanceSet.has(provenanceType) && !sourceTypes.has(provenanceType)) {
        deterministicFindings.push(finding(
          'provenance-type-without-source',
          entry,
          `Provenance declares '${provenanceType}' but no source of that type is recorded.`,
          { provenanceType }
        ));
      }
    }

    const seen = new Map();
    for (const source of sources) {
      const key = sourceKey(source);
      if (seen.has(key)) {
        deterministicFindings.push(finding(
          'duplicate-source',
          entry,
          `Duplicate source metadata for '${normalizeText(source.title)}'.`,
          { sourceTitle: normalizeText(source.title) }
        ));
      } else {
        seen.set(key, source);
      }

      const reviewText = `${normalizeText(source.title)} ${normalizeText(source.note)}`;
      if (staleTerms.test(reviewText)) {
        reviewQueue.push(finding(
          'stale-or-superseded-source-review',
          entry,
          `Source '${normalizeText(source.title)}' contains an explicit stale or superseded marker.`,
          { sourceTitle: normalizeText(source.title) }
        ));
      }

      if (typeof source.url === 'string' && /\/draft-|\/internet-drafts\//i.test(source.url)) {
        reviewQueue.push(finding(
          'draft-specification-review',
          entry,
          `Source '${normalizeText(source.title)}' appears to reference a draft specification.`,
          { sourceTitle: normalizeText(source.title), sourceUrl: source.url }
        ));
      }
    }

    const hasPrimarySource = sourceTypes.has('primary-source');
    const hasSecondaryMarker = sources.some((source) => secondaryTerms.test(normalizeText(source.title)));
    if (hasSecondaryMarker && !hasPrimarySource) {
      reviewQueue.push(finding(
        'secondary-source-review',
        entry,
        'A survey/review/overview is present without a primary-source entry; check whether an authoritative primary source would better support the claim.'
      ));
    }

    const onlyWeakProvenance = provenance.length > 0
      && provenance.every((type) => type === 'personal-experience' || type === 'derived-guidance');
    if (entry.confidence === 'high' && onlyWeakProvenance && sources.length === 0) {
      reviewQueue.push(finding(
        'high-confidence-evidence-review',
        entry,
        'High confidence is paired only with personal/derived provenance and no source metadata; confirm that the confidence claim is justified.'
      ));
    }
  }

  deterministicFindings.sort(compareFindings);
  reviewQueue.sort(compareFindings);

  return {
    eligibleCount: eligible.length,
    deterministicFindingCount: deterministicFindings.length,
    reviewQueueCount: reviewQueue.length,
    deterministicFindings,
    reviewQueue,
  };
}
