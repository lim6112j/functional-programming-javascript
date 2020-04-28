import {fromEvent} from 'rxjs'
import { map, debounceTime, switchMap, distinctUntilChanged, tap, share, mergeAll, filter} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax';
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