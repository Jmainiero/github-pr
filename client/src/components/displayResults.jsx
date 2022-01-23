export default function DisplayResults({ results }) {
    console.log('This is results', results)
    const r = results.map((entry) => {
        return (
            <div className="results--entry">
                <div className="results--entry--left">
                    <img src={`${entry.avatar}`} className="results--entry__avatar" alt="avatar" />
                    <a className="results--entry__author" href={`${entry.authorPage}`} target="_blank" rel="noopener noreferrer">{entry.author}</a>
                </div>
                <div className="results--entry--right">
                    <a className="results--entry__title" href={`${entry.url}`} target="_blank" rel="noopener noreferrer">{entry.title}</a>
                    <p className="results--entry__count">Number of Commits: {entry.commitCount}</p>
                </div>
            </div>
        );
    });
    return <div className='results'>{r}</div>
};