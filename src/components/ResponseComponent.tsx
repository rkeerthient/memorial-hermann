import { LexicalRichText } from "@yext/pages-components";
import { useState } from "react";
import Markdown from "react-markdown";
import { concatClassNames } from "../utils/reusableFunctions";

interface ResponseComponentProps {
  response: any;
  showMore?: boolean;
}

const ClampedContent = ({
  children,
  showMoreLines,
  toggleLines,
  showMore = false,
}: {
  children: React.ReactNode;
  showMoreLines: boolean;
  toggleLines: () => void;
  showMore?: boolean;
}) => {
  console.log(showMoreLines);

  const lineClampClass = showMoreLines ? "line-clamp-3" : "";

  return (
    <section aria-expanded={showMoreLines}>
      <div
        className={concatClassNames(
          "transition-all duration-500 ease-in-out",
          lineClampClass
        )}
        style={{ overflow: "hidden" }}
      >
        {children}
      </div>
      {showMore && (
        <button
          onClick={toggleLines}
          aria-expanded={showMoreLines}
          aria-controls="response-text"
          style={{
            display: "block",
            marginTop: "10px",
          }}
        >
          {showMoreLines ? "Show More >" : "Show Less >"}
        </button>
      )}
    </section>
  );
};

const ResponseComponent = ({
  response,
  showMore = false,
}: ResponseComponentProps) => {
  const [showMoreLines, setShowMoreLines] = useState<boolean>(showMore);
  const toggleLines = () => {
    setShowMoreLines((prevState) => !prevState);
  };

  const renderResponse = () => {
    if (
      typeof response === "object" &&
      ("json" in response || "html" in response)
    ) {
      return (
        <>
          {response.json ? (
            <LexicalRichText serializedAST={JSON.stringify(response.json)} />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: response.html,
              }}
            ></p>
          )}
        </>
      );
    }

    if (typeof response === "object" && "markdown" in response) {
      return <Markdown>{response.markdown}</Markdown>;
    }

    if (typeof response === "string") {
      return <p aria-live="polite">{response}</p>;
    }

    return null;
  };

  return (
    <ClampedContent
      showMoreLines={showMoreLines}
      toggleLines={toggleLines}
      showMore={showMore}
    >
      {renderResponse()}
    </ClampedContent>
  );
};

export default ResponseComponent;
