# CarePoint Hospital Management System (Angular)

A practical Angular 18 standalone-components project covering the requested concepts:
- `ngOnInit` and `ngOnChanges`
- `@Input` and `@Output` in reusable child components
- reusable Action Button and Data Table child components
- `@Pipe` search filter
- `@Injectable` service + HttpClient + RxJS Observables
- Reactive Forms only
- routing for Admin / Doctor / Patient
- Bootstrap 5
- JSON Server fake database
- duplicate email prevention
- one search input on the active list page

## Requirements
Install Node.js (LTS), then in this folder run:

```bash
npm install
```

## Start the fake API
Open terminal 1:

```bash
npm run api
```

JSON Server runs at http://localhost:3000

## Start Angular
Open terminal 2:

```bash
npm start
```

Open http://localhost:4200

Or run both processes together:

```bash
npm run start:all
```

## Routes
- `/admin/doctors` - Admin can add/edit/delete doctors
- `/admin/patients` - Admin can add/edit/delete patients
- `/doctor/doctors` - Doctor can view doctors
- `/doctor/patients` - Doctor can add/edit/delete patients
- `/patient/patients` - Patient can view patients

## Notes
- All API calls live in `HospitalService` / the route-level page component. Child components do not call APIs.
- The DataTable receives rows, columns and search text through `@Input`; it emits edit/delete events through `@Output`.
- The DataTable implements `OnChanges` and recalculates visible rows when input data or search text changes.
- The ActionButton is a reusable child that emits the selected action.
- The search field is in the active routed list page and uses the shared `FilterPipe` through the table.
- Duplicate emails are blocked within the active entity list.
- JSON Server is a demo fake backend, not production authentication or authorization. Role routes demonstrate UI permissions only.


## Separate HTML / CSS / TypeScript files
All UI components use separate files:
- `app.component.ts`, `app.component.html`, `app.component.css`
- `pages/role-page.component.ts`, `role-page.component.html`, `role-page.component.css`
- `shared/action-button.component.ts`, `action-button.component.html`
- `shared/data-table.component.ts`, `data-table.component.html`
- `src/styles.css` contains global styles.
