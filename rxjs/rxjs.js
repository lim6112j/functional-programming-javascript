import {of, concat, fromEvent, merge, animationFrameScheduler, interval, defer} from 'rxjs'
import {
  map,
  scan,
  debounceTime,
  switchMap,
  distinctUntilChanged,
  tap,
  share,
  first,
  filter,
  takeUntil,
  startWith,
  withLatestFrom,
  takeWhile,
  mergeOn,
  combineLatest,
  mergeAll
} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax';
import {log, proLog} from '../utils';
// const api = `https://search.shine-through-trees.com/elasticsearch/_search`;
const $layer = document.getElementById('searchResult');
const drawHTML = (items) => {
  $layer.innerHTML = items.map(user => {
    return `<li class="user">
    <img src="${user.avatar_url}" width="50px" height="50px" />
    <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
    </li>`
  }).join("");
}

const keyup$ = fromEvent(document.getElementById('rxjs'), 'keyup')
  .pipe(
    debounceTime(300),
    map(ev => ev.target.value),
    tap(log),
    distinctUntilChanged(),
    share()
  );
const user$ = keyup$
    .pipe(
      filter(query => query.trim().length > 0),
      switchMap(searchTxt => ajax.getJSON(`https://api.github.com/search/users?q=${searchTxt}`)),
      tap(console.log)
    );
user$.subscribe(res => drawHTML(res.items));

const reset$ = keyup$
    .pipe(
      filter(query => query.trim().length === 0),
      tap(val => $layer.innerHTML = '')
    );
reset$.subscribe();

const $view = document.getElementById('carousel');
const $container = document.getElementById('container');
const THRESHOLD = 30;
const DEFAULT_DURATION = 300;
const PANEL_COUNT = $container.querySelectorAll(".panel").length;
const TOUCHENABLED = "ontouchstart" in window;
const EVENTS = {
  start: TOUCHENABLED ? "touchstart" : "mousedown",
  move: TOUCHENABLED ? "touchmove" : "mousemove",
  end: TOUCHENABLED ? "touchend" : "mouseup"
}
const start$ = fromEvent($view, EVENTS['start']).pipe(toPos);
// start$.subscribe(log('start'));
const move$ = fromEvent($view, EVENTS['move']).pipe(toPos);
const end$ = fromEvent($view, EVENTS['end']);
const size$ = fromEvent(window, 'resize').pipe(
  startWith(0),
  tap(log('window size')),
  map(event => $view.clientWidth),
  tap(log('carousel size'))
);
// size$.subscribe(log('window size'));
const drag$ = start$.pipe(
  // tap(log('start')),
  switchMap(start => move$.pipe(
    map(move => move - start),
    takeUntil(end$))
  ),
  map(distance => ({distance})),
  // tap(log('start - end')),
  share()
);
// drag$.subscribe(log('subscribe'));


const drop$ = drag$.pipe(
  switchMap(drag => {
    return end$.pipe(
      map(event => drag),
      first()
    )
  }),
  withLatestFrom(size$, (drag, size) => {
    return {...drag, size}
  }),
  // tap(log('with size'))
);
// drop$.subscribe(log('drop subscribe'));
const carousel$ = merge(drag$, drop$).pipe(
  scan((acc, {distance, size}) => {
    const updateAcc = {
      from: -(acc.index * acc.size) + distance
    };
    if(size === undefined) {
      updateAcc.to = updateAcc.from;
    } else {
      let tobeIndex = acc.index;
      if(Math.abs(distance) >= THRESHOLD) {
        tobeIndex = distance < 0 ?
          Math.min(tobeIndex + 1, PANEL_COUNT - 1) :
          Math.max(tobeIndex - 1, 0);
      }
      updateAcc.index = tobeIndex;
      updateAcc.to = -(tobeIndex * size);
      updateAcc.size = size;
    }
    return { ...acc, ...updateAcc}
  }, {from: 0, to: 0, index: 0, size: 0}),
  switchMap(({from, to}) => from === to ?
    of(to) : animation(from, to, DEFAULT_DURATION)
  )
);

carousel$.subscribe(v => {
  console.log('carousel data', v),
  translateX(v);
});

// animation(100, 500, 300).subscribe(log('animation'))
// functions

function toPos(observable$) {
  return observable$.pipe(
    map(v => TOUCHENABLED ? v.changedTouch[0].pageX : v.pageX)
  );
}
function translateX(posX) {
  $container.style.transform = `translate3d(${posX}px, 0, 0)`;
}
function animation(from, to, duration) {
  return defer( () => {
    const scheduler = animationFrameScheduler;
    const start = scheduler.now();
    const interval$ = interval(0, scheduler).pipe(
      map(() => (scheduler.now() - start)/duration),
      takeWhile(x => x <= 1)
    );
    return concat(interval$, of(1)).pipe(
      map(rate => from + (to - from)*rate)
    );
  } );
}
