
export function formatNumberWithSpaces(number:number) {
    let numberString = String(number);
    numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return numberString;
}
export function chooseForm(count:string|number, onlyWord = false) {
    count = Number(count);

    const forms = ['товар', 'товара', 'товаров'];
    let form;
    if (count % 10 === 1 && count % 100 !== 11) {
        form = forms[0];
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        form = forms[1];
    } else {
        form = forms[2];
    }
    if(onlyWord){
        return form
    }
    return `${formatNumberWithSpaces(count)} ${form}`;
}
