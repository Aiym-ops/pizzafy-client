import slideOne from "../assets/images/home/1.webp";
import slideTwo from "../assets/images/home/2.webp";
import slideThree from "../assets/images/home/3.webp";
import slideFour from "../assets/images/home/4.webp";
import slideFive from "../assets/images/home/5.webp";
import ProductsList from "../components/Products/ProductsList";
function Home() {
    return (
        <>
            <section class="block">
                 <div class="container">
                <h1 class="title">Добро пожаловать в Pizzafy!</h1>
                <div class="stories-list">
                    <img src={slideOne} alt="1" />
                    <img src={slideTwo} alt="2" />
                    <img src={slideThree} alt="3" />
                    <img src={slideFour} alt="4" />
                    <img src={slideFive} alt="5" />
                </div>
                 </div>
            </section>
            <section class="block">
            <div class="container">
                <h1 class="title">Меню</h1>
                <ProductsList />
            </div>
            </section>
        
        </>
    );
}

export default Home;