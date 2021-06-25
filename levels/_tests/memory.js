
/*

const options = {
  types: [
    {
      description: 'Text Files',
      accept: {
        'text/plain': ['.txt'],
      },
    },
  ],
};


async function getNewFileHandle() {
  const handle = await window.showSaveFilePicker(options);
  return handle;
}


async function writeFile(fileHandle, contents) {
console.log(2);
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}

writeFile("test", "content");

// https://mega.nz/file/vN9AXAxR#-ocK3dO1e7Tul96iA40iQ4B-bxIU0kqPh0KpSLnzD5U
/*

async function saveFile(); {

  // create a new handle
  const newHandle = await window.showSaveFilePicker();

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write our file
  await writableStream.write("test");

  // close the file and write the contents to disk.
  await writableStream.close();
}
saveFile();


let fileHandle;

async function getFile() {
  // open file picker
  [fileHandle] = await window.showOpenFilePicker();

  if (fileHandle.kind === 'file') {
    // run file code
  } else if (fileHandle.kind === 'directory') {
    // run directory code
  }
}

const pickerOpts = {
  types: [
    {
      description: 'Images',
      accept: {
        'image/*': ['.png', '.gif', '.jpeg', '.jpg']
      }
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false
};

async function getTheFile() {
  // open file picker
  [fileHandle] = await window.showOpenFilePicker(pickerOpts);

  // get file contents
  const fileData = await fileHandle.getFile();
}


async function getTheFile() {
console.log(1);
  // open file picker
  [fileHandle] = await window.showOpenFilePicker(options); // fileHandle.createWritable is not a function

  // get file contents
  const fileData = await fileHandle.getFile();
  console.log(fileData);
}


getTheFile() ;*/


function save() {
  var content = ["your-content-here"];
  var bl = new Blob(content, {type: "text/plain"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(bl);
  a.download = "your-download-name-here.txt";
  a.hidden = true;
  document.body.appendChild(a);
  a.click();
}
