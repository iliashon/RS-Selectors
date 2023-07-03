import { IDataLevels } from '../service/typeService';

function renderSideBar(data: IDataLevels, activeLevel: number, quantityLevels: number): void {
  const { examples, selectorName, syntax, title, hint, state, titleTask, help } = data;
  const exam = document.querySelector('.examples') as Element;
  const hintHtml = document.querySelector('.selector-hint') as Element;
  const syntaxHtml = document.querySelector('.selector-syntax') as Element;
  const titleHtml = document.querySelector('.selector-title') as Element;
  const selectorNameHtml = document.querySelector('.selector-name') as Element;
  const activeLevelHtml = document.querySelector('.active-level') as Element;
  const quantityLevelsHtml = document.querySelector('.quantity-levels') as Element;
  const titleLvl = document.querySelector('#title-lvl') as Element;
  const check = document.querySelector('.level-check') as Element;
  const helpText = document.querySelector('.help-text') as Element;
  helpText.textContent = help;
  titleLvl.textContent = titleTask;
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

export default renderSideBar;
