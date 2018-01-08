import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {}

  ngOnInit() {}
}
