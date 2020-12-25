import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbiden',
  templateUrl: './forbiden.component.html',
  styleUrls: ['./forbiden.component.scss']
})
export class ForbidenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const interval = 500;

    function generateLocks() {
      const lock = document.createElement('div'),
        position = generatePosition();
      lock.innerHTML = '<div class="top"></div><div class="bottom"></div>';
      lock.style.top = position[0];
      lock.style.left = position[1];
      lock.classList.add('lock')
      document.body.appendChild(lock);
      setTimeout(() => {
        lock.style.opacity = '1';
        lock.classList.add('generated');
      }, 100);
      setTimeout(() => {
        lock.parentElement.removeChild(lock);
      }, 2000);
    }
    function generatePosition() {
      const x = Math.round((Math.random() * 100) - 10) + '%';
      const y = Math.round(Math.random() * 100) + '%';
      return [x, y];
    }
    setInterval(generateLocks, interval);
    generateLocks();
  }

}
