const alertBanner = document.getElementById('alert');
const bell = document.getElementById('bell');
const randomName = ['Josh', 'Victoria', 'Dale', 'Dan'];

const trafficChart = document.getElementById('traffic-chart').getContext('2d');
const dailyChart = document.getElementById('daily-chart');
const mobileChart = document.getElementById('mobile-chart');

const trafficNav = document.querySelector('.traffic-nav');
const trafficNavLink = trafficNav.children;

const weeklyDatasets = [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500, 1000];
const weeklyLabels = ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"];
const dailyLabels = ["S", "M", "T", "W", "T", "F", "S" ];
const hourlyLabels = ["0-2", "2-4","4-6","6-8","8-10","10-12","12-14","14-16","16-18","18-20", "20-22", "22-24"];
const monthlyLabels = ["Jan","Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const toggleSwitch = document.querySelectorAll('.switch-light span');

// variables used for message autocomplete
const select = document.querySelector('.autoList');
const input = document.getElementById('userField');
const message = document.getElementById('messageField');
const send = document.getElementById('send');
const userList = [
  'Josh Sullivan',
  'Lisa Lee',
  'Victoria Chambers',
  'Chris Singh',
  'Ben Mott',
  'Gladys Chan',
  'Maria Troong',
  'Drake Paul',
  'Vanessa May'
];

// variables used for localstorage
const settings = document.getElementById('settings');
const save = document.getElementById('save');
const cancel = document.getElementById('cancel');
const switch1 = document.querySelectorAll('input[type=checkbox]')[0];
const switch2 = document.querySelectorAll('input[type=checkbox]')[1];  
const timezone = document.getElementById('timezone');



// ===============Alert Banner inner HTML setup & notification interaction =================
alertBanner.innerHTML = `
  <div class="alert-banner">  
    <p class="alert-message"><strong>Alert : </strong> You have received some messages and likes.</p> 
    <p class="alert-banner-close">x</p>
  </div>`

bell.addEventListener('click', () => {  
  let randNameGenerate =  randomName[Math.floor(Math.random(randomName.length)* (randomName.length))];
  createAlert(Math.floor(Math.random(10) * 11),randNameGenerate);
});

alertBanner.addEventListener('click', e => {
  const action = e.target;
  if(action.classList.contains('alert-banner-close')) {
    action.parentNode.style.display = "none";
  }
}); 

function createAlert(num, name) {
  let alertPop = `
  <div class="alert-banner">  
    <p class="alert-message"><strong>Alert : </strong> You have ${num} unread messages in your inbox.</p> 
    <p class="alert-banner-close">x</p>
  </div>
  <div class="alert-banner">  
  <p class="alert-message"><strong>Alert : </strong> ${name} liked your post.</p> 
  <p class="alert-banner-close">x</p>
</div>`;
  alertBanner.insertAdjacentHTML('beforeend',alertPop);
}

// End of Alert ==================================


///// Charts Configurations ======================================================

// Traffic Chart - LINE CHART

let daily = [];
let hourly =[];
let monthly = [];

function calculateTraffic (duration, value) {
  for(let i = 0 ; i < weeklyDatasets.length; i++) {
    duration.push(Math.floor(weeklyDatasets[i] / value));
  }
  return duration;
}

function pickChart(value, timing) {
  let trafficData = {
    labels: timing,
    datasets: [{
      data: value,
      backgroundColor: 'rgba(116, 119, 191, .3)',
      borderWidth: 1,
      lineTension: 0,
      borderColor: 'rgba(116, 119, 191)',
      borderWidth: 0.5,
      pointBackgroundColor : '#fff',
      pointBorderColor: 'rgba(116, 119, 191)',
      pointBorderWidth: 1.5,
      pointRadius: 4
    }]
  };
  
  let trafficOptions = {
    responsive: true,
    aspectRatio: 2.5,
    animation: {
      duration: 0
    },
    scales: {
      yAxes: [{
        ticks: {
         beginAtZero: true
        }
      }]
    },
    onclick: chartClickEvent,
    legend: {
      labels: {
        fontColor: '#bdbdbd',
        fontSize: 10
      },
      display: false      
    }      
  };

  const weeklyChart = new Chart(trafficChart, {
    type:'line',
    data: trafficData,
    options: trafficOptions
  });   
}

const chartClickEvent = trafficNav.addEventListener('click', (e) => {
  const button = e.target;
  if(button.classList.contains('weekly')) {
    pickChart(weeklyDatasets, weeklyLabels);
    clearButtonBg(button);
  } else if (button.classList.contains('daily')) {
    pickChart(calculateTraffic(daily, 7), dailyLabels);
    clearButtonBg(button);

  } else if (button.classList.contains('hourly')) {
    pickChart(calculateTraffic(hourly, 7*24), hourlyLabels);
    clearButtonBg(button);
  } else if (button.classList.contains('monthly')) {    
    pickChart(calculateTraffic(monthly, 1/4), monthlyLabels);
    clearButtonBg(button);
  }
});

pickChart(weeklyDatasets, weeklyLabels);

function clearButtonBg(button) {
  for(let i = 0; i < trafficNavLink.length; i++) {
    let element = trafficNavLink[i];
    element.style.backgroundColor = 'transparent';
    element.style.color = '#525151';
  }
  button.style.backgroundColor = '#81c98f';
  button.style.color = '#fff';
  button.style.fontWeight = 'bold';     
  button.style.transition = '0.2s ease-out' ;
}
// End of Line Chart ==========================================================


// Daily  Charts =========================================================
// BAR CHART
const dailyOptions = {
  aspectRatio: 2.2,
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              stepSize: 50
          }
      }]
  },
  legend: {
    display: false
  }
};

const dailyData = {
  labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  datasets: [{
      label: '# of Hits',
      data: [50, 100, 150, 100, 200, 175, 75],
      backgroundColor: '#7477bf',
      borderWidth: 1
  }]        
};

const barChart = new Chart(dailyChart, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});
// End of Bar chart========================================


// Donut Chart - MOBILE ==========================================================

let mobileData = {
  labels: [  //pie chart color #81c98f, #74b1bf
    'Desktop', 'Tablets', 'Phones'
  ],
  datasets: [{
    label: '# of Users',
    data: [2000, 550, 500],
    backgroundColor: ['#7477bf', '#78cf82', '#51b6c8'],
    borderWidth: 0
  }]
}

let mobileOptions = {
  rotation: (-0.5* Math.PI) - (-0.5 * Math.PI),
  aspectRatio: 2.2,
  layout: {
    padding: {
      bottom: 10,
      right: 50
    }
  },
  legend: {  
    position: 'right',
    reverse:true,
    labels: {
      boxWidth: 15,
      padding: 15
   }  
  }
};

const myDoughnutChart = new Chart(mobileChart, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions  
});
// End of Donut Chart ===============
// End of daily charts ===============================================================

// ============== User AUTOCOMPLETE search function for messaging ========================= //
input.addEventListener('input', () => {
  autocomplete(userList);  
});

// Autocomplete function
function autocomplete(array) {
  let inputValueLowerCased = input.value.toLowerCase();    
  const option = document.createElement('OPTION');  
  const options = select.children;
  
  // Loop through the user name list array  
  for (let i = 0; i < array.length; i++) {
    let userName = array[i];
    option.style.listStyle = 'none';  

    if (userName.toLowerCase().includes(inputValueLowerCased.substr(0, 4)) &&
        inputValueLowerCased !== '') {
          option.textContent = userName ;
          for(let j = 0; j < options.length; j++) {
            if (j >= 0) {
              select.removeChild(options[j]);
            }
          }          
          select.style.display = 'block';
          select.appendChild(option);

    } else if (inputValueLowerCased === '') {
          select.innerHTML = '';
          select.style.display = 'none'
    }
  }  

  function selectStyling (e) {
    const selectedList = e.target;
    selectedList.style.backgroundColor = '#dfdddd';
    select.style.display = 'none';
    input.value = selectedList.textContent;
    if (select.firstElementChild.classList.contains('autoList')) {
      select.removeChild(select.firstElementChild);
    }
  }  

  // click event => name generated from the autocomplete
  select.addEventListener('click', (e) => {
    selectStyling (e);
  });
}

// End of AUTOCOMPLETE feature ===============================


// Message Alert for incomplete message sections ===============
 send.addEventListener('click', () => {
   if (userField.value === "" && messageField.value === "") {
     alert("The user name and message both have to be filled out before sending");
   } else if (userField.value === "") {
     alert("Please fill out the user you want to send the message to.");
   } else if (messageField.value === "") {
     alert("Please fill out the message you want to send");
   } else {
     alert(`Message successfully sent to: ${userField.value}`);
   }
 })
//  Message incomplete Alert finished =======================


// ====Local Storage for Settings section ================

// cancel button will clear out local storage and reset the setting section

settings.addEventListener('click', (e) => {
  if(e.target === cancel) { 
    clearLocalStorage();
    getLocalStorage();
    timezone.selectedIndex = 0; // when cancel button is pressed, first select option becomes default
  } else if (e.target === save) {
    setLocalStorage();
  } 
});

// Clear local storage
function clearLocalStorage() {
  localStorage.clear();
}

// Set Local storage
function setLocalStorage() {
  localStorage.setItem('switch1', switch1.checked);  
  localStorage.setItem('switch2', switch2.checked);
  localStorage.setItem('timezone', timezone.value); 
}

// Get the data from local storage when refreshed
function getLocalStorage () {   
  
  let switch1Load = localStorage.getItem('switch1');
  let switch2Load = localStorage.getItem('switch2');
  let timezoneLoad = localStorage.getItem('timezone');

  controlSwitch(switch1Load, switch1);
  controlSwitch(switch2Load, switch2);

  if(timezoneLoad !== null) {
    timezone.value = timezoneLoad;
  } 
}
// saved switch for toggle buttons & timezone
function controlSwitch (load, switching) {
  if (load !== null && load === 'true') {
    switching.checked = true;
  } else {
    switching.checked = false;
  }
}
// call getLocalStorage function
getLocalStorage ();

















