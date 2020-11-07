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
  isEditable = true;

  timeAvailable: TimeForSpeedDate[] = [
    {value: '30', viewValue: '30 minutos'},
    {value: '45', viewValue: '45 minutos'},
    {value: '60', viewValue: '60 minutos'},
    {value: '90', viewValue: '90 minutos'},
    {value: '120', viewValue: '120 minutos'}
  ];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      teamName: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
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

  thereAreMoreThanOneParticipants(): boolean {
    return this.participants.length > 1;
  }

  cleanParticipants(): void {
    this.participants.clear();
    this.participants.push(this.formBuilder.group({name: ''}));
  }

  prepareData(): any {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid){
     return Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value);
    }
  }

}
