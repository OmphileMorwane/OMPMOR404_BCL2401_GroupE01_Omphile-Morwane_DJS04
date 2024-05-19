//Encapsulating the functionality related to rendering the book
//preview into custom web component.

class BookConnect extends HTMLElement {
  static get observedAttributes() {
    return ["author", "image", "id", "title"];
  }
//Initializing the component and attaching a shadow DOM
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
//Calling the render method to display the component
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const author = this.getAttribute("author");
    const image = this.getAttribute("image");
    const id = this.getAttribute("id");
    const title = this.getAttribute("title");

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .preview {
          border-width: 0;
          width: 100%;
          font-family: Roboto, sans-serif;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          text-align: left;
          border-radius: 8px;
          border: 1px solid rgba(var(--color-dark), 0.15);
          background: rgba(var(--color-light), 1);
        }

        @media (min-width: 60rem) {
          .preview {
            padding: 1rem;
          }
        }

        .preview_hidden {
          display: none;
        }

        .preview:hover {
          background: rgba(var(--color-blue), 0.05);
        }

        .preview__image {
          width: 48px;
          height: 70px;
          object-fit: cover;
          background: grey;
          border-radius: 2px;
          box-shadow: 
            0px 2px 1px -1px rgba(0, 0, 0, 0.2),
            0px 1px 1px 0px rgba(0, 0, 0, 0.1), 
            0px 1px 3px 0px rgba(0, 0, 0, 0.1);
        }

        .preview__info {
          padding: 1rem;
        }

        .preview__title {
          margin: 0 0 0.5rem;
          font-weight: bold;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
          color: rgba(var(--color-dark), 0.8)
        }

        .preview__author {
          color: rgba(var(--color-dark), 0.4);
        }
      </style>

      <button class="preview" data-preview="${id}">
        <img
            class="preview__image"
            src="${image}"
        />

        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
      </button>
    `;
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define("book-preview, BookPreview");


import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

let page = 1;
let matches = books;

    // const starting = document.createDocumentFragment();

    //Function to create book preview element
    function createBookPreview(book) {
      const { author, id, image, title } = book;
      const element = document.createElement("button");
      element.classList = "preview";
      element.setAttribute("data-preview", id);

      element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;
      return element;
    }

    // Function to render books
    function renderBooks(bookList) {
      const fragment = document.createDocumentFragment();
      for (const book of bookList) {
        const element = createBookPreview(book);
        fragment.appendChild(element);
      }
      return fragment;
    }

    // Function to update the book list
    function updateBookList(bookList) {
      const newList = renderBooks(bookList.slice(0, BOOKS_PER_PAGE));
      const listContainer = document.querySelector("[data-list-items]");
      listContainer.innerHTML = "";
      listContainer.appendChild(newList);

      const remaining = Math.max(
        bookList.length - this.page * BOOKS_PER_PAGE,
        0
      );
      const listButton = document.querySelector("[data-list-button]");
      listButton.disabled = remaining <= 0;
      listButton.innerHTML = `
          <span>Show more</span>
          <span class="list__remaining"> (${remaining})</span>
      `;
    }

    // Initial rendering of books
    updateBookList(this.matches);

    const genreHtml = document.createDocumentFragment();
    const firstGenreElement = document.createElement("option");
    firstGenreElement.value = "any";
    firstGenreElement.innerText = "All Genres";
    genreHtml.appendChild(firstGenreElement);

    for (const [id, name] of Object.entries(genres)) {
      const element = document.createElement("option");
      element.value = id;
      element.innerText = name;
      genreHtml.appendChild(element);
    }

    document.querySelector("[data-search-genres]").appendChild(genreHtml);

    //Rendering author filter options
    const authorsHtml = document.createDocumentFragment();
    const firstAuthorElement = document.createElement("option");
    firstAuthorElement.value = "any";
    firstAuthorElement.innerText = "All Authors";
    authorsHtml.appendChild(firstAuthorElement);

    for (const [id, name] of Object.entries(authors)) {
      const element = document.createElement("option");
      element.value = id;
      element.innerText = name;
      authorsHtml.appendChild(element);
    }
    document.querySelector("[data-search-authors]").appendChild(authorsHtml);

    //Theme settings
    const darkTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.querySelector("[data-settings-theme]").value = darkTheme
      ? "night"
      : "day";
    document.documentElement.style.setProperty(
      "--color-dark",
      darkTheme ? "255, 255, 255" : "10, 10, 20"
    );
    document.documentElement.style.setProperty(
      "--color-light",
      darkTheme ? "10, 10, 20" : "255, 255, 255"
    );

    //Event listeners
    document
      .querySelector("[data-settings-form]")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { theme } = Object.fromEntries(formData);
        const darkMode = theme === "night";

        document.documentElement.style.setProperty(
          "--color-dark",
          darkMode ? "255, 255, 255" : "10, 10, 20"
        );
        document.documentElement.style.setProperty(
          "--color-light",
          darkMode ? "10, 10, 20" : "255, 255, 255"
        );

        document.querySelector("[data-settings-overlay]").open = false;
      });

    document
      .querySelector("[data-search-form]")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const filters = Object.fromEntries(formData);
        const result = books.filter((book) => {
          const genreMatch =
            filters.genre === "any" || book.genres.includes(filters.genre);
          const titleMatch =
            filters.title.trim() === "" ||
            book.title.toLowerCase().includes(filters.title.toLowerCase());
          const authorMatch =
            filters.author === "any" || book.author === filters.author;
          return genreMatch && titleMatch && authorMatch;
        });

        page = 1;
        matches = result;
        updateBookList(matches);

        const messageElement = document.querySelector("[data-list-message]");
        messageElement.classList.toggle(
          "list__message_show",
          result.length === 0
        );

        document.querySelector("[data-search-overlay]").open = false;
      });

    document
      .querySelector("[data-list-button]")
      .addEventListener("click", () => {
        const startIndex = this.page * BOOKS_PER_PAGE;
        const endIndex = (this.page + 1) * BOOKS_PER_PAGE;
        const fragment = renderBooks(this.matches.slice(startIndex, endIndex));
        document.querySelector("[data-list-items]").appendChild(fragment);
        this.page += 1;
      });

    document
      .querySelector("[data-list-items]")
      .addEventListener("click", (event) => {
        let target = event.target;
        while (target && !target.dataset.preview) {
          target = target.parentNode;
        }
        const bookId = target ? target.dataset.preview : null;
        const activeBook = bookId
          ? books.find((book) => book.id === bookId)
          : null;

        if (activeBook) {
          const listActiveElement =
            document.querySelector("[data-list-active]");
          listActiveElement.open = true;
          document.querySelector("[data-list-blur]").src = activeBook.image;
          document.querySelector("[data-list-image]").src = activeBook.image;
          document.querySelector("[data-list-title]").innerText =
            activeBook.title;
          document.querySelector("[data-list-subtitle]").innerText = `${
            authors[activeBook.author]
          } (${new Date(activeBook.published).getFullYear()})`;
          document.querySelector("[data-list-description]").innerText =
            activeBook.description;
        }
      });

    //Event Listeners for overlay close buttons

    document
      .querySelector("[data-search-cancel]")
      .addEventListener("click", () => {
        document.querySelector("[data-search-overlay]").open = false;
      });

    document
      .querySelector("[data-settings-cancel]")
      .addEventListener("click", () => {
        document.querySelector("[data-settings-overlay]").open = false;
      });

    // Event listeners for opening search and settings overlays
    document
      .querySelector("[data-header-search]")
      .addEventListener("click", () => {
        document.querySelector("[data-search-overlay]").open = true;
        document.querySelector("[data-search-title]").focus();
      });

    document
      .querySelector("[data-header-settings]")
      .addEventListener("click", () => {
        document.querySelector("[data-settings-overlay]").open = true;
      });

    //// Event listener for closing book details overlay
    document
      .querySelector("[data-list-close]")
      .addEventListener("click", () => {
        document.querySelector("[data-list-active]").open = false;
      });
  
