import React from 'react';
import BlankLink from '../components/BlankLink';

const Releases = () => {
  return (
    <>
      <h2>Stable releases</h2>
      <h4>MindReader-100K</h4>
      <p className="small text-muted">Released 2020-02-25</p>
      <p>The latest stable release of MindReader is MindReader-100K with 102,160 ratings from 1,174 users over 10,030 entities.
         We recommend this dataset for use in research, as it will be permanently available on this page.
         Links to download the dataset and associated knowledge graph triples can be found below.</p>
      <ul>
        <li>Ratings (TBA)</li>
        <li>Knowledge graph (TBA)</li>
      </ul><hr />

      <h2>Rolling release</h2>
      <p className="small text-muted">Released just now</p>
      <p>We provide a rolling release based on the latest available data. No statistics are available on this dataset since it changes over time.
         Links to download the dataset and associated knowledge graph triples can be found below.</p>
      <ul>
        <li><BlankLink href="https://mindreader.tech/api/ratings">Ratings</BlankLink></li>
        <li><BlankLink href="https://mindreader.tech/api/triples">Triples</BlankLink></li>
      </ul>
    </>
  );
};

export default Releases;