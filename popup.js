document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.getElementById('taskList');
  const progressBar = document.getElementById('progressBar');
  const forwardButton = document.getElementById('forwardButton');
  const backwardButton = document.getElementById('backwardButton');
  const resetButton = document.getElementById('resetButton');
  const currentDayElement = document.getElementById('currentDay');
  const nextTaskElement = document.getElementById('nextTask');

  // Initialize tasks if not already in storage
  chrome.storage.sync.get({ tasks: [], lastCompletedIndex: -1 }, function (result) {
    const tasks = result.tasks.length === 0 ? getDefaultTasks() : result.tasks;
    const lastCompletedIndex = result.lastCompletedIndex || -1;

    chrome.storage.sync.set({ tasks: tasks, lastCompletedIndex: lastCompletedIndex }, function () {
      updateDisplay();
    });
  });

  forwardButton.addEventListener('click', function () {
    chrome.storage.sync.get({ tasks: [], lastCompletedIndex: -1 }, function (result) {
      const tasks = result.tasks;
      const lastCompletedIndex = result.lastCompletedIndex || -1;

      // Increment the lastCompletedIndex
      const newLastCompletedIndex = lastCompletedIndex + 1;

      // Ensure the index is within bounds
      if (newLastCompletedIndex < tasks.length) {
        chrome.storage.sync.set({ lastCompletedIndex: newLastCompletedIndex }, function () {
          updateDisplay();
        });
      }
    });
  });

  backwardButton.addEventListener('click', function () {
    chrome.storage.sync.get({ tasks: [], lastCompletedIndex: -1 }, function (result) {
      const lastCompletedIndex = result.lastCompletedIndex || -1;

      // Decrement the lastCompletedIndex
      const newLastCompletedIndex = Math.max(lastCompletedIndex - 1, -1);

      chrome.storage.sync.set({ lastCompletedIndex: newLastCompletedIndex }, function () {
        updateDisplay();
      });
    });
  });

  resetButton.addEventListener('click', function () {
    const defaultTasks = getDefaultTasks();
    chrome.storage.sync.set({ tasks: defaultTasks, lastCompletedIndex: -1 }, function () {
      updateDisplay();
    });
  });

  function updateDisplay() {
    chrome.storage.sync.get({ tasks: [], lastCompletedIndex: -1 }, function (result) {
      const tasks = result.tasks;
      const lastCompletedIndex = result.lastCompletedIndex || -1;

      displayTasks(tasks, lastCompletedIndex);
      updateProgressBar(tasks, lastCompletedIndex);
      updateNextTask(tasks, lastCompletedIndex);
    });
  }

  function displayTasks(tasks, lastCompletedIndex) {
    taskList.innerHTML = '';

    for (let i = lastCompletedIndex + 1; i < tasks.length; i++) {
      const task = tasks[i];
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `<input type="checkbox" class="task-check" ${task.done ? 'checked' : ''}>
                             <span class="task-text">${task.text}</span>`;
      taskItem.querySelector('.task-check').addEventListener('change', function () {
        toggleTask(i);
      });
      taskList.appendChild(taskItem);

      // Break the loop after displaying the first incomplete task
      if (!task.done) {
        break;
      }
    }
  }

  function toggleTask(index) {
    chrome.storage.sync.get({ tasks: [], lastCompletedIndex: -1 }, function (result) {
      const tasks = result.tasks;
      const lastCompletedIndex = result.lastCompletedIndex || -1;

      tasks[index].done = !tasks[index].done;

      // Update the lastCompletedIndex when a task is completed
      if (tasks[index].done) {
        chrome.storage.sync.set({ tasks: tasks, lastCompletedIndex: index }, function () {
          updateDisplay();
        });
      } else {
        chrome.storage.sync.set({ tasks: tasks }, function () {
          updateDisplay();
        });
      }
    });
  }

  function updateProgressBar(tasks, lastCompletedIndex) {
    const totalTasks = tasks.length;
    const completedTasks = lastCompletedIndex + 1;
    const progressValue = Math.min(completedTasks, totalTasks);

    progressBar.value = progressValue;
  }

  function updateNextTask(tasks, lastCompletedIndex) {
    const nextTaskIndex = lastCompletedIndex + 1;
    const nextTaskText = nextTaskIndex < tasks.length ? tasks[nextTaskIndex].text : 'No tasks remaining';

    nextTaskElement.textContent = `Next Task: ${nextTaskText}`;
  }

  function getDefaultTasks() {
    return [
      "Day 1: Full-body workout\nSquats: 3 sets of 10 reps\nPush-ups: 3 sets of 10 reps\nBent-over rows: 3 sets of 10 reps\nPlank: 3 sets, hold for 30 seconds each",
      "Day 2: Cardio (choose one)\n30 minutes brisk walking or jogging",
      "Day 3: Rest or light activity",
      "Day 4: Full-body workout\nDeadlifts: 3 sets of 10 reps\nDumbbell bench press: 3 sets of 10 reps\nLunges: 3 sets of 10 reps per leg\nRussian twists: 3 sets of 15 reps",
      "Day 5: Cardio (choose one)\n30 minutes cycling or swimming",
      "Day 6: Rest or light activity",
      "Day 7: Rest",
      "Day 8: Full-body workout\nSquats: 3 sets of 10 reps\nPush-ups: 3 sets of 10 reps\nBent-over rows: 3 sets of 10 reps\nPlank: 3 sets, hold for 30 seconds each",
      "Day 9: Cardio (choose one)\n30 minutes brisk walking or jogging",
      "Day 10: Rest or light activity",
      "Day 11: Full-body workout\nDeadlifts: 3 sets of 10 reps\nDumbbell bench press: 3 sets of 10 reps\nLunges: 3 sets of 10 reps per leg\nRussian twists: 3 sets of 15 reps",
      "Day 12: Cardio (choose one)\n30 minutes cycling or swimming",
      "Day 13: Rest or light activity",
      "Day 14: Rest",
      "Day 15: Full-body workout\nIncrease weights or resistance in each exercise",
      "Day 16: Cardio (choose one)\n30-40 minutes of interval training (alternating between high and low intensity)",
      "Day 17: Rest or light activity",
      "Day 18: Full-body workout\nIncrease weights or resistance in each exercise",
      "Day 19: Cardio (choose one)\n40 minutes of your favorite cardio activity",
      "Day 20: Rest or light activity",
      "Day 21: Rest",
      "Day 22: Full-body workout\nIncrease weights or resistance in each exercise",
      "Day 23: Cardio (choose one)\n30-40 minutes of interval training (alternating between high and low intensity)",
      "Day 24: Rest or light activity",
      "Day 25: Full-body workout\nIncrease weights or resistance in each exercise",
      "Day 26: Cardio (choose one)\n40 minutes of your favorite cardio activity",
      "Day 27: Rest or light activity",
      "Day 28: Rest"
    ].map(task => ({ text: task, done: false }));
  }
  
});
