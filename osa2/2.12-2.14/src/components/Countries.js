import Country from "./Country"

const Countries = ({ countriesToShow, handleClick }) => {

    if (countriesToShow.length === 1) {
        return <Country country={countriesToShow[0]} />
    } else if (countriesToShow.length <= 10) {
        return countriesToShow.map(country => (
            <div>
            <p>{country.name.common}<button onClick={() => handleClick(country.name.common)}>show</button></p>
            </div>
            ))
    } else {
        return <div>Too many matches, specify another filter</div>
    }
}

export default Countries