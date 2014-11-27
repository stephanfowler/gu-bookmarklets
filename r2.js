var storageKey = 'gu.history.summary',
    today =  Math.floor(Date.now() / 86400000),
    taxonomy = [
        {tid: 'section',    tname: 'sectionName'},
        {tid: 'keywordIds', tname: 'keywords'},
        {tid: 'seriesId',   tname: 'series'},
        {tid: 'authorIds',  tname: 'author'}
    ];


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

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) { return false; }
    }
    return true;
}

function pruneSummary(summary) {
    var updateBy = today - summary.periodEnd;

    if (updateBy > 0) {
        summary.periodEnd = today;

        for (var tid in summary.tags) {
            if (summary.tags.hasOwnProperty(tid)) {
                var nameAndFreqs = summary.tags[tid],
                    freqs = nameAndFreqs[1],
                    newFreqs = [],
                    freq,
                    newAge;

                for (i=0; i < freqs.length; i += 1) {
                    freq = freqs[i];
                    newAge = freq[0] + updateBy;
                    if (newAge < summaryPeriodDays) {
                        newFreqs.push([newAge, freq[1]]);
                    }
                }

                if (freqs.length) {
                    summary.tags[tid] = [nameAndFreqs[0], newFreqs];
                } else {
                    delete summary.tags[tid];
                }
            }
        }

        if (isEmpty(summary.tags)) {
            summary.periodEnd = today;
        }
    }
    return summary;
}

// TODO
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
