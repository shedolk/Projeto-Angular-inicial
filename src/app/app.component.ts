import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
// export class AppComponent {
//   title = 'hello-world';
// }

export class AppComponent {
    title = 'hello-world';

  // ngOnInit() {
  //   this.http
  //     .get('https://jsonplaceholder.typicode.com/todos/1')
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
}
