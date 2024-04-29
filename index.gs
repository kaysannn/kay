function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");

  var newRow = sheet.getLastRow() + 1;
  var rowData = [];

  rowData[0] = e.parameter.no;
  rowData[1] = e.parameter.nama;
  rowData[2] = e.parameter.jenis;
  rowData[3] = new Date();
  rowData[4] = e.parameter.uraian;
  rowData[5] = e.parameter.target;

  sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);

  const url = 'data:image/png;base64,' + e.parameter.buktisEnc;
  const image = SpreadsheetApp.newCellImage().setSourceUrl(url).build();
  const range = SpreadsheetApp.getActiveSheet().getRange("G" + newRow);
  range.setValue(image);

  return ContentService.createTextOutput('Data berhasil disimpan');
}