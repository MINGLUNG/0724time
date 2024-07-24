let initialTime;
let currentTime;
let interval;
let soundEnabled = false;
const timerDisplay = document.getElementById('timer');
const tickSound = document.getElementById('tickSound');
const imageUpload = document.getElementById('imageUpload');
const footerImage = document.getElementById('footerImage');

document.getElementById('completeButton').addEventListener('click', function() {
    initialTime = parseInt(document.getElementById('timeInput').value);
    soundEnabled = document.getElementById('soundCheckbox').checked;

    if (isNaN(initialTime) || initialTime <= 0) {
        alert('請輸入有效的倒數時間');
        return;
    }

    document.getElementById('settings').style.display = 'none';
    document.getElementById('timerPage').style.display = 'flex';
    resetTimer();

    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            footerImage.src = e.target.result;
            footerImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('startButton').addEventListener('click', function() {
    if (!interval) {
        interval = setInterval(countdown, 1000);
    }
});

document.getElementById('stopButton').addEventListener('click', function() {
    clearInterval(interval);
    interval = null;
});

document.getElementById('resetButton').addEventListener('click', function() {
    clearInterval(interval);
    interval = null;
    document.getElementById('settings').style.display = 'flex';
    document.getElementById('timerPage').style.display = 'none';
    resetTimer();
});

function countdown() {
    if (currentTime > 0) {
        currentTime--;
        timerDisplay.textContent = formatTime(currentTime);
        if (soundEnabled) {
            tickSound.play();
        }
    } else {
        clearInterval(interval);
        interval = null;
        alert('時間到！');
    }
}

function resetTimer() {
    currentTime = initialTime;
    timerDisplay.textContent = formatTime(currentTime);
}

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
