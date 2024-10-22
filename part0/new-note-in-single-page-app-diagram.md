sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser executes the function that renders the notes

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON document
    deactivate server