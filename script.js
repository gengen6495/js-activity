document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addBtn');
    const todoInput = document.getElementById('todoInput');
    const alarmTime = document.getElementById('alarmTime');
    const todoList = document.getElementById('todoList');

    const setAlarm = (time, callback) => {
        const now = new Date();
        const alarmDate = new Date(now.toDateString() + ' ' + time);
        if (alarmDate < now) {
            alarmDate.setDate(alarmDate.getDate() + 1); 
        }
        const timeUntilAlarm = alarmDate - now;

        return setTimeout(() => {
            callback();
        }, timeUntilAlarm);
    };
    const addTodo = () => {
        const text = todoInput.value.trim();
        const alarm = alarmTime.value.trim();
        if (text === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="colored-span">${text}</span>
            <button class="completeBtn">✔️</button>
            <button class="removeBtn">❌</button>
            ${alarm ? `<button class="alarmBtn">Set Alarm</button>` : ''}
        `;
        todoList.appendChild(li);
        todoInput.value = '';
        alarmTime.value = '';

        if (alarm) {
            const alarmButton = li.querySelector('.alarmBtn');
            alarmButton.addEventListener('click', () => {
                setAlarm(alarm, () => {
                    alert(`Alarm for task "${text}" is ringing!`);
                });
                alarmButton.disabled = true;
                alarmButton.textContent = 'Alarm Set';
            });
        }

        li.querySelector('.completeBtn').addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        li.querySelector('.removeBtn').addEventListener('click', () => {
            todoList.removeChild(li);
        });
    };

    addBtn.addEventListener('click', addTodo);
    
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});
