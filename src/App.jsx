import { useState } from 'react'
import './App.css'

function App() {

  return (
<>
 <h1> Game Backlog</h1>
 <h2>Add a Game</h2>
 <div className="mb-3">
 <label className="form-label">Game title</label>
 <input type="text" className="form-control" /></div>
 <div className="mb-3">
<label className="form-label">Status</label>
<select className="form-select">
<option>Finished</option>
<option>In Progress</option>
<option>About to Start</option>
</select>
</div>
<div className="mb-3">
<label className="form-label">Hours played</label>
<input type="number" className="form-control" />
</div>
<div className="mb-3">
<label className="form-label">Achievements</label>
<input type="number" className="form-control" />
</div>
<button type="submit" className="btn btn-primary">Add Game</button>
   <div className="row">
    <div className="col-md-4">
  <h2>Finished</h2>
</div><div className="col-md-4">
  <h2>In Progress</h2>
</div><div className="col-md-4">
  <h2>About to Start</h2>
</div>
</div>
    </>
  )
}

export default App
