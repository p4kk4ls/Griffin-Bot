const fs = require('fs')

/**
 * 
 * @param {*Folder to load from} loadFolder 
 * @param {*Discord Collection} collection 
 * @param {*Require?} requiring 
 */
exports.run = (loadFolder, collection, requiring) => {
    fs.readdir(loadFolder, (err, files) => {
        if (err)
            return console.error(err);
        let filesjs = files.filter(f => f.split(".").pop() === "js");
        if (filesjs <= 0) {
            console.log('No commands to load mate!');
            return;
        }
        console.log(`\n──────────────────────────────────────\n>I am trying to load ${filesjs.length} files from ${loadFolder}, hold up!`);
        filesjs.forEach((f, i) => {
            let file = require(`${loadFolder}${f}`);
            if (file.settings.enabled == false) {
                console.log(`${i + 1}: ${f} is disabled and will not be loaded`);
                return;
            }
            if(requiring == true){
                file.run(client, config)
            }
            console.log(`${i + 1}: ${f} ready to fly!`);
            if(collection !== false){
                collection.set(file.help.name, file);
            }
        });
        console.log('──────────────────────────────────────');
    });
};

exports.settings = {
    enabled: false,     
    public: false,
};