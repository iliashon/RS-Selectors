import { IDataLevels } from '../service/typeService';

class Code {
  public static startTracking(data: IDataLevels): void {
    const { answer } = data;
    const input = document.querySelector('.input-code') as Element;
    input.addEventListener('submit', (text) => {
      console.log(text);
      text.preventDefault();
    });
  }
}

export default Code;
