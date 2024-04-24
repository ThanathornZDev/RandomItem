const items = [
    // { name: 'ชื่อรูป', label: 'ชื่อ label', percentage: %การออก }
    { name: 'Pencil', label: 'ดินสอ', percentage: 55.5 },
    { name: 'Pen', label: 'ปากกา', percentage: 55.5 },
    { name: 'Snack', label: 'ขนม', percentage: 40.0 },
    { name: 'Doll', label: 'ตุ๊กตา', percentage: 10.0 },
    { name: 'Keychain', label: 'พวกกุญแจ', percentage: 5.0 }
];

var audiorandom = new Audio(`sounds/random.mp3`);
var audiosuccess = new Audio(`sounds/success.mp3`);

const itemDisplay = document.querySelector('.item-display img');
const generateBtn = document.getElementById('generate-btn');
const stopBtn = document.getElementById('stop-btn');
const notification = document.getElementById('notification');

let interval;
let currentIndex;
   

generateBtn.addEventListener('click', () => {
    currentIndex = -1;
    generateBtn.style.display = 'none';
    stopBtn.style.display = 'block';
    notification.textContent = '';
    clearInterval(interval);
    interval = setInterval(changeItem, 50);
    audiorandom.currentTime = 0;
    audiorandom.play();
    setTimeout(() => {
        randomitem();
        audiorandom.pause();
        audiosuccess.currentTime = 0;
        audiosuccess.play();
    }, 5100 );
});

function randomitem() {
const totalPercentage = items.reduce((total, item) => total + item.percentage, 0);
const random = Math.random();
let accumulatedPercentage = 0;
let selectedItem = null;
for (const item of items) {
    accumulatedPercentage += item.percentage / totalPercentage;
    if (random < accumulatedPercentage) {
        selectedItem = item;
        break;
    }
}
    if (selectedItem) {
        clearInterval(interval);
        notification.textContent = `คุณได้รับ ${selectedItem.label} จำนวน 1EA`;
        generateBtn.style.display = 'block';
        stopBtn.style.display = 'none';
        console.log('รายการที่ถูกสุ่ม: ', selectedItem.name, '-', selectedItem.label);
        itemDisplay.src = `images/${selectedItem.name}.png`;
    } else {
        console.log('ไม่สามารถสุ่มรายการได้');
    }
}

  
function changeItem() {
    currentIndex = (currentIndex + 1) % items.length;
    itemDisplay.src = `images/${items[currentIndex].name}.png`;
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) {
        event.preventDefault();
        generateBtn.click();
    }
}); 

window.addEventListener('load', () => {
    itemDisplay.src = `images/mystery.png`;
});
