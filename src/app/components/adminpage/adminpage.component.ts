import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public selectedImage:ImageSelected;
  public uploadfile(ImageInput:any)
  {const file =ImageInput?.target.files[0];
    const reader=new FileReader();
    reader.addEventListener('load',(event:any)=>{
      this.selectedImage=new ImageSelected(event.target.result,file);
    })
    if (file!=null) {
      
      reader.readAsDataURL(file);
    }
  }
}
class ImageSelected
{
  constructor(public src:string,public file:File) {
    
  }
}
