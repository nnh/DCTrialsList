import { exportSupports } from "./exportSupports";
import { onEdit } from "./showStatus";
import { dcTrialslist } from "./editDcTrialslist";

function onOpen() {
  const arr1 = [{ name: "DCtrialslist作成", functionName: "dcTrialslist" }];
  const arr2 = [{ name: "ARO支援一覧test", functionName: "exportSupports" }];
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  spreadsheet.addMenu("DCtrialslist作成", arr1);
  spreadsheet.addMenu("ARO支援一覧test", arr2);
}

declare const global: {
  [x: string]: any;
};

global.onOpen = onOpen;
global.onEdit = onEdit;
global.exportSupports = exportSupports;
global.dcTrialslist = dcTrialslist;
