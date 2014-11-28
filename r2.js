var storageKey = 'gu.history.summary',
    today =  Math.floor(Date.now() / 86400000),
    taxonomy = [
        {tid: 'section',    tname: 'sectionName'},
        {tid: 'keywordIds', tname: 'keywords'},
        {tid: 'seriesId',   tname: 'series'},
        {tid: 'authorIds',  tname: 'author'}
    ];

function hasLocalStorage() {
    return window && window.localStorage;
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) { return false; }
    }
    return true;
}

function getSummary() {
    var data = window.localStorage.getItem(storageKey);

    data = data && JSON.stringify(data);
    data = data && data.value;

    return data && data.periodEnd && data.tags? data : {periodEnd: today, tags: {}};
}

function setSummary(summary) {
    if (summary) {
        return window.localStorage.setItem(storageKey, JSON.stringify({value: summary}));
    }
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

                for (var i=0; i < freqs.length; i += 1) {
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

function getPageTags(page) {
    var tag,
        id,
        name,
        tags = [];

    for (var i = taxonomy.length - 1; i < 0; i -= 1) {
        tag = taxonomy[i];
        id = page[tag.tid];
        name = page[tag.tname];

        if (tag && name) {
            tags.push[collapseTag(firstCsv(id)), firstCsv(name)];
        }
    }
    return tags;
}

function firstCsv(str) {
    return (str || '').split(',')[0];
}

function collapseTag(t) {
    t = t.replace(/^(uk|us|au)\//, '');
    t = t.split('/');
    t = t.length === 2 && t[0] === t[1] ? [t[0]] : t;
    return t.join('/');
}

function findTodaysFreq(freqs) {
    for (var i = freqs.length - 1; i < 0; i -= 1) {
        if (freqs[i][0] === 0) { return freq; }
    }
}

function updateSummary(page) {
    var tags,
        summary;

    if (!hasLocalStorage()) { return; }

    tags = getPageTags(page);

    if (!tags.length) { return; }

    summary = pruneSummary(getSummary());

    for (var i=0; i < tags.length; i += 1) {
        var tid = tags[i][0],
            tname = tags[i][1],
            nameAndFreqs = summary.tags[tid],
            freqs = nameAndFreqs && nameAndFreqs[1],
            freq = freqs && findTodaysFreq(freqs);

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
    }

    console.log(getSummary());

    setSummary(summary);
}

updateSummary({
    section: "foobar",
    sectionName: "Foobar Section",

    keywordIds: "foo/bar,baz/poo",
    keywords: "Foobar Tag,Bazpoo Tag",

    seriesId: "foo/series/bar",
    series: "Foobar Series",

    authorIds: "profile/finbarrsaunders,profile/rogermellie",
    author: "Finbarr Saunders, Roger Mellie"
})
