(function() {
    let listArray = [],
    listName = '';

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');
        button.disabled = true;

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        input.addEventListener('input', function() {
            if (input.value !== "") {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        });

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(obj) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        if (obj.done == true) item.classList.add('list-group-item-success');

        doneButton.addEventListener('click', function() {
            //todoArray = JSON.parse(localStorage.getItem(key));
            item.classList.toggle('list-group-item-success');
            //const currentName = item.firstChild.textContent;

            for (const listItem of listArray) {
                if (listItem.id == obj.id) listItem.done = !listItem.done;
            }

            saveList(listArray, listName);

            //changeItemDone(todoArray, todoItem);

            //localStorage.setItem(key, JSON.stringify(todoArray));
        });

        deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
               // todoArray = JSON.parse(localStorage.getItem(key));


                //let newList = todoArray.filter(obj => obj.id !== todoItem.item.id);
               // localStorage.setItem(key, JSON.stringify(newList));
                item.remove();
                //const currentName = item.firstChild.textContent;

                for (let i = 0; i < listArray.length; i++) {
                    if (listArray[i].id == obj.id) listArray.splice(i, 1);
                }

                saveList(listArray, listName);
            }
        });

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    // let todoArray = [];

    // let changeItemDone = (arr, todoItem) => {
    //     arr.map(obj => {
    //         if (obj.id === todoItem.item.id & obj.done === false) {
    //             obj.done = true;
    //         } else if (obj.id === todoItem.item.id & obj.done === true) {
    //             obj.done = false;
    //         }
    //     });
    // }

    // function operationButton(todoItem) {
    //     todoItem.doneButton.addEventListener('click', function() {
    //         todoArray = JSON.parse(localStorage.getItem(key));
    //         todoItem.item.classList.toggle('list-group-item-success');

    //         changeItemDone(todoArray, todoItem);

    //         localStorage.setItem(key, JSON.stringify(todoArray));
    //     });

    //     todoItem.deleteButton.addEventListener('click', function() {
    //         if (confirm('Вы уверены?')) {
    //             todoArray = JSON.parse(localStorage.getItem(key));


    //             let newList = todoArray.filter(obj => obj.id !== todoItem.item.id);
    //             localStorage.setItem(key, JSON.stringify(newList));
    //             todoItem.item.remove();
    //         }
    //     });
    // }

    function getNewID(arr) {
        let max = 0;
        for (const item of arr) {
            if (item.id > max) max = item.id;
        }
        return max + 1;
    }

    function saveList(arr, keyName) {
        localStorage.setItem(keyName, JSON.stringify(arr));
    }


    function createTodoApp(container, title = 'Список дел', keyName, defArray = []) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        listName = keyName;
        listArray = defArray;

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        let localData = localStorage.getItem(listName);

        if (localData !== null && localData !== '') listArray = JSON.parse(localData);

        for (const itemList of listArray) {
            let todoitem = createTodoItem(itemList);
            todoList.append(todoitem.item);
        }

        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

            let newItem = {
                id: getNewID(listArray),
                name: todoItemForm.input.value,
                done: false
            }

            let todoItem = createTodoItem(newItem);

            listArray.push(newItem);

            saveList(listArray, listName);

            todoList.append(todoItem.item);

            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;
        });
    }

    window.createTodoApp = createTodoApp;
})();
