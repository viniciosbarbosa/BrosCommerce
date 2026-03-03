import { Component } from '@angular/core';
import { LOADING_MODULE } from '../../modules/loading.module';

@Component({
  selector: 'app-loading',
  imports: [LOADING_MODULE],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {}
