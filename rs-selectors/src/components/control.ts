import Code from './code-editor/code';
import Service from './service/service';
import { IDataLevels } from './service/typeService';
import SideBar from './side-bar/side-bar';
import Table from './table/table';

class Controller {
  private dbLink: string;

  public activeTaskNumber!: number;

  public sideBar!: object;

  public code!: object;

  public table!: object;

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
    if (localStorage.getItem('saveLevel') === null) {
      this.activeTaskNumber = 1;
    } else {
      this.activeTaskNumber = +(localStorage.getItem('saveLevel') || '');
    }
    this.dataDistribution();
    this.switchTasks();
    this.startTraking();
  }

  public dataDistribution(): void {
    SideBar.renderSideBar(this.dataLevels[this.activeTaskNumber - 1], this.activeTaskNumber, this.dataLevels.length);
    Code.renderHmtlMarkup(this.dataLevels[this.activeTaskNumber - 1].htmlMarkup);
    Table.renderElementsOnTable(this.dataLevels[this.activeTaskNumber - 1].html);
    this.controlProgres();
  }

  public controlProgres(): void {
    const lineProg = document.getElementById('line-progres-level');
    if (lineProg !== null) {
      lineProg.style.width = `${(100 / this.dataLevels.length) * this.activeTaskNumber}%`;
    }
  }

  public checkAnswer(event: Event): void {
    event.preventDefault();
    const input = document.querySelector('.input-code') as HTMLInputElement;
    if (input.value === this.dataLevels[this.activeTaskNumber - 1].answer) {
      this.dataLevels[this.activeTaskNumber - 1].state = true;
      SideBar.renderSideBar(this.dataLevels[this.activeTaskNumber - 1], this.activeTaskNumber, this.dataLevels.length);
      input.value = '';
      localStorage.setItem('levels', JSON.stringify(this.dataLevels));
      this.activeTaskNumber += 1;
      setTimeout(() => {
        this.dataDistribution();
      }, 1000);
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
        localStorage.setItem('saveLevel', this.activeTaskNumber.toString());
        this.dataDistribution();
      } else if (foo.classList.contains('prev') && this.activeTaskNumber > 1) {
        this.activeTaskNumber -= 1;
        localStorage.setItem('saveLevel', this.activeTaskNumber.toString());
        this.dataDistribution();
      }
    });
  }
}

export default Controller;
