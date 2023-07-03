import Code from './code-editor/code';
import Service from './service/service';
import { IDataLevels } from './service/typeService';
import LevelList from './side-bar/level-list';
import SideBar from './side-bar/side-bar';
import Table from './table/table';

class Controller {
  private dbLink: string;

  public activeTaskNumber!: number;

  public dataLevels!: IDataLevels[];

  constructor(dbLink: string) {
    this.dbLink = dbLink;
  }

  private saveLocalStorage(): void {
    localStorage.setItem('levels', JSON.stringify(this.dataLevels));
  }

  public setJobNumber(numTask: number): void {
    this.activeTaskNumber = numTask;
    this.dataDistribution();
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
    Controller.burgerMenu();
  }

  public dataDistribution(): void {
    SideBar.renderSideBar(this.dataLevels[this.activeTaskNumber - 1], this.activeTaskNumber, this.dataLevels.length);
    Code.renderHmtlMarkup(this.dataLevels[this.activeTaskNumber - 1].htmlMarkup);
    Table.renderElementsOnTable(this.dataLevels[this.activeTaskNumber - 1].html);
    LevelList.renderLevelList(this.activeTaskNumber);
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
    const editor = document.querySelector('.editor') as Element;
    if (input.value === this.dataLevels[this.activeTaskNumber - 1].answer) {
      this.dataLevels[this.activeTaskNumber - 1].state = true;
      SideBar.renderSideBar(this.dataLevels[this.activeTaskNumber - 1], this.activeTaskNumber, this.dataLevels.length);
      input.value = '';
      localStorage.setItem('levels', JSON.stringify(this.dataLevels));
      if (this.activeTaskNumber === this.dataLevels.length) {
        console.log('level low');
        input.value = '';
      } else {
        this.activeTaskNumber += 1;
        setTimeout(() => {
          this.dataDistribution();
        }, 1000);
      }
    } else {
      editor.classList.add('incorrect');
      setTimeout(() => {
        editor.classList.remove('incorrect');
      }, 500);
    }
  }

  public startTraking(): void {
    const form = document.querySelector('#form-code') as Element;
    form.addEventListener('submit', (event) => {
      this.checkAnswer(event);
    });
  }

  public static burgerMenu(): void {
    const lvlList = document.querySelector('.level-list') as Element;
    const burgerBtn = document.querySelector('.burger-button') as Element;
    burgerBtn.addEventListener('click', () => {
      if (burgerBtn.classList.contains('burger__active')) {
        burgerBtn.classList.remove('burger__active');
        lvlList.classList.remove('level-list__open');
      } else {
        burgerBtn.classList.add('burger__active');
        lvlList.classList.add('level-list__open');
      }
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
