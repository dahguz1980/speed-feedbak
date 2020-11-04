import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';


interface TimeForSpeedDate {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-capture-data',
  templateUrl: './capture-data.component.html',
  styleUrls: ['./capture-data.component.css']
})


export class CaptureDataComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  selectedValue: string;

  timeAvailable: TimeForSpeedDate[] = [
    {value: '30', viewValue: '30 minutos'},
    {value: '45', viewValue: '45 minutos'},
    {value: '60', viewValue: '60 minutos'},
    {value: '90', viewValue: '90 minutos'},
    {value: '120', viewValue: '120 minutos'}
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
      participants: this.formBuilder.array([this.formBuilder.group({name: ''})])
    });
  }

  get participants(): FormArray {
    return this.secondFormGroup.get('participants') as FormArray;
  }

  addParticipants(): void {
    this.participants.push(this.formBuilder.group({name: ''}));
  }

  deleteParticipants(index: any): void {
    this.participants.removeAt(index);
  }

}
