function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");

  // Mendapatkan nomor baris terakhir yang terisi di kolom A
  var lastRow = sheet.getRange("A:A").getValues().filter(String).length;

  // Menambahkan 1 pada nomor baris terakhir yang terisi untuk baris baru
  var newRow = lastRow + 1;

  // Membuat nomor baru untuk kolom pertama
  var newNumber = lastRow + 1;

  var rowData = [];
  rowData[0] = newNumber; // Menggunakan nomor baru yang dihasilkan
  rowData[1] = e.parameter.nama;
  rowData[2] = e.parameter.jenis;
  rowData[3] = new Date();
  rowData[4] = e.parameter.uraian;
  rowData[5] = e.parameter.target;

  sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);

  const url = 'data:image/png;base64,' + e.parameter.buktisEnc;
  const image = SpreadsheetApp.newCellImage().setSourceUrl(url).build();
  const range = sheet.getRange("G" + newRow);
  range.setValue(image);

  // Menyimpan nomor terbaru ke spreadsheet
  sheet.getRange("A" + newRow).setValue(newNumber);

  return ContentService.createTextOutput('Data berhasil disimpan');
}
