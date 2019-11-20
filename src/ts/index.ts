import {Piano} from "./keyboard/Piano";
import {PianoSound} from "./sound/PianoSound";
import { ChordSettingToolbar } from "./setting-toolbar/ChordSettingToolbar";
import { ChordProgression } from "./ChordProgression";


// Chord Toolbar
const chordToolbar = new ChordSettingToolbar();

// Piano
const pianoContainer = document.createElement("div");
pianoContainer.id = "pianoContainer";
document.body.appendChild(pianoContainer);

const piano = new Piano(pianoContainer);

const progresssionContainer = document.createElement("div");
progresssionContainer.id = "progressionContainer";
document.body.appendChild(progresssionContainer);

const progression = new ChordProgression(progresssionContainer)

const sound = new PianoSound(0, 100);
sound.load();

piano.onKeyDown = function(chord: Array<string>){
    sound.keyDown(chord);
    progression.appendChord(chord.toString());
}

piano.onKeyUp = function(chord: Array<string>){
    sound.keyUp(chord);
}