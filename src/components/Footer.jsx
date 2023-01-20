
export default function Footer() {

    let name = "Samuil Boriosv";
    let day = new Date().getFullYear();

    return(
        <footer>
         <p>{name} Copyright © {day} </p>
        </footer>
    )
}