import Service from './service/service';
import { IDataLevels } from './service/typeService';
import SideBar from './side-bar/side-bar';

class Controller {
  private dbLink: string;

  public activeTaskNumber: number = 2;

  public sideBar!: object;

  public code!: object;

  public dataLevels!: IDataLevels[];

  constructor(dbLink: string) {
    this.dbLink = dbLink;
  }

  private saveLocalStorage(): void {
    localStorage.setItem('levels', JSON.stringify(this.dataLevels));
  }

  public async startApp(): Promise<void> {
    if (localStorage.getItem('levels') === null) {
      const returnedServer = await Service.loadingData(this.dbLink);
      this.dataLevels = returnedServer as IDataLevels[];
      this.saveLocalStorage();
    } else {
      this.dataLevels = JSON.parse(localStorage.getItem('levels') || '');
    }
    this.dataDistribution();
    this.switchTasks();
    this.startTraking();
  }

  public dataDistribution(): void {
    this.sideBar = new SideBar();
    console.log(this.activeTaskNumber);
    SideBar.render(this.dataLevels[this.activeTaskNumber - 1], this.activeTaskNumber, this.dataLevels.length);
  }

  public checkAnswer(event: Event): void {
    event.preventDefault();
    const input = document.querySelector('.input-code') as HTMLInputElement;
    if (input.value === this.dataLevels[this.activeTaskNumber - 1].answer) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  public startTraking(): void {
    const form = document.querySelector('#form-code') as Element;
    form.addEventListener('submit', (event) => {
      this.checkAnswer(event);
    });
  }

  public switchTasks(): void {
    const lvlNav = document.querySelector('.level-nav');
    lvlNav?.addEventListener('click', (element) => {
      const foo = element.target as Element;
      if (foo.classList.contains('next') && this.activeTaskNumber < this.dataLevels.length) {
        this.activeTaskNumber += 1;
        this.dataDistribution();
      } else if (foo.classList.contains('prev') && this.activeTaskNumber > 1) {
        this.activeTaskNumber -= 1;
        this.dataDistribution();
      }
    });
  }
}

export default Controller;
