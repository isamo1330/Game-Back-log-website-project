import { useEffect, useState } from 'react'
import './App.css'

function App() {
const [games,setGames] = useState([]);
const [titles,setTitles] = useState("");
const [hours,setHours] = useState("");
const [achievements,setAchievements] = useState("");
const [status,setStatus] = useState("Finished")
const [editingId, setEditingId] = useState(null)
const [error, setError] = useState(null)
const startEdit = (game) => { 
setTitles(game.title)
setHours(game.hours_played)
setStatus(game.status)
setAchievements(game.achievements)
setEditingId(game.id)
}
useEffect(() => {
//fetch games from the Api
fetch('http://127.0.0.1:8000/api/games/')
.then(res => {
      if (!res.ok) {
      res.json().then(errBody => setError(errBody.message))
      return
      }
       return res.json()
       })

.then(data => {
  if (!data) return
  setGames(data)
})
.catch(() => setError("Can't reach the server is it running?")) 
}, [])
const handleSubmit = (e) =>{
setError(null)
 e.preventDefault()
  if (editingId) {
    // EDIT ROAD: replace an existing game
 
 fetch('http://127.0.0.1:8000/api/games/'+ editingId, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    title: titles,
    status: status,
    hours_played: hours,
    achievements: achievements
  })
})
.then(res => {
      if (!res.ok) {
      res.json().then(errBody => setError(errBody.message))
      return
      }
       return res.json()
       })
       
.then(updatedGame => {
  if (!updatedGame) return 
  setGames(games.map(g => g.id === editingId ? updatedGame : g))
  setEditingId(null)
 
  setTitles("")
  setHours("")
  setAchievements("")
  setStatus("Finished")

})
.catch(() => setError("Can't reach the server is it running?"))

return
  }
   
   // ADD ROAD
  fetch('http://127.0.0.1:8000/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      title: titles,
      status: status,
      hours_played: hours,
      achievements: achievements
    })
  })
  .then(res => {
      if (!res.ok) {
      res.json().then(errBody => setError(errBody.message))
      return
      }
       return res.json()
       })

  .then(newGame => { if (!newGame) return
    setGames([...games, newGame])
    setTitles("")
    setHours("")
    setAchievements("")
    setStatus("Finished")
  })
  .catch(() => setError("Can't reach the server is it running?"))
}






 const handleDelete =(id) => {
 fetch('http://127.0.0.1:8000/api/games/' + id, {
 method: 'DELETE'
 }).then(res => {
      if (!res.ok) {
      res.json().then(errBody => setError(errBody.message))
      return
      }
        setGames(games.filter(g => g.id !== id))
       })
 .catch(() => setError("Can't reach the server is it running?"))
 
 }
 
 return (
<main>
 <h1> Game Backlog</h1>
 {error && <div className="alert alert-danger">{error}</div>}
 <h2>Add a Game</h2>
 <form onSubmit={handleSubmit}> 
 <div className="mb-3">
 <label htmlFor="title" className="form-label">Game title</label> 
 <input id="title" type="text" className="form-control" value={titles} onChange={(e) => setTitles(e.target.value)}  /></div>
 <div className="mb-3">
<label htmlFor="status" className="form-label">Status</label>
<select id="status" className="form-select" value={status} onChange={(e) =>setStatus(e.target.value)}>
<option>Finished</option>
<option>In Progress</option>
<option>About to Start</option>
</select>
</div>
<div className="mb-3">
<label htmlFor="hours" className="form-label">Hours played</label>
<input id="hours" type="number" className="form-control"  value={hours} onChange={(e) =>setHours(e.target.value)} />
</div>
<div className="mb-3">
<label htmlFor="achievements" className="form-label">Achievements</label>
<input id="achievements" type="number" className="form-control" value={achievements} onChange={(e) =>setAchievements(e.target.value)} />
</div>
<button type="submit" className="btn btn-primary">Add Game</button>
</form>
   <div className="row">
    <div className="col-md-4">
  <h2>Finished</h2>
 {games.filter(g => g.status === "Finished").map(g => <div key={g.id}>{g.title}<button onClick={() => handleDelete(g.id)}>delete</button> <button onClick={() => startEdit(g)}>edit</button></div>)}
</div><div className="col-md-4">
  <h2>In Progress</h2>
   {games.filter(g => g.status === "In Progress").map(g => <div key={g.id}>{g.title}<button onClick={() => handleDelete(g.id)}>delete</button> <button onClick={() => startEdit(g)}>edit</button></div>)}
</div><div className="col-md-4">
  <h2>About to Start</h2>
  {games.filter(g => g.status === "About to Start").map(g => <div key={g.id}>{g.title}<button onClick={() => handleDelete(g.id)}>delete</button> <button onClick={() => startEdit(g)}>edit</button></div>)}
</div>
</div>
    </main>
  )
}

export default App
