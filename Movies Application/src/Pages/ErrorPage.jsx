import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ErrorPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center flex-column "
      style={{ height: "100vh" }}>
      <h1 style={{ color: 'red' }}>"Oops!"</h1>
      <p className="ErrorText">{t("page is not found Please Go Back")}</p>
      <button className=" goBack border-0 w-25" onClick={() => navigate(-1)}>{t("GO back")}</button>
    </div>)
}
export default ErrorPage;