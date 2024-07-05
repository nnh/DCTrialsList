// BaseシートのA列の値が変更された場合にメッセージボックスを表示する
// 参考URL
// https://tonari-it.com/gas-trigger-changed/
// https://developers.google.com/apps-script/guides/triggers/events
// https://teratail.com/questions/21724
// https://jjnurburg.com/onedit2/

export function onEdit(e: GoogleAppsScript.Events.SheetsOnEdit) {
  // Set a comment on the edited cell to indicate when it was changed.
  const targetsheetname: string = "Base";
  const targetrange: string[][] = e.range.getValues(); // 複数セル編集時対応
  const sheet: GoogleAppsScript.Spreadsheet.Spreadsheet = e.source;
  const sheetname: string = sheet.getActiveSheet().getName();
  let msgstrings: string = "";
  let erow: number;
  let ecol: number;

  // シート名「Base」のA列のみ対象とする
  if (sheetname === targetsheetname) {
    for (let i: number = 0; i < targetrange.length; i++) {
      erow = e.range.getRow() + i;
      for (let j: number = 0; j < targetrange[0].length; j++) {
        ecol = e.range.getColumn() + j;
        if (ecol === 1) {
          const sheet: GoogleAppsScript.Spreadsheet.Sheet =
            e.source.getSheetByName(
              targetsheetname
            ) as GoogleAppsScript.Spreadsheet.Sheet;
          const range: GoogleAppsScript.Spreadsheet.Range = sheet.getRange(
            erow,
            ecol
          );
          msgstrings = `${msgstrings}セル:${range.getA1Notation()}　変更後の値:${range.getValue()}\n`;
        }
      }
    }
  }
  if (msgstrings.length > 0) {
    Browser.msgBox(
      `${targetsheetname}シートのプロトコールIDが変更されました。\nプロトコールIDの変更がある場合は、他のシートも全て変更してください。\n${msgstrings}`
    );
  }
}
