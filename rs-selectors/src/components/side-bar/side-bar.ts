import { IDataLevels } from '../service/typeService';

class SideBar {
  public static render(data: IDataLevels, activeLevel: number, quantityLevels: number): void {
    const { examples, selectorName, syntax, title, hint, state } = data;
    const exam = document.querySelector('.examples') as Element;
    const hintHtml = document.querySelector('.selector-hint') as Element;
    const syntaxHtml = document.querySelector('.selector-syntax') as Element;
    const titleHtml = document.querySelector('.selector-title') as Element;
    const selectorNameHtml = document.querySelector('.selector-name') as Element;
    const activeLevelHtml = document.querySelector('.active-level') as Element;
    const quantityLevelsHtml = document.querySelector('.quantity-levels') as Element;
    const check = document.querySelector('.level-check') as Element;
    hintHtml.textContent = hint;
    syntaxHtml.textContent = syntax;
    titleHtml.textContent = title;
    selectorNameHtml.textContent = selectorName;
    activeLevelHtml.textContent = activeLevel.toString();
    quantityLevelsHtml.textContent = quantityLevels.toString();
    check.classList.remove('check_active');
    if (state) {
      check.classList.add('check_active');
    }
    exam.innerHTML = '';
    examples.forEach((example) => {
      exam.innerHTML += example;
    });
  }
}

export default SideBar;
