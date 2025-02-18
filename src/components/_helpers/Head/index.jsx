import { useEffect } from "react";

// Types
import P from "prop-types";

const Head = ({ title, description }) => {
    useEffect(() => {
        document.title = `${title} | Agenda`;

        const metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
            metaDescription.setAttribute("content", description || "");
        }
    }, [title, description]);

    return null;
};
Head.propTypes = {
    title: P.string.isRequired,
    description: P.string.isRequired,
}

export default Head;