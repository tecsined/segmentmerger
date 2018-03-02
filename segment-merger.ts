

export class SegmentMerger {

    private testData = [
        {
            start: 1,
            end: 2,
            pA1: '1-2',
            pA2: '1-2'
        },
        {
            start: 1,
            end: 3,
            pB1: '1-3',
            pB2: '1-3'
        },
        {
            start: 1,
            end: 3,
            pBB1: '1-3',
            pBB2: '1-3'
        },
        {
            start: 1.5,
            end: 2.4,
            pC1: '1.5-2.4',
            pC2: '1.5-2.4'
        },
        {
            start: 1.2,
            end: 2.4,
            pCC1: '1.2-2.4',
            pCC2: '1.2-2.4'
        },
        {
            start: 3,
            end: 4,
            pD1: '3-4',
            pD2: '3-4'
        },
        {
            start: 0,
            end: 1.3,
            pX1: '0-1.3',
            pX2: '0-1.3'
        },
        {
            start: 10,
            end: 11,
            pW1: '10-11',
            pW2: '10-11'
        }
    ];

    unionRoadwaySegment(events: any[]): any {
        events = this.testData;
        events.sort((current, next) => current.start - next.start);
        const mergedEvents: any[] = [];
        // let currentModifiedEvent: any = {};
        // let currentEvent: any = {};

        const eventSortedByStart: any[] = Object.assign([], events);
        eventSortedByStart.sort((current, next) => current.start - next.start);
        const eventSortedByEnd: any[]  = Object.assign([], events);
        eventSortedByEnd.sort((current, next) => current.end - next.end);

        console.log('eventSortedByStart', eventSortedByStart);
        console.log('eventSortedByEnd', eventSortedByEnd);

        const distinctStars = [...Array.from(new Set<number>(eventSortedByStart.map(e => e.start)))];
        const distinctEnds = [...Array.from(new Set<number>(eventSortedByEnd.map(e => e.end)))];

        console.log('distinctStars', distinctStars);
        console.log('distinctEnds', distinctEnds);

        const mergedDisticntSegmentStartEnds = distinctStars.concat(distinctEnds);
        const distinctSegmentStartEnds = [...Array.from(new Set<number>(mergedDisticntSegmentStartEnds))];
        distinctSegmentStartEnds.sort(function(a, b) { return a - b; });

        console.log('mergedDisticntSegmentStartEnds', mergedDisticntSegmentStartEnds);
        console.log('distinctSegmentStartEnds', distinctSegmentStartEnds);

        const indexSegmentStartEnd = 0;
        const lastIndex = eventSortedByStart.length;
        const createMergedEvent: any = {};
        const isValidIndexRange: boolean = (indexSegmentStartEnd < lastIndex && (indexSegmentStartEnd + 1 < lastIndex));

        for (let index = 0; index < distinctSegmentStartEnds.length - 1; index++) {
            const startSegment: number = distinctSegmentStartEnds[index] ;
            const endSegment: number = distinctSegmentStartEnds[index + 1];

            let eventsFiltered = eventSortedByStart.filter(e => ((<number>e.start >= startSegment && <number>e.start <= endSegment)
                                                                || (<number>e.start >= startSegment && <number>e.start <= endSegment)));

            // Check that there is a jump in the interval by filtering by mid point. DOR
            const eventsIntervalValidity = eventSortedByStart.filter(e => ((<number>e.start <= (startSegment + endSegment) / 2)
                                                                        && (<number>e.end >= (startSegment + endSegment) / 2)));
            const thereIsJumpInterval: boolean = eventsIntervalValidity.length === 0;
            const thereIsPossibleOverSetInterval: boolean = eventsIntervalValidity.length > 0;
            if (thereIsPossibleOverSetInterval) {
                const overSetEvents = eventsIntervalValidity.filter(e => !eventsFiltered.includes(e));
                const eventsWithOverSetIntervals = eventsFiltered.concat(overSetEvents);
                eventsFiltered = eventsWithOverSetIntervals;
                console.log('overSetEvents', overSetEvents);
                console.log('eventsFiltered', eventsFiltered);
            }
            if (thereIsJumpInterval) {
                continue;
            }
            const mergedObjects: any = Object.assign({}, ...eventsFiltered);
            mergedObjects.start = startSegment;
            mergedObjects.end = endSegment;
            mergedEvents.push(mergedObjects);
        }
        console.log('final merged', mergedEvents);
    }

    // TODO Change this parameters to its data type

    private isSegmentOutside(currentSegment: any, analizedSegment: any): boolean {
        return (analizedSegment.start >= currentSegment.end);
    }

    private isSameSegment(currentSegment: any, analizedSegment: any): boolean {
        return (analizedSegment.start === currentSegment.start && analizedSegment.end === currentSegment.end);
    }
    private isSameStartSegment(currentSegment: any, analizedSegment: any): boolean {
        return (analizedSegment.start === currentSegment.start);
    }

    private isSameEndSegment(currentSegment: any, analizedSegment: any): boolean {
        return (analizedSegment.start === currentSegment.start);
    }

    private isInSegmentByItsStart(currentSegment: any, analizedSegment: any): boolean {
        const analizedSegmentStart = analizedSegment.start;
        return (analizedSegmentStart > currentSegment.start && analizedSegmentStart < currentSegment.end);
    }
    private isInSegmentByItsEnd(currentSegment: any, analizedSegment: any): boolean {
        const analizedSegmentEnd = analizedSegment.end;
        return (analizedSegmentEnd > currentSegment.start && analizedSegmentEnd < currentSegment.end);
    }
}


