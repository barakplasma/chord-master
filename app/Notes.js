class Pitch {
    constructor(note, octave) {
        this.note = note;
        this.octave = octave;
    }
}

class ChordManager {
    static chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    static getChordType() {
        const chordTypeFrm = document.getElementById("chord_type_frm");
        for (let i = 0; i < chordTypeFrm.length; i++) {
            if (chordTypeFrm[i].checked) {
                return chordTypeFrm[i].value;
            }
        }
    }

    /**
     * Get the note after some steps
     * @param pitch: Pitch
     * @param step: int
     * @returns {Pitch}
     */
    static getNextNote(pitch, step) {
        let noteIndex = this.chromatic.indexOf(pitch.note);
        if (noteIndex === -1) {  // The pitch has an invalid note
            console.error("Invalid note");
        }
        let note = pitch.note;
        let octave = pitch.octave;
        if (noteIndex + step >= this.chromatic.length) {  // The note is in the next octave
            octave++;
            note = this.chromatic[noteIndex + step - this.chromatic.length];
        } else {    // the note is in the same octave
            note = this.chromatic[noteIndex + step];
        }
        return new Pitch(note, octave);
    }

    /**
     * Get a chord with the root note and of the certain type
     * @param root: Pitch
     * @param type: int
     * @returns {Array}
     */
    static getChord(root, type) {
        const types = {
            "major": [0, 4, 7],
            "minor": [0, 3, 7],
            "diminished": [0, 3, 6]
        };
        const steps = types[type];
        let resNotes = [];
        for (let i = 0; i < steps.length; i++) {
            const note = this.getNextNote(root, steps[i]);
            resNotes.push(note);
        }
        return resNotes;
    }

    static showChord() {
        const frm = document.forms["root_frm"];
        const root = frm.elements[0].value;
        let rootNote = "";
        if (root.charAt(1) === '#') {
            rootNote = root.slice(0, 2);
        } else {
            rootNote = root.slice(0, 1);
        }
        const rootOctave = root.slice(-1);
        if(root.length > 3) {
            alert(`"${root}" is not a valid note`)
        }
        if (this.chromatic.includes(rootNote) === false || isNaN(parseInt(rootOctave, 10))) {
            alert(`"${root}" is not a valid note`)
        }
        const pitch = new Pitch(rootNote, rootOctave);
        const chordType = ChordManager.getChordType();
        const chord = this.getChord(pitch, chordType);
        let chordString = "";
        for (let i = 0; i < chord.length; i++) {
            const note = chord[i].note;
            const octave = chord[i].octave;
            if (i !== chord.length - 1){
                chordString = chordString + note + octave + ", ";
            } else {
                chordString = `${chordString}${note}${octave}`;
            }
        }
        document.getElementById("chord").innerHTML = chordString;
    }

    static get
}

class Initializer {
    constructor() {
        Initializer.setDefaultChordType();
    }
    static setDefaultChordType() {
        const chordTypeFrm = document.getElementById("chord_type_frm");
        chordTypeFrm[0].checked = true; // Set major to be checked by default
    }
}

const init = new Initializer();
