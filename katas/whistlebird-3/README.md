# Whistlebird 3 - REST in peace 
Whistlebird was finally launched. The application proved sucessful and got millions of users overnight. Sadly, the servers could not cope with the strain and kept crashing. You knew it was a matter of time before the CEO came up with something flimsy and GraphQL was in the air. Luckily enough, you've had some experience with it in the past... the clock is ticking!

### Steps
* run `docker compose up`
* add the needed tables
* switch to frontend directory `cd frontend`
* run `npm install` and `npm run dev`
* go to `http://localhost:8080/graphql` and make sure the endpoint is working. 

### Requirements
* all requests should go to `api/graphql`
* show a list of entries
* post an entry with a simple form

