import React, { Component } from "react";

class excel extends Component {
    download = () => {
        const originalTable = document.getElementsByTagName('table')[0];    
        let temp="";
        for(let i=0;i<originalTable.rows.length-1;i++){
            temp+=document.getElementById(i).innerHTML+"///";
            document.getElementById(i).innerHTML="";
        }
        let del=document.getElementById("del").innerHTML;
        document.getElementById("del").innerHTML="";//수정
 
        let tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
            tab_text += '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
            tab_text += '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
            tab_text += '<x:Name>Test Sheet</x:Name>';
            tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
            tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
            tab_text += "<table border='1px'>";
        let exportTable = originalTable.cloneNode(true);

        tab_text += exportTable.outerHTML;
        tab_text += '</table></body></html>';
        let ua = window.navigator.userAgent;
        let msie = ua.indexOf("MSIE ");
        let fileName = this.props.name +"_Table.xls";


        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11./)) {
            if (window.navigator.msSaveBlob) {
                let blob = new Blob([tab_text], {
                    type: "application/csv;charset=utf-8;"
                });
                navigator.msSaveBlob(blob, fileName);
            }
        } else { 
            let blob2 = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            let filename = fileName;
            let elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob2);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }

        let tempSplit=temp.split("///");
        document.getElementById("del").innerHTML=del;
        for(let i=0;i<originalTable.rows.length-1;i++){
            document.getElementById(i).innerHTML=tempSplit[i];
        }
    }


    render() {
        return(
            <div>
                <button onClick={this.download}>excel DOWNLOAD</button>
            </div>
        );
    }
}
export default excel