import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../user-create/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<User>();
  users: User[] = []
  displayedColumns = ['id', 'nome', 'rendaAnual', 'bloqueado' , 'action'];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.readAll().subscribe(users => {
      console.log(users)
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: any): void {
    const filterValue = event.target.value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  alterarEstadoBloqueio(user: User): void {
    this.userService.alterarEstadoBloqueio(user).subscribe(user => {
      console.log(user)
    })
  }

}
