import { gameModes } from "../model/Game";

function CreateGameView({ onGameModeChanged, onRowsChanged, onColumnsChanged, onIsAiEnabledChanged, onAiCountChanged, onWallRatioChanged, onCreateGameClicked, rows, columns, aiCount, wallRatio }) {
    return (<form>
        <div style={{ fontSize: "40px" }}>Create Game</div>
        <div className="createGameInputHolder ">
            <div>Game mode</div>
            <select onChange={onGameModeChanged}>
                <option value={gameModes.versus}>Versus</option>
                <option value={gameModes.teamVersusTeams}>Teams vs Teams</option>
                <option value={gameModes.teamsVersusAI}>Teams vs AI</option>
            </select>
        </div>
        <div className="createGameInputHolder">
            <div>Game size</div>
            <input placeholder="Rows" onChange={onRowsChanged} value={rows} style={{ width: "100px" }}></input>
            <div>X</div>
            <input placeholder="Columns" onChange={onColumnsChanged} value={columns} style={{ width: "100px" }}></input>
        </div>
        <div className="createGameInputHolder">
            <div style={{ padding: "4px" }}>AI</div>
            <label className="switch"  >
                <input type="checkbox" onChange={onIsAiEnabledChanged} />
                <span className="slider round" ></span>
            </label>
            <input placeholder="Count" value={aiCount} onChange={onAiCountChanged} ></input>
        </div>
        <div className="createGameInputHolder">
            <div style={{ padding: "4px" }}>Wall Ratio</div> 
            <div style={{ padding: "4px" }}>{wallRatio}%</div> 
            <input type="range" min="0" max="100" placeholder="Count" value={wallRatio} onChange={onWallRatioChanged} ></input>
        </div>
        <button type="submit" onClick={onCreateGameClicked} >Create Game</button>
    </form>);
}

export default CreateGameView;