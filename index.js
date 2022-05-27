fs = require('fs')

function remove_linebreaks(str) {
    return str.replace( /[\r\n]+/gm, "" );
}

// lecture du fichier
file = process.argv[2];
fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        console.log(`Erreur avec le fichier : ${err}`);
    }
    else {

        // parse JSON string to JSON object
        const tape = JSON.parse(data.slice(0, data.length - 1));
        for(clip in tape.Clips) {
            let oldTL = tape.Clips[clip].TapeLabel;

            delete tape.Clips[clip].TapeLabel;
            tape.Clips[clip].TapeLabels = [oldTL];
            tape.Clips[clip].TapeChoice = 1;
        }

        // save file
        fs.writeFile(file, JSON.stringify(tape, null, 2), (err) => {
            if (err) {
                console.log(`Impossible d'enregsitrer : ${err}`);
            }
            else {
                console.log(`File ${file} saved`);
            }
        });
    }
});
