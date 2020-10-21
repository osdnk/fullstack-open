## 0.4
```

BROWSER->SERVER: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
SERVER-->BROWSER: empty

note over SERVER:
SERVER saves a note
user is navigated to the /notes page
end note

BROWSER->SERVER: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
SERVER-->BROWSER: HTML
BROWSER->SERVER: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
SERVER-->BROWSER: main.css
BROWSER->SERVER: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
SERVER-->BROWSER: main.js

note over BROWSER:
BROWSER starts executing js-code
that requests JSON data from server
end note

BROWSER->SERVER: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
SERVER-->BROWSER: notes are sent to the user (including the new one)

note over BROWSER:
browser executes the event handler
that renders notes to display

end note
```

## 0.5
```
BROWSER->SERVER: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
SERVER-->BROWSER: HTML
BROWSER->SERVER: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
SERVER-->BROWSER: main.css
BROWSER->SERVER: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
SERVER-->BROWSER: main.js
note over BROWSER:
browser starts executing js-code
that requests JSON data from server 
end note

BROWSER->SERVER: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
SERVER-->BROWSER: notes are sent to the user

note over BROWSER:
browser executes the event handler
that renders notes
end note
```

## 0.6

```
BROWSER->SERVER: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa payload: { content }
note over SERVER:
new note is stored
end note
SERVER-->BROWSER: JSON {"message":"note created"}

note over BROWSER:
BROWSER executes js-code which adds a new element to list

end note
```
