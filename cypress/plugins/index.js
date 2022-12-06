/// <reference types="cypress" />

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const cucumber = require('cypress-cucumber-preprocessor').default;
const xlsx = require('node-xlsx');
const xls = require('xlsx');  
// const csvToJson=require('csvToJson');
const fs = require('fs'); 
const { resolve } = require('path');



module.exports = (on, config) => {
  
  on('file:preprocessor', cucumber()),
  on('task', { 
    generateJSONFromExcel:generateJSONFromExcel,
    parseXlsx({ filePath }) {
       return new Promise((resolve, reject) =>{
          try{
            const jsonData = xlsx.parse(fs.readFileSync(filePath)); 
            resolve(jsonData);
          } catch (e) {
           reject(e);
          } });
      }});  
  return config;
}

function generateJSONFromExcel(agrs) {
  const wb = xls.readFile(agrs.excelFilePath, { dateNF: "mm/dd/yyyy" });
  const ws = wb.Sheets[agrs.sheetName];
  return xls.utils.sheet_to_json(ws, { raw: false });
}







