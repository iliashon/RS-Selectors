import { IDataLevels } from '../service/typeService';

class LevelList {
  public static renderLevelList(activeTask: number): void {
    const data: IDataLevels[] = JSON.parse(localStorage.getItem('levels') || '');
    const levelList = document.querySelector('.lvl-list-block') as Element;
    levelList.innerHTML = '';
    data.forEach((elem, index) => {
      const item = document.createElement('li') as HTMLElement;
      item.classList.add('lvl-list-item');
      const check = document.createElement('span') as Element;
      if (elem.state) {
        check.classList.add('check-in-list-active');
      } else {
        check.classList.add('check-in-list');
      }
      if (index === activeTask - 1) {
        item.style.backgroundColor = '#4f4f4f';
      }
      item.setAttribute('data-id', (index + 1).toString());
      item.append(check);
      item.innerHTML += `<h4>${index + 1}</h4>`;
      item.innerHTML += `<h4>${elem.syntax}</h4>`;
      levelList.append(item);
    });
  }
}

export default LevelList;
