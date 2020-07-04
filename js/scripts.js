var pokemonRepository = (function () {
    var repository = [];
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    var modalBody = $("#modal-container");

    function add(pokemon) {
      repository.push(pokemon);
    }

    function getAll() {
      return repository;
    }

    function addListItem(pokemon) {
      var $pokemonList = $(".pokemon-list");
      var $button = $(
        '<button>' +
          pokemon.name +
          "</button>"
      );
      var $listItem = $("<li>");
      $listItem.append($button);
      $pokemonList.append($listItem);
      $button.on("click", function (event) {
        showDetails(pokemon);
      });
    }

    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        console.log(item);
        showModal(item);
      });
    }

    function loadList() {
      return $.ajax(apiUrl)
        .then(function (json) {
          json.results.forEach(function (item) {
            var pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    }

    function loadDetails(item) {
      var url = item.detailsUrl;
      return $.ajax(url)
        .then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
        })
        .catch(function (e) {
          console.error(e);
        });
    }

    function showModal(item) {

      modalBody.empty();
      var nameElement = $("<h1>" + item.name + "</h1>");
      var imageElement = $('<img class="modal-img">');
      imageElement.attr("src", item.imageUrl);
      var heightElement = $("<p>" + "Height: " + item.height + "m" + "</p>");
      var closeButtonElement =  $('<button>' + 'Close' + "</button>");
      closeButtonElement.addClass('modal-close');

      /*This is the source of my error
      $closeButtonElement.on('click, function (event) {
          hideModal();
      });
      */


      modalBody.append(nameElement);
      modalBody.append(closeButtonElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.addClass('is-visible');
    }

     // Function to hide Modal
    function hideModal() {
    modalBody.removeClass('is-visible');
    }



    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal,
    };
  })();

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });


  //Function to show modal
  function showModal(item) {
      var $modalContainer = document.querySelector('#modal-container');
      // Clears existing modal
      $modalContainer.innerHTML = '';
      // Creats div element in DOM
      var modal = document.createElement('div');
      // Adds class to div DOM element
      modal.classList.add('modal');
      // Creates closing button in modal content
      var closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      // Adds event listener to close modal when button is clicked
      closeButtonElement.addEventListener('click', hideModal);
      // Creates element for name in modal content
      var nameElement = document.createElement('h1');
      nameElement.innerText = item.name;
      // Creates img in modal
      var imageElement = document.createElement('img');
      imageElement.classList.add('modal-img');
      imageElement.setAttribute('src', item.imageUrl);
      // Creates element for height in modal content
      var heightElement = document.createElement('p');
      heightElement.innerText = 'height : ' + item.height + 'm';

      // Appends modal content to webpage
      modal.appendChild(closeButtonElement);
      modal.appendChild(nameElement);
      modal.appendChild(imageElement);
      modal.appendChild(heightElement);
      $modalContainer.appendChild(modal);

      // Adds class to show modal
      $modalContainer.classList.add('is-visible');
  }

  // Hides modal with close button click
  function hideModal() {
      var $modalContainer = document.querySelector('#modal-container');
      $modalContainer.classList.remove('is-visible');
  }

  // Hides model with ESC key
  window.addEventListener('keydown', e => {
      var $modalContainer = document.querySelector('#modal-container');
      if (
          e.key === 'Escape' &&
          $modalContainer.classList.contains('is-visible')
      ) {
          hideModal();
      }
  });

  // Hides modal with click in overlay
  var $modalContainer = document.querySelector('#modal-container');
  $modalContainer.addEventListener('click', e => {
      var target = e.target;
      if (target === $modalContainer) {
          hideModal();
      }
  });

  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
  };
})();

// Creates list of pokemon with their name on the button
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});
