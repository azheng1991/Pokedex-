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


 
