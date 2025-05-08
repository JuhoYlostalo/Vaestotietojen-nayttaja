# Vaestötietojen-näyttäja

Tämä on simpeli web-projekti, jolla pystyt katsella Suomen väestön dataa. Data on haettu tilastokeskuksen avoimen rajapinnan kautta. Sivusto tarjoaa kaksi pääominaisuutta:

- **Ikäryhmät**: Näyttää väestön määrän ikärymittäin valittuna vuonna.
- **Alueet**: Mahdollistaa kahden alueen väkilukujen vertailun valittuna vuonna.

## Teknologiat

- HTML, CSS, JavaScript
- [Chart.js](https://www.chartjs.org/) – Kaavioiden piirtämiseen
- [Axios](https://axios-http.com/) – API-pyyntöihin
- [Tilastokeskus PxWeb API](https://stat.fi/) – Väestödatan lähde
- [Ohje](https://stat.fi/media/uploads/org/avoindata/pxweb_api-ohje.pdf) - Ohje API:n käyttöön

## Käyttö

1. Voit käyttää tätä github pages linkin kautta.
2. Valitse yläpalkista haluamasi näkymä (`Ikäryhmät` tai `Alueet`).
3. Tee valinnat alasvetovalikoista (vuosi, alueet), tämän jälkeen tiedot tulevat näkyviin kaaviohin.

## Responsiivisuus

Sivut toimivata myös tabletti ja mobiili laitteilla.

## Huomioita

- Kaaviot päivittyvät automaattisesti käyttäjän valintojen perusteella.
- Alue ominaisuudessa voit valita yhden alueen tai kaksi eri aluetta vertailua varten.

## Demo

> [GitHub Pages](https://juhoylostalo.github.io/Vaestotietojen-nayttaja/index.html)


---

**Tekijä:** _[Juho Ylöstalo]_  

