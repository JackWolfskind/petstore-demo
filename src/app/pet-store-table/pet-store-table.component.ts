import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FindByStatusParams, PetService } from 'src/api/generated/controllers/Pet';
import { Pet } from 'src/api/generated/model';
import { PetStoreTableDataSource } from './pet-store-table-datasource';

@Component({
  selector: 'app-pet-store-table',
  templateUrl: './pet-store-table.component.html',
  styleUrls: ['./pet-store-table.component.scss']
})
export class PetStoreTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Pet>;
  dataSource: PetStoreTableDataSource;
  parm: FindByStatusParams = {status: ['available']};
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(protected petService: PetService) {}

  ngOnInit() {
    this.petService.findByStatus
    this.dataSource = new PetStoreTableDataSource(this.petService, this.parm);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
