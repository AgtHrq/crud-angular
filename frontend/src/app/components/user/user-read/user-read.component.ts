import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user-create/user.model';
import { UserService } from '../user.service';
import { HeaderService } from '../../template/header/header.service';

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
  displayedColumns = ['id', 'nome', 'rendaAnual', 'bloqueado', 'action'];

  constructor(
    private userService: UserService,
    private headerService: HeaderService) {
      headerService.headerData ={
        title: 'Usuários',
        icon: 'person',
        routeUrl: '/users'
      }
    }
  
  ngOnInit(): void {
    this.userService.readAll().subscribe(users => {
      this.dataSource.data = users
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  
  applyFilter(event: any):void {
    const filterValue = event.target.value.trim().toLowerCase()
    this.dataSource.filter = filterValue

  }

  alterarEstadoBloqueio(user: User):void{
    this.userService.alterarEstadoBloqueio(user).subscribe(bloqueado => {
      this.dataSource.data.forEach(userFromList => {
        if (userFromList.id == user.id){
          userFromList.bloqueado = bloqueado.body
        }
      })
    })
  }
}