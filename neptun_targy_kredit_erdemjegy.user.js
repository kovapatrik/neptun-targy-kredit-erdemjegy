// ==UserScript==
// @name         Neptun - tárgy/kredit/érdemjegy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @downloadURL  https://github.com/kovapatrik/neptun-targy-kredit-erdemjegy/raw/main/neptun_targy_kredit_erdemjegy.user.js
// @description  try to take over the world!
// @author       kovapatrik
// @match        https://hallgato.neptun.elte.hu/main.aspx?ismenuclick=true&ctrl=0206
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    let header = document.getElementById('function_tableheader').getElementsByClassName('FunctionTable')[0].tBodies[0];
    let tr = document.createElement('tr');
    let td = tr.insertCell();

    let btn = document.createElement('button');
    btn.innerHTML = 'Tárgy/kredit/érdemjegy';
    td.appendChild(btn);

    header.appendChild(tr);


    btn.onclick = (e) => getTable(e);

    function getTable(e) {
        e.preventDefault();
        let table = document.getElementById('h_markbook_gridIndexEntry_bodytable').tBodies[0];
        let output = '';
        for (let i = 0; i < table.rows.length; i++) {
            let row = table.rows[i];
            let name = row.cells[2].innerText.split(',')[0];
            let credit = row.cells[3].innerText;
            let grade = row.cells[9].innerText.split('\n');
            grade.pop();
            grade = grade[grade.length - 3];
            switch (grade) {
                case 'Jeles':
                    grade = '5';
                    break;
                case 'Jó':
                    grade = '4';
                    break;
                case 'Közepes':
                    grade = '3';
                    break;
                case 'Elégséges':
                    grade = '2';
                    break;
                default:
                    grade = '';
            }
            output += name + ';' + credit + ';' + grade + '\n'
        }
        console.log(output);
    }

})();
