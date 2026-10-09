# DevBoard

A responsive web app where students can discover upcoming tech events, workshops and hackathons. Search, filter, sort, read details and save favourites.

Built with plain HTML, CSS and JavaScript (ES modules). No build step, no dependencies.

## Features

- Browse events as reusable cards
- Case-insensitive search by name or keyword, combined with category filters
- Sort by soonest, latest or category
- Event details in an accessible dialog (Escape closes it, focus returns to the button)
- Save and unsave events without duplicates, with a dedicated "Saved" view
- Favourites and theme remembered in localStorage
- Loading skeleton, empty, no-results and error states
- Light and dark theme, responsive layout, keyboard and screen reader support, reduced-motion support

## Run locally

ES modules do not work when you double-click `index.html`, so use a small local server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. (The VS Code "Live Server" extension also works.)

## Project structure

```
index.html
css/styles.css
js/
  main.js                 starts the app, renders from state
  state.js                shared state + toggleFavourite
  data/events.js          sample events + fetchEvents()
  utils/
    dom.js                h() helper to create elements
    filters.js            filterEvents(), sortEvents()
    dates.js              date formatting
    theme.js              light/dark toggle
  components/
    EventCard.js  EventList.js  EventDialog.js
    FilterBar.js  Tabs.js  FavouriteButton.js
    SkeletonList.js  StateMessage.js
```

## Key decisions

- **One state object, one render function.** Every user action calls `setState()`, and `render()` redraws the page from it, so the UI always matches the data.
- **Favourites are a `Set` of ids**, so an event can never appear twice.
- **Filtering is a pure function** combining search and category with AND, so they always work together.
- **Components build DOM with `createElement`**, never `innerHTML`, so event text can never inject HTML.
- **Search box, filters and tabs are built once** and only updated, so keyboard focus is not lost while typing.

## Deploy (GitHub Pages)

1. Push this folder to a GitHub repository.
2. Repository Settings, Pages, set the source to the `main` branch and root folder.
3. Your site appears at `https://<username>.github.io/<repository>/`.
