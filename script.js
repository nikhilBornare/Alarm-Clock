// const currentTime = document.querySelector("h1"),
//     content = document.querySelector(".content"),
//     selectMenu = document.querySelectorAll("select"),
//     setAlarmBtn = document.querySelector("button"),
//     upcomingAlarm = document.querySelector(".upcoming-alarm");

// let alarmTime, isAlarmSet,
//     ringtone = new Audio("7120-download-iphone-6-original-ringtone-42676.mp3");

// for (let i = 12; i > 0; i--) {
//     i = i < 10 ? `0${i}` : i;
//     let option = `<option value="${i}">${i}</option>`;
//     selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
// }
// for (let i = 59; i >= 0; i--) {
//     i = i < 10 ? `0${i}` : i;
//     let option = `<option value="${i}">${i}</option>`;
//     selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
// }

// for (let i = 2; i > 0; i--) {
//     let ampm = i == 1 ? "AM" : "PM";
//     let option = `<option value="${ampm}">${ampm}</option>`;
//     selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
// }


// setInterval(() => {
//     let date = new Date(),
//         h = date.getHours(),
//         m = date.getMinutes(),
//         s = date.getSeconds(),
//         ampm = "AM";
//     if (h >= 12) {
//         h = h - 12;
//         ampm = "PM";
//     }
//     h = h == 0 ? h = 12 : h;
//     h = h < 10 ? "0" + h : h;
//     m = m < 10 ? "0" + m : m;
//     s = s < 10 ? "0" + s : s;
//     currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

//     if (alarmTime === `${h}:${m} ${ampm}`) {
//         ringtone.play();
//         ringtone.loop = true;
//     }
// });

// // The setAlarm function is used to set and clear

// function setAlarm() {
//     if (isAlarmSet) {
//         alarmTime = "";
//         ringtone.pause();
//         content.classList.remove("disable");
//         setAlarmBtn.innerText = "Set Alarm";
//         upcomingAlarm.innerHTML = ""
//         return isAlarmSet = false;
//     }

//     let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
//     if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
//         return alert("Please, select a valid time to set Alarm!");
//     }
//     alarmTime = time;
//     isAlarmSet = true;
//     upcomingAlarm.innerHTML = time
//     content.classList.add("disable");
//     setAlarmBtn.innerText = "Clear Alarm";
// }

// setAlarmBtn.addEventListener("click", setAlarm);
const currentTime = document.querySelector("h1"),
    content = document.querySelector(".content"),
    selectMenu = document.querySelectorAll("select"),
    setAlarmBtn = document.querySelector("button"),
    upcomingAlarm = document.querySelector(".upcoming-alarm"),
    alarmsListElem = document.getElementById('alarms-list'); // Assuming you have an element with id 'alarms-list'

let alarmsArray = [], // To store multiple alarms
    ringtone = new Audio("7120-download-iphone-6-original-ringtone-42676.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    checkAlarms(`${h}:${m} ${ampm}`);
});

function checkAlarms(currentTime) {
    alarmsArray.forEach((alarm, index) => {
        if (alarm.time === currentTime) {
            ringtone.play();
            ringtone.loop = true;
            alert(`Alarm for ${currentTime} is ringing!`);
            ringtone.pause(); // Pause the ringtone after the alert.
            deleteAlarm(index); // Automatically delete the alarm after it rings.
        }
    });
}

function setAlarm() {
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    
    alarmsArray.push({ time });
    renderAlarms();
}

function renderAlarms() {
    alarmsListElem.innerHTML = '';
    alarmsArray.forEach((alarm, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `Alarm set for: ${alarm.time}`;
        
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-alarm-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteAlarm(index);
        
        listItem.appendChild(deleteBtn);
        alarmsListElem.appendChild(listItem);
    });
}

function deleteAlarm(index) {
    alarmsArray.splice(index, 1);
    renderAlarms();
}

setAlarmBtn.addEventListener("click", setAlarm);
