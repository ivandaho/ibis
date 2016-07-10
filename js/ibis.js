var synth = new Tone.PolySynth(2, Tone.Synth);
var synth2 = new Tone.PolySynth(4, Tone.Synth);
var synth3 = new Tone.PolySynth(4, Tone.Synth);

synth.toMaster();
synth2.toMaster();
synth3.toMaster();
//var time = 0;
//synth.triggerAttackRelease("C4", time, time + 0.25);

var pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
}, ["C4", "E4", "G4", "A4"]);

//console.log("sdf");

/*
notes
  
var chord = new Tone.Event(function(time, chord){
    synth.triggerAttackRelease(chord[0], 0.25);
    synth.triggerAttackRelease(chord[1], 0.25);
    synth.triggerAttackRelease(chord[2], 0.25);
},["C4", "Eb4", "G4"]);

var seq = new Tone.Sequence(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
}, ["C3", "Eb3", "G3", "C4"], "4n");


*/


var startpart_change = new Tone.Event(function(time, note){
    change_startpart_notes();
    console.log("executing");
});
var iterations = 0;


var mc = new Tone.CtrlMarkov({
    "start" : ["f01", "f02", "f03", "f04"],
    "f01": ["f02", "f03", "f04"],
    "f02": ["f01", "f03", "f04"],
    "f03": ["f02", "f01", "f04"],
    "f04": ["f01", "f02", "f03"],
});

var mainchain = new Tone.Event(function(time, note){
    console.log(mc.value);
    switch(mc.value){
        case "start":
                schedone(seq_opener_01);
            break;
        case "f01":
                //schedone(seq_twobeats_01);
                schedone(riffsarray[0]);
            break;
        case "f02":
                //schedone(seq_twobeats_02);
                schedone(riffsarray[1]);
            break;
        case "f03":
                //schedone(seq_twobeats_03);
                schedone(riffsarray[2]);
            break;
        case "f04":
                //schedone(seq_twobeats_04);
                schedone(riffsarray[3]);
            break;
    }

    iterations++;
    if (iterations % 8 == 0){
        mc.value = "start";
    } else {
        mc.next();
    }
});

function schedone(seq){
    // do i still need to quantize if i already quantized the mainchain?
    seq.start("(@2n)");
    seq.stop("(@2n) + 2n");
    seq.loop = 0;
}



var startpart = new Tone.Part(function(time, pitch){
    synth2.triggerAttackRelease(pitch, "8n", time);
});


var tempobass = new Tone.Sequence(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
}, [["A3", "A3"], ["A2", "A3"], ["A2", "A3"], ["A2", "A3"]]);

var mainbassSimple = new Tone.Sequence(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
}, ["A2", "A3", [null, null, "E2", "G2"], [null,"E2", "G2", "E2"]]);

var mainbass = new Tone.Sequence(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
}, ["A2", "A3", [null,[null,null,null,"Eb2"], "E2", "G2"], [null,"E2", "G2", "E2"]]);

var scalenotes = ["A4", "C5", "D5", "Eb5", "E5", "G5", "A5", "C6", "D6", "Eb6", "E6", "G6", "A6"]

var pat1 = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, 0.15);
}, scalenotes, "randomWalk");
pat1.interval = "8";



// note groups
var notegrp_opener_01 = [["0:1:0", "Eb6"], ["0:1:1", "D6"], ["0:1:2", "C6"], ["0:1:3", "A5"]];
var notegrp_twobeats_01 = [null, "E5", "G5", "A5", "C6", "A5", "G5", "A5"];

var notegrp_twobeats_02 = [null, "Eb5", "E5", "A5", "E5", "Eb5", "D5", "C5"];
var notegrp_twobeats_03 = [null, "Eb5", "E5", "Eb5", "D5", "C5", "A5", "C5"];
var notegrp_twobeats_04 = [null, "Eb5", "D5", "C5", "D5", "C5", "A5", "C5"];


var seq_opener_01 = new Tone.Part(function(time, pitch){
    synth.triggerAttackRelease(pitch, 0.25, time);
}, notegrp_opener_01);

var seq_twobeats_01 = new Tone.Sequence(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
}, notegrp_twobeats_01, "16n");

var seq_twobeats_02 = new Tone.Sequence(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
} , notegrp_twobeats_02, "16n");

var seq_twobeats_03 = new Tone.Sequence(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
} , notegrp_twobeats_03, "16n");

var seq_twobeats_04 = new Tone.Sequence(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
} , notegrp_twobeats_04, "16n");

var riffsarray = [];

// useless now?
function make_tempo_opener(notegrp, type){
    var output = [];
    switch(type){
        case "straight":
            output = [notegrp, null, null, null];
            break;
        case "secondbeat":
            output = [null, notegrp, null, null];
            break;
        case "thirdbeat":
            output = [null, null, notegrp, null];
            break;
    }
    return output;
};

function spawn_opener_tempo(type){
    switch(type){
        case "secondbeat":
            return "0:1:0";
            break;
        case "thirdbeat":
            return "0:2:0";
            break;
        default:
            return "0:0:0";
            break;
    }
}

function make_tempo_3rdbar(notegrp, type){
    var output = [];
    switch(type){
        case "straight":
            output = [notegrp, null, null, null];
            break;
        case "secondbeat":
            output = [null, notegrp, null, null];
            break;
        case "thirdbeat":
            output = [null, null, notegrp, null];
            break;
    }
    return output;
};

function change_startpart_notes(){
    startpart.removeAll();
    var style = Math.floor((Math.random() * 3) + 1);
    switch(style){
        case 1:
            startpart.add("0:0:2", "E4");
            startpart.add("0:0:2", "G4");
            startpart.add("0:0:2", "A4");
            startpart.add("0:0:2", "C5");
            
            startpart.add("0:1:1", "E4");
            startpart.add("0:1:1", "G4");
            startpart.add("0:1:1", "A4");
            startpart.add("0:1:1", "C5");
            
            startpart.add("0:2:0", "E4");
            startpart.add("0:2:0", "G4");
            startpart.add("0:2:0", "A4");
            startpart.add("0:2:0", "C5");
            
            startpart.add("0:2:3", "E4");
            startpart.add("0:2:3", "G4");
            startpart.add("0:2:3", "A4");
            startpart.add("0:2:3", "C5");
            
            startpart.add("0:3:2", "E4");
            startpart.add("0:3:2", "G4");
            startpart.add("0:3:2", "A4");
            startpart.add("0:3:2", "C5");
            break;
        case 2:
            startpart.add("0:0:2", "E4");
            startpart.add("0:0:2", "G4");
            startpart.add("0:0:2", "A4");
            startpart.add("0:0:2", "C5");
            
            startpart.add("0:1:1", "E4");
            startpart.add("0:1:1", "G4");
            startpart.add("0:1:1", "A4");
            startpart.add("0:1:1", "C5");
            
            startpart.add("0:2:0", "E4");
            startpart.add("0:2:0", "G4");
            startpart.add("0:2:0", "A4");
            startpart.add("0:2:0", "C5");
            
            startpart.add("0:2:3", "E4");
            startpart.add("0:2:3", "G4");
            startpart.add("0:2:3", "A4");
            startpart.add("0:2:3", "C5");
            
            startpart.add("0:3:2", "E4");
            startpart.add("0:3:2", "Gb4");
            startpart.add("0:3:2", "A4");
            startpart.add("0:3:2", "C5");
            break;
        case 3:
            startpart.add("0:0:2", "E4");
            startpart.add("0:0:2", "G4");
            startpart.add("0:0:2", "A4");
            startpart.add("0:0:2", "C5");
            
            startpart.add("0:1:1", "E4");
            startpart.add("0:1:1", "G4");
            startpart.add("0:1:1", "A4");
            startpart.add("0:1:1", "C5");
            
            startpart.add("0:2:0", "E4");
            startpart.add("0:2:0", "G4");
            startpart.add("0:2:0", "A4");
            startpart.add("0:2:0", "C5");
            
            startpart.add("0:2:3", "Eb4");
            startpart.add("0:2:3", "G4");
            startpart.add("0:2:3", "A4");
            startpart.add("0:2:3", "C5");
            
            startpart.add("0:3:2", "E4");
            startpart.add("0:3:2", "G4");
            startpart.add("0:3:2", "A4");
            startpart.add("0:3:2", "C5");
            break;
    }

}
var allriffs = [];
// for each item in a folder.


function moveforward(){
    mc.next();
}
// chains of possible riffs
var chain = new Tone.CtrlMarkov({
	"Eb5" : "D5",
    "D5": "C5",
    "C5": "A4",
});
//chain.value = "beginning";
//console.log(chain.value);
//console.log(chain.next());

//Tone.Transport.swing = 1; // does this work??
//Tone.Transport.swingSubdivision = "32n"; // does this work...?
Tone.Transport.bpm.value = 100;
mainbassSimple.start();

startpart_change.start();
startpart_change.loop = true;
startpart.start();
startpart.loop = true;
/*
seq_opener_01.start(spawn_opener_tempo("secondbeat"));
seq_opener_01.loop = 0;

seq_twobeats_01.start("0:2:0");
seq_twobeats_01.loop = 0;

seq_twobeats_02.start("1:0:0");
seq_twobeats_02.loop = 0;
*/
var pparts;

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var reader = new FileReader();

  options = {};

  reader.onload = function(e) {
    pparts = MidiConvert.parseParts(e.target.result, options);
    $("#PartsOutput").val(JSON.stringify(pparts, undefined, 2));
    
  };

  //reader.readAsText(file);
  reader.readAsBinaryString(file);
}

//var mparts = MidiConvert.parseParts(files[0]);

$(document).ready(function(){
    $('#btn').click(function(){
        Tone.Transport.start();
    });
    $('#btnstop').click(function(){
        Tone.Transport.stop();
    });
    $('#btn1').click(function(){
        Tone.Transport.scheduleOnce(function(time){
            // stop intro
            startpart.loop = false;
            startpart.stop();
            startpart_change.loop = false;
            startpart_change.stop();

            // schedule chain on next measure
            mainchain.start();
            mainchain.loop = true;
            mainchain.loopEnd = "2n";
        }, "(@1m)");
    });

    $('#btn2').click(function(){
        // btn2 will activate the conversion
        for (i = 0; i < 4; i++) {

            var pianoPart = new Tone.Part(function(time, notedata){
                // notedata.time doesnt work so well, it MUST have time from midi data
                synth3.triggerAttackRelease(notedata.noteName, notedata.duration, notedata.time, notedata.velocity);
            }, pparts[i]);
            riffsarray.push(pianoPart);
        }
        //console.log(notegrp_twobeats_02);
        //////pianoPart.start();
        //console.log(sdf);
    });
    $('#btn3').click(function(){
        sdf
    });
    document.getElementById('file-input')
      .addEventListener('change', readSingleFile, false);
    /*
    $('#btn1').click(function(){
        Tone.Transport.scheduleOnce(function(time){
            seq_opener_01.stop();
            seq_opener_01.start();
            seq_opener_01.loop = 0;
        }, 0);
    });
    */
  });
