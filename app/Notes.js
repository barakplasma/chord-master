class Pitch {
    constructor(note, octave) {
        this.note = note;
        this.octave = octave;
    }
}

class ChordManager {
    constructor() {
        this.chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    }

    /**
     * Get the note after some steps
     * @param pitch: Pitch
     * @param step: int
     * @returns {Pitch}
     */
    getNextNote(pitch, step) {
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
    getChord(root, type) {
        const types = {
            "major": [0, 4, 7],
            "minor": [0, 3, 7]
        };
        const steps = types[type];
        let resNotes = [];
        for (let i = 0; i < steps.length; i++) {
            const note = this.getNextNote(root, steps[i]);
            resNotes.push(note);
        }
        return resNotes;
    }
}

const pitch = new Pitch("C", "2");
const chordManager = new ChordManager();
const chord = chordManager.getChord(pitch, "major");
console.log(chord);
