"""Sync or verify the demo display against saved backend exports. Never runs evaluations."""
import hashlib
import json
import argparse
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# Editorial labels summarize existing evidence; they do not assign verdicts.
LABELS = {
    'adaptive-paired-1-v01': ('Keep both paths open', 'Keeps renewal and moving open while flagging timing, rent and PATH constraints.'),
    'adaptive-paired-2-v01': ('A promising backup, with conditions', 'Treats the $2,230 Option A as conditional; further checks are still required.'),
    'adaptive-paired-3-v01': ('Reassess when the facts change', 'Recommends conditional renewal at $2,260 + $0 and rejects unsuitable alternatives.'),
    'adaptive-paired-3-v01-retry': ('Keep the final choice with Mia', 'Preserves Mia’s authority: $5 below her ceiling, $60 above her opening target.'),
    'adaptive-legal-1-v01': ('Ground legal guidance in a source', 'Uses the supplied source, qualifies applicability and avoids automatic remedies.'),
    'repair-undated-v1': ('Keep unknown dates unknown', 'Does not turn the upload timestamp into a statement or incident date.'),
    'repair-source-dated-v1': ('Use the date in the evidence', 'Identifies October 20 as the statement date; keeps October 25 upload metadata separate.'),
    'repair-legal-unavailable-v1': ('Withhold unsupported legal claims', 'Returns an empty claims list when the legal source is unavailable.'),
    'adaptive-paired-4-v01': ('Strengthen the negotiation wording', 'The draft opens with “Would you consider…” and lacks a stronger commercial rationale.'),
    'adaptive-legal-2-v01': ('Reject an unsupported legal reference', 'An unavailable source appears in a structured claim with an empty quotation.'),
}

def build(EXPORTS, FRAGMENT, check=False):
    reviews = json.loads((EXPORTS / 'current_human_reviews.json').read_text())
    benchmarks = {b['id']: b for b in json.loads((EXPORTS / 'adaptive_benchmarks.json').read_text())}
    history = json.loads((EXPORTS / 'eval_reviews.json').read_text())
    assert len(reviews) == len(benchmarks) == len(LABELS) == 10
    assert {entry['run_id'] for entry in reviews} == set(benchmarks) == set(LABELS)
    rows = []
    for entry in reviews:
        run_id = entry['run_id']
        saved = benchmarks[run_id]
        fingerprint = hashlib.sha256(saved['data'].encode()).hexdigest()
        assert fingerprint == entry['snapshot_hash']
        review = entry['current_human_review']
        assert review['run_id'] == run_id and review['snapshot_hash'] == fingerprint
        matching = [r for r in history if r['kind'] == 'human' and r['run_id'] == run_id and r['snapshot_hash'] == fingerprint]
        assert matching[-1] == review
        assert matching == entry['human_review_history']
        assert saved['status'] == entry['run_status']
        data = json.loads(saved['data'])
        title, observed = LABELS[run_id]
        verdict = review['verdict']
        assert verdict in ('Pass', 'Needs work', 'Fail')
        rows.append({
            'id': run_id, 'verdict': verdict, 'title': title, 'observed': observed,
            'expected': data['expected'], 'modelSummary': (data.get('actual') or {}).get('summary'),
            'runStatus': saved['status'], 'validation': data['validation'],
            'historicalError': data.get('error'), 'snapshotHash': fingerprint,
            'currentReview': review, 'reviewHistory': matching,
            'retry': run_id.endswith('-retry'),
        })
    rows.sort(key=lambda r: list(LABELS).index(r['id']))
    counts = {status: sum(r['verdict'] == status for r in rows) for status in ('Pass', 'Needs work', 'Fail')}
    assert counts == {'Pass': 8, 'Needs work': 1, 'Fail': 1}
    data = {'sourceCommit': 'c244f75', 'source': 'data/exports/current_human_reviews.json', 'rows': rows}
    serialized = json.dumps(data, ensure_ascii=False, indent=2)
    fragment = FRAGMENT.read_text()
    start = '<script type="application/json" id="hm-eval-data">'
    end = '</script>'
    before, remainder = fragment.split(start, 1)
    _, after = remainder.split(end, 1)
    safe = serialized.replace('<', '\\u003c')
    if check:
        assert json.loads(remainder.split(end, 1)[0]) == data, 'Demo display differs from backend exports; sync it before deployment.'
    else:
        FRAGMENT.write_text(before + start + '\n' + safe + '\n' + end + after)
    print(json.dumps({'recordedRuns': len(rows), 'savedHumanReviews': sum(len(r['reviewHistory']) for r in rows), 'counts': counts, 'allSnapshotHashesVerified': True}))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--exports', type=Path, default=REPO / 'data/exports', help='Authoritative data/exports directory')
    parser.add_argument('--fragment', type=Path, default=REPO / 'demo/index.html')
    parser.add_argument('--check', action='store_true', help='Verify only; do not write files')
    args = parser.parse_args()
    build(args.exports, args.fragment, args.check)
