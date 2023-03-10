import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

export interface PeriodicElement {
  codigo: number;
  nome: string;
  instrutor: string;
  local: string;
  carga: number;
  datainicio: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, nome: 'Centura', instrutor: 'Genival', local: 'Procenge', carga: 30, datainicio: '16/01/2022'},
  {codigo: 2, nome: 'PHP', instrutor: 'Genival', local: 'Procenge', carga: 35, datainicio: '16/01/2022'},
  {codigo: 3, nome: 'Ruby', instrutor: 'Genival Barbosa', local: 'Softex', carga: 50, datainicio: '16/01/2022'},
  {codigo: 4, nome: 'Linux', instrutor: 'Genival', local: 'Procenge', carga: 150, datainicio: '16/01/2022'},
  {codigo: 5, nome: 'C++', instrutor: 'Genival Barbosa', local: 'Softex', carga: 300, datainicio: '16/01/2022'}
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText:string = "";
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['codigo', 'nome', 'instrutor', 'local', 'carga', 'datainicio'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(element: PeriodicElement | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      data: element === null ? {
        codigo: null,
        nome: '',
        instrutor: '',
        local: '',
        carga: null,
        datainicio: ''
      } : element
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result !== undefined){
        this.dataSource.push(result);
        this.table.renderRows();
      }
    });

  }

  filtrarRegistros() {
    // Armazenando o valor do input de pesquisa em uma variável
    let valorPesquisa = this.searchText;
    // Filtrando os registros com base no valor de pesquisa
    this.dataSource = this.dataSource.filter(registro => {
        return registro.nome.toLowerCase().includes(valorPesquisa.toLowerCase()) || 
               registro.instrutor.toLowerCase().includes(valorPesquisa.toLowerCase()) || 
               registro.local.toLowerCase().includes(valorPesquisa.toLowerCase());
    });
  }
}
