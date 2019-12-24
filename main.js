'use strict';

//constants for css classes

const selected = '.selected'
const group = '.group'

//group behaviour

const groups = document.querySelectorAll(group);
Array.prototype.forEach.call(groups, assignSelectEvent);

function assignSelectEvent(element) {
  element.addEventListener('click', selectOption);
}

function selectOption() {
  const current = event.currentTarget
  const original = event.target;
  if (original == current) return
  if (current.matches(".single") && !original.matches(selected)) {
    const other = current.querySelector(selected);
    if (other) other.classList.toggle(selected.slice(1));
  }
  original.classList.toggle(selected.slice(1));
}

//submit behaviour

const submitButton = document.querySelector('#submit-button');
submitButton.addEventListener('click', submitData);

async function submitData() {
  const dataToSend = new FormData(document.querySelector('#data-to-send'));
  const selects = document.querySelectorAll(group + ' > ' + selected);

  for (let select of selects) {
    dataToSend.append(select.parentElement.id, select.innerHTML)
  }

  const response = await fetch('to_be_specified.test', {
    method: 'POST',
    body: dataToSend
  });
  const result = await response.json();

  alert(result.message);
  // for (let entry of dataToSend)
  //   console.log(entry)
}
