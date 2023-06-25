redux

# Goal of the redux

it gives a kind of `global state storage`.

how to setup and work?

0. create Store

1. function dispatch `action`

2. store pass `state` and `action` to `reducer`

3. reducer run codes which are proper for `action.type`

4. if there is `store.subscribe(handleChangeState);`, then `handleChangeState` will run
   - `subscribe` is a kind of eventListerner which is listening `change of state`,
   - if there is change, then run callback
