import { Component, VERSION } from '@angular/core';
import { read, utils, writeFileXLSX } from 'xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: any;

  onChange(evt) {    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      //this.data = new Data();
      //console.log(XLSX.utils.decode_row("10"));
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.data);
      this.data.forEach(row => {
        console.log(row);
      });
    };
    reader.readAsArrayBuffer(target.files[0]);
    evt.target.value = null;
  }

}

export class Data {
  ou: string;
  grId: string;
}