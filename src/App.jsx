import { useEffect, useState } from 'react'
import './App.css'

function App() {
const [games,setGames] = useState([]);
const [titles,setTitles] = useState("");
const [hours,setHours] = useState("");
const [achievements,setAchievements] = useState("");
const [status,setStatus] = useState("Finished")
useEffect(() => {
//fetch games from the Api
fetch('http://127.0.0.1:8000/api/games')
.then(res=>res.json())
.then(data=>setGames(data))
}, [])

 return (
<>
 <h1> Game Backlog</h1>
 <h2>Add a Game</h2>
 <div className="mb-3">
 <label className="form-label">Game title</label>
 <input type="text" className="form-control" value={titles} onChange={(e) => setTitles(e.target.value)}  /></div>
 <div className="mb-3">
<label className="form-label">Status</label>
<select className="form-select" value={status} onChange={(e) =>setStatus(e.target.value)}>
<option>Finished</option>
<option>In Progress</option>
<option>About to Start</option>
</select>
</div>
<div className="mb-3">
<label className="form-label">Hours played</label>
<input type="number" className="form-control"  value={hours} onChange={(e) =>setHours(e.target.value)} />
</div>
<div className="mb-3">
<label className="form-label">Achievements</label>
<input type="number" className="form-control" value={achievements} onChange={(e) =>setAchievements(e.target.value)} />
</div>
<button type="submit" className="btn btn-primary">Add Game</button>
   <div className="row">
    <div className="col-md-4">
  <h2>Finished</h2>
 {games.filter(g => g.status === "Finished").map(g => <div key={g.id}>{g.title}</div>)}
</div><div className="col-md-4">
  <h2>In Progress</h2>
   {games.filter(g => g.status === "In Progress").map(g => <div key={g.id}>{g.title}</div>)}
</div><div className="col-md-4">
  <h2>About to Start</h2>
  {games.filter(g => g.status === "About to Start").map(g => <div key={g.id}>{g.title}</div>)}
</div>
</div>
    </>
  )
}

export default App
