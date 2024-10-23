//import './app.css'
import { AbilityCreator } from './components/creationForms/AbilityCreator'
import { MenuBar } from './components/menubar/MenuBar'

export function App() {
    return (
        <div style={{
            backgroundColor: '#242424',
            color: 'rgba(255, 255, 255, 0.87)',
            fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
            fontSynthesis: 'none',
            textRendering: 'optimizeLegibility',
        }}>
            <MenuBar />
            <AbilityCreator />
        </div>
    )
}
