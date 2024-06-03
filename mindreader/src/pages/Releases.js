import React from "react";
import BlankLink from "../components/BlankLink";
import { Link } from "react-router-dom";

const Releases = () => {
  return (
    <>
      <h2>Stable releases</h2>
      <p>
        Statistics on the latest available release are available{" "}
        <Link to="/statistics">here</Link>.
      </p>
      <h4>MindReader-300K</h4>
      <p className="small text-muted">Released 2024-06-03</p>
      <p>
        The latest stable release of MindReader containing 310,273 ratings from 3,408 users
        over 13,286 entities. We recommend this dataset for use in research, as it will be
        permanently available on this page. Furthermore, we provide a variant containing only
        ratings from users who reached the final page of the quiz denoted by 'final only'.
        Links to download the dataset and associated knowledge graph triples can
        be found below.
      </p>
      <ul>
        <li>
          <BlankLink href="https://mindreader.tech/api/ratings?versions=100k,100k-newer,100k-fix,thesis,thesis-ppr,thesis-launch,september-2020">
            Ratings
          </BlankLink>
        </li>
        <li>
          <BlankLink href="https://mindreader.tech/api/ratings?versions=100k,100k-newer,100k-fix,thesis,thesis-ppr,thesis-launch,september-2020&final=yes">
            Ratings (final only)
          </BlankLink>
        </li>
        <li>
          <BlankLink href="https://mindreader.tech/neo4j.graphml">
            Full knowledge graph (for Neo4j)
          </BlankLink>{" "}
          (8.5 MB)
        </li>
        <li>
          <BlankLink href="https://mindreader.tech/api/triples?versions=100k,100k-newer,100k-fix">
            Knowledge graph (triples only)
          </BlankLink>{" "}
          (16.0 MB)
        </li>
        <li>
          <BlankLink href="https://mindreader.tech/api/entities?versions=100k,100k-newer,100k-fix">
            Knowledge graph (entities only)
          </BlankLink>{" "}
          (1.2 MB)
        </li>
      </ul>
      <hr />

      <h4>MindReader-200K</h4>
      <p className="small text-muted">Released 2020-09-09</p>
      <p>
        Contains 218,794 ratings from 2,316 users over 12,206 entities.
      </p>
      <ul>
        <li>
          <BlankLink href="https://mindreader.tech/api/ratings?versions=100k,100k-newer,100k-fix,thesis,thesis-ppr,thesis-launch">
            Ratings
          </BlankLink>{" "}
          (8,6 MB)
        </li>
        <li>
          <BlankLink href="https://mindreader.tech/api/ratings?versions=100k,100k-newer,100k-fix,thesis,thesis-ppr,thesis-launch&final=yes">
            Ratings (final only)
          </BlankLink>{" "}
          (7,6 MB)
        </li>
      </ul>
      <hr />
          
      <h4>MindReader-100K</h4>
      <p className="small text-muted">Released 2020-02-25</p>
      <p>
        Contains 102,160 ratings from 1,174 users over 10,030 entities.
      </p>
      <ul>
        <li>
          <BlankLink href="https://mindreader.tech/api/ratings?versions=100k,100k-newer,100k-fix">
            Ratings
          </BlankLink>{" "}
          (8,6 MB)
        </li>
        <li>
          <BlankLink href="https://mindreader.tech/api/ratings?versions=100k,100k-newer,100k-fix&final=yes">
            Ratings (final only)
          </BlankLink>{" "}
          (7,6 MB)
        </li>
      </ul>
      <hr />

      <h2>Rolling release</h2>
      <p className="small text-muted">Released just now</p>
      <p>
        We provide a rolling release based on the latest available data. No
        statistics are available on this dataset since it changes over time.
        Links to download the dataset and associated knowledge graph triples can
        be found below.
      </p>
      <ul>
        <li>
          <BlankLink href="https://mindreader.tech/api/ratings">
            Ratings
          </BlankLink>
        </li>
        <li>
          <BlankLink href="https://mindreader.tech/api/triples">
            Knowledge graph triples
          </BlankLink>
        </li>
        <li>
          <BlankLink href="https://mindreader.tech/api/entities">
            Knowledge graph entities
          </BlankLink>
        </li>
      </ul>

      <hr className="pb-5" />
      <h2>Usage License</h2>

      <p>
        Neither Aalborg University nor any of the researchers involved can
        guarantee the correctness of the data, its suitability for any
        particular purpose, or the validity of results based on the use of the
        data set. The data set may be used for any research purposes under the
        following conditions:
      </p>
      <ol>
        <li>
          The user may not state or imply any endorsement from Aalborg
          University or the researchers who produced it.
        </li>
        <li>
          The user must acknowledge the use of the data set in publications
          resulting from the use of the data set (see{" "}
          <Link to="/home">here</Link> for citation information).
        </li>
        <li>
          The user may redistribute the data set, including transformations, so
          long as it is distributed under these same license conditions.
        </li>
        <li>
          The user may not use this information for any commercial or
          revenue-bearing purposes without first obtaining permission from a
          faculty member of the Department of Computer Science at Aalborg
          University.
        </li>
        <li>
          In no event shall Aalborg University, its affiliates or employees be
          liable to you for any damages arising out of the use or inability to
          use these programs (including but not limited to loss of data or data
          being rendered inaccurate).
        </li>
      </ol>
      <p>
        If you have any further questions or comments, please email{" "}
        <strong>mindreader@cs.aau.dk</strong>.
      </p>
    </>
  );
};

export default Releases;
