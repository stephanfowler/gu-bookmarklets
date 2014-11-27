var storageKey = 'gu.history.summary';

function getSummary() {
    var data = window &&
        window.localStorage && 
        window.localStorage.get(storageKey);

    if (!data || !data.value || !data.value.periodEnd || !data.value.tags) {
            summary = {
                value: {
                    periodEnd: today,
                    tags: {}
                }
            };
        }
        return summary.value;
    }

summary = pruneSummary(getSummary());
            _.chain(taxonomy)
                .reduceRight(function (tags, tag) {
                    var tid = firstCsv(pageConfig[tag.tid]),
                        tname = tid && firstCsv(pageConfig[tag.tname]);

                    if (tid && tname) {
                        tags[collapseTag(tid)] = tname;
                    }
                    return tags;
                }, {})
                .each(function (tname, tid) {
                    var nameAndFreqs = summary.tags[tid],
                        freqs = nameAndFreqs && nameAndFreqs[1],
                        freq = freqs && _.find(freqs, function (freq) { return freq[0] === 0; });

                    if (freq) {
                        freq[1] = freq[1] + 1;
                    } else if (freqs) {
                        freqs.unshift([0, 1]);
                    } else {
                        summary.tags[tid] = [tname, [[0, 1]]];
                    }

                    if (nameAndFreqs) {
                        nameAndFreqs[0] = tname;
                    }
                });
            saveSummary(summary);
