import FilmVideo from "./FilmVideo"
import { reelVideo } from "../data"
import { useLang } from "../i18n"

export default function FrameStudy() {
  const { t } = useLang()

  return (
    <section className="reel" id="reel">
      <div className="section-head">
        <span>{t.reel.kicker}</span>
        <h2>{t.reel.title}</h2>
      </div>

      <FilmVideo src={reelVideo.src} poster={reelVideo.poster} label={reelVideo.title} />

      <div className="reel-caption">
        <strong>{reelVideo.title}</strong>
        <span>
          {t.cat[reelVideo.category] ?? reelVideo.category} · {reelVideo.year}
        </span>
      </div>
    </section>
  )
}
