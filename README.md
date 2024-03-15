ARCHERSGUILD Web Forum Instructions

1. Extract the zip file.
2. In the command line, go to the extracted folder's directory.
3. Enter the following commands:
  - npm init
  - npm install express
  - npm install hbs
  - npm install mongoose
  - npm install multer
4. Initialize data: Before your first run, remove the starting multiline comment symbol (/*) on line 35 and the ending symbol (*/) on line 165 of index.js.

!! IMPORTANT 
Remember to insert these multiline comment symbols again before your second run to avoid duplicate data. (Please see the previous step's line numbers as your reference)

If the website is not running, please see the following:
- For MacOS devices, uncomment the sendfile comment (line 172) for MacOS and comment out the sendfile comment for Windows (line 169) of index.js
- For Windows devices, uncomment the sendfile comment (line 169) for Windows and comment out the sendfile comment for MacOS (line 172) of index.js.
