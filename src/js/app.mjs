const hello = () => {
    console.log('hello world');
}

const elements = document.querySelectorAll('.element');

[...elements].forEach(element => {
    console.log(element);
});