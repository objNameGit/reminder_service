import { IFormAttributes } from '@src/interfaces/IFormAttributes'

export class FormAttributes {
    title: string = "Новое напоминание";
    acceptButtonName: string = "Создать";
    cancelButtonName: string = "Отмена";

    constructor(formAttr?: IFormAttributes) {
        if (formAttr) {
            this.title = formAttr.title || this.title;
            this.acceptButtonName = formAttr.acceptButtonName || this.acceptButtonName;
            this.cancelButtonName = formAttr.cancelButtonName || this.cancelButtonName;
        }
  }
}