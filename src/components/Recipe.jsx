import ReactMarkdown from 'react-markdown';

export default function Recipe(props) {
  return (
    <section className="suggested-recipe-container">
      <h2 aria-live="polite">Chef Claude Recommends:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
}
