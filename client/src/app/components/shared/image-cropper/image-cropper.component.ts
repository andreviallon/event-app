import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CropperOptions } from 'ngx-cropperjs-wrapper';

@Component({
  selector: 'app-image-cropper',
  template: `
    <div class="flex-container">
      <label>Image</label>
      <div class="flex-row">
        <div class="img-container">
        <lib-cropper [imageFile]="fileInput" [options]="options" (fileChange)="fileChange($event)"></lib-cropper>
        <p *ngIf="!fileInput" class="no-image">No Image Selected</p>
      </div>
      <div class="buttons-container">
        <input class="ng-hide" #inputFile multiple type="file" (change)="filePick($event)" accept="image/*"/>
        <button mat-flat-button color="primary" (click)="inputFile.click()">Upload</button>
        <button mat-button (click)="removeFile()">Remove</button>
      </div>
      </div>
    </div>
  `,
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit, OnChanges {

  @Input() defaultImage: string;
  @Output() imageData: EventEmitter<File> = new EventEmitter();

  constructor(private changeDetectorRef: ChangeDetectorRef, private http: HttpClient) {}

  public fileInput: File | Blob = null;
  public options = {
    scalable: false,
    zoomable: false,
    aspectRatio: 16 / 9,
  } as CropperOptions;

  public ngOnInit(): void {
    if (this.defaultImage) {
      this.setDefaultImg();
    }
    this.changeDetectorRef.markForCheck();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultImage.currentValue !== changes.defaultImage.previousValue) {
      this.setDefaultImg();
    }

    this.changeDetectorRef.markForCheck();
  }

  public setDefaultImg(): void {
    this.http.get(this.defaultImage, { responseType: 'blob' }).subscribe(response => {
      this.fileInput = response;
    }, () => {
      console.error('There was an error fetching the image');
    });
  }

  public filePick(event: any): void {
    this.fileInput = event.target.files.item(0);
  }

  public fileChange(file: File): void {
    this.imageData.emit(file);
  }

  public removeFile(): void {
    this.fileInput = null;
    this.imageData.emit(null);
  }
}
