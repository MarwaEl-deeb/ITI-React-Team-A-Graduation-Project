import Search from "./Search";
import { useTranslation } from "react-i18next";

function Welcome({ dataText }) {
    const { t } = useTranslation();

    return (
        <div>
            <div className="WelcomeMainContainer">
                <div className="row WelcomeContainer">
                    <div className="col-12">
                        <section className="welcome">
                            <h2>
                                {t('Welcome to our movie app')}
                            </h2>
                            <p>
                                {t(" Millions of movies ,TV shows and people to discover.Explore now.")}
                            </p>
                            <Search />
                        </section >
                    </div>
                </div>
            </div >

            <div className="nowPlaying">
                <h2>{t(dataText)}</h2>
            </div>
        </div>
    )
}




export default Welcome;