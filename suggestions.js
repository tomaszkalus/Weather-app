import { api } from "./api.js";

async function showSuggestions(click) {
  const input = click.target;

  if (input.value.length > 2) {
    const locations = await getLocationList(input.value);
    deleteSuggestionsDropdown();

    let id = 0;
    for (let i of locations) {
      let listItem = document.createElement("li");
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute('data-id', id);

      listItem.addEventListener('click', () => {
        input.value = '';
        deleteSuggestionsDropdown();
      });
      listItem.innerHTML = getDisplayString(i);
      document.querySelector("#suggestions-list").appendChild(listItem);
      i.id = id;
      id++;
    }
    return locations;
  }

  async function getLocationList(name) {
    const query = api.getGeocodingQuery(name);
    const response = await api.getData(query);
    return response;
  }

  function getDisplayString(response) {
    const l = [response.name, response.state, response.country];
    if (!response.state) { l.splice(1, 1); }
    return l.join(', ');
  }
}

function deleteSuggestionsDropdown() {
  const container = document.querySelector('#suggestions-list');
  while (container.firstChild) {
    container.firstChild.remove();
  }
}

export { showSuggestions, deleteSuggestionsDropdown };