import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { successSwal } from './Toast';

export const exportToExcel = (dataArray, fileName = 'data', sheetName = 'Sheet1') => {

    if (!dataArray || dataArray.length === 0) {
        errorSwal("No records available to export!");
        return;
    }

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(dataArray);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getFullYear()).slice(-2)}`;
    saveAs(dataBlob, `${fileName}_${formattedDate}.xlsx`);

    successSwal("Data Exported Successfully !")
};