import { CardProps } from "@yext/search-ui-react";
import ResponseComponent from "../ResponseComponent";
import Cta from "../cta";
import { format_date } from "../../utils/reusableFunctions";

const JobStandard = ({ result }: CardProps<any>) => {
  const { name } = result;
  const {
    description,
    datePosted,
    validThrough,
    employmentType,
    workRemote,
    c_primaryCTA,
    c_secondaryCTA,
    keywords,
  } = result.rawData;

  return (
    <article
      className="flex flex-col gap-2 cards"
      aria-labelledby={`job-title-${result.id}`}
    >
      <header>
        <h2 id={`job-title-${result.id}`} className="standardTitle">
          {name}
        </h2>
        <p className="flex flex-row gap-2 standardSubTitle w-full flex-wrap-nowrap items-center">
          {datePosted && (
            <>
              <span className="hidden md:block">Date Posted :</span>
              <time dateTime={datePosted} aria-label="Date posted">
                {format_date(datePosted)}
                {" | "}
              </time>
            </>
          )}
          {validThrough && (
            <>
              <span className="hidden md:block">Last date to apply:</span>
              <time dateTime={validThrough} aria-label="Application deadline">
                {new Date(validThrough).toLocaleDateString()}
                {" | "}
              </time>
            </>
          )}
          {employmentType && (
            <>
              <span className="hidden md:block">Employment Type :</span>
              {employmentType}
              {" | "}
            </>
          )}
          <span>{workRemote === "Yes" ? "Remote" : "On Site"}</span>
        </p>
      </header>

      <section className="flex flex-col md:flex-row justify-between flex-nowrap">
        <section
          className="standardCardDetails transition-all duration-500 ease-in-out"
          aria-label="Job Description"
        >
          <ResponseComponent response={description} showMore={true} />
          {keywords && (
            <ul
              className="hidden md:flex flex-col md:flex-row gap-1 mt-4"
              aria-label="Job Keywords"
            >
              {keywords.map((item: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span>{item}</span>
                  {index < keywords.length - 1 && (
                    <span className="hidden md:block mx-1" aria-hidden="true">
                      |
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
        <footer
          className="flex flex-col items-center justify-center gap-2 pt-4 pb-2 uppercase md:ml-[calc(var(--yxt-base-spacing)/2)] w-full"
          aria-label="Call to Actions"
        >
          {c_primaryCTA && (
            <Cta
              cta={c_primaryCTA}
              ctaType="primaryCta"
              aria-label="Primary call to action"
            />
          )}
          {c_secondaryCTA && (
            <Cta
              cta={c_secondaryCTA}
              ctaType="secondaryCta"
              aria-label="Secondary call to action"
            />
          )}
        </footer>
      </section>
    </article>
  );
};

export default JobStandard;
