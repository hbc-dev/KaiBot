const YoError = require('../../../utils/botError.js')

/**
 * @class EmbedBook
 * @description Merge embeds in a "book" to give them easily
 * @param {number} maxPages The maximum pages in the book
 * @param {number} minPages The minimum pages in the book
 */

class EmbedBook {
    #names

  constructor({ maxPages = Infinity, minPages = 2 } = {}) {
    this.maxPages = maxPages;
    this.minPages = minPages;
    this.actualPage = 0;
    this.pages = [];
    this.#names = [];
  }

  addPages(embedData) {
    if (!embedData) throw new YoError('Añade un embed')
    if (typeof embedData !== "object")
      throw new YoError("El embed a añadir no es un objeto u array");

    let length = Array.isArray(embedData) ? embedData.length : 1;

    if (
      this.pages.length == this.maxPages ||
      length > this.maxPages ||
      length + this.pages.length > this.maxPages
    )
      return {
        sucess: false,
        errorCode: "MAX_PAGES_REACHED",
      };

    if (Array.isArray(embedData)) {
      for (let embed of embedData) {
        if (typeof embed !== "object" || Array.isArray(embed))
          throw new YoError("El embed a añadir no es un objeto");

          this.pages.push(this.#setPage(embed))
      }
    } else this.pages.push(this.#setPage(embedData));

    return {
      sucess: true,
      message: "Added pages ✔️",
    };
  }

  removePages(...data) {
    if (this.pages.length < 1) return {
        sucess: false,
        errorCode: 'NO_PAGES'
    }

    for (let page of data) {
      if (typeof page !== "string" && typeof page !== "number")
        throw new YoError(
          "Se ha añadido un nombre o id que no es un string o number"
        );

      let pages = this.pages,
          searchedPage = pages.find(
            (embed) => embed.__customName == page ||
            embed.__numberPage == page
        );

      if (!searchedPage)
        return {
          sucess: false,
          errorCode: "NO_FOUND_PAGE",
          pageToSearch: page,
        };

        this.pages = pages.filter(
            pg => pg.__numberPage !== page && pg.__customName !== page
        )
    }

    this.#organizeBook()
    return {
        sucess: true,
        message: "Removed pages ✔️"
    }
  }

  nextPage() {

  }

  previousPage() {

  }

  /**
   * @function setPage For set the page of a discord embed
   * @param {object} embed The instace of the discord embed
   * @private
   */

  #setPage(embed) {
    embed.__numberPage = this.pages.length + 1

    return embed
  }

  #organizeBook() {
    let pages = this.pages,
        index = 1;

    for (let page of pages) {
        if (page.__numberPage !== index) this.pages[index-1].__numberPage = index;
        index++
    }
  }

  setCustomName(embed, name) {
    if (
        !embed ||
        typeof embed !== 'object' ||
        Array.isArray(embed)
       ) throw new YoError(`Introduce un embed de forma correcta`)

    if (!name || typeof name !== 'string') throw new YoError(`No se ha introducido un nombre correcto para el embed`)
    if (this.#names.includes(name)) throw new YoError(`No pueden haber nombres duplicados`)

    this.#names.push(name)
    return embed.__customName = name
  }
}

module.exports = EmbedBook;

/* let {MessageEmbed} = require('discord.js')

const embed1 = new MessageEmbed()
const embed2 = new MessageEmbed()

const book = new EmbedBook({maxPages: 2})
book.setCustomName(embed1, 'embed1')
book.setCustomName(embed2, 'embed2')

let addedPages = book.addPages([
    embed1,
    embed2
]);

console.log(book) */