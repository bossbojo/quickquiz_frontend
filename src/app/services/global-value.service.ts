import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageConfog } from '../configs/storage.config';
@Injectable()
export class GlobalValueService {

  //#region  sidebar
  public User = StorageConfog.getItem('user');
  public Active: string;
  public OpenSideBar: boolean = false;
  ToggleSidebar() {
    if (!this.OpenSideBar) {
      $('#OpenSide').fadeIn();
      $('#OpenClose').fadeOut();
      $('#sidebar-main').addClass('sidebar-hidden');
      this.OpenSideBar = !this.OpenSideBar;
    } else {
      $('#OpenClose').fadeIn();
      $('#OpenSide').fadeOut();
      $('#sidebar-main').removeClass('sidebar-hidden');
      this.OpenSideBar = !this.OpenSideBar;
    }
  }
  //#endregion

  //#region  loading
  OnShowLoading() {
    $('.loading').fadeIn();
  }
  OnHiddenLoading() {
    $('.loading').fadeOut();
  }
  OnChangeTextLoading(text: string) {
    $('#TextLoading').html(text);
  }
  //#endregion 
}