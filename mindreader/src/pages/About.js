import React from "react";
import { Link } from "react-router-dom";
import BlankLink from "../components/BlankLink";
import { Table, Container } from "react-bootstrap";
import "../App.css";

const About = () => {
  return (
    <>
      <h2>MindReader</h2>
      <hr />
      <p>
        MindReader is a novel dataset providing explicit user ratings over a
        knowledge graph within the movie domain. The latest stable version of
        the dataset contains 218,794 ratings from 2,316 users over 12,206 entities
        entities, and an associated knowledge graph consisting of 18,133
        movie-related entities. The dataset is collected from an online movie
        recommendation game,{" "}
        <BlankLink href="https://mindreader.tech">MindReader</BlankLink>, where
        users are pseudo-randomly asked to provide preferences for both movie-
        and non-movie entities (e.g., genres, actors, and directors). For each
        entity, users can either like it, dislike it, or state that they do not
        know it.
      </p>

      <div className="text-center">
        <Link to="/releases">
          <button className="mr-btn mr-btn-lg">Download</button>
        </Link>
      </div>

      <h4>Reference</h4>
      <hr />
      <p>
        Please use the following information when citing our work: 
        <pre>
          <code>
            {
              `
              @inproceedings{{10.1145/3340531.3412759,
                author = {Brams, Anders H. and Jakobsen, Anders L. and Jendal, Theis E. and Lissandrini, Matteo and Dolog, Peter and Hose, Katja},
                title = {MindReader: Recommendation over Knowledge Graph Entities with Explicit User Ratings},
                year = {2020},
                isbn = {9781450368599},
                publisher = {Association for Computing Machinery},
                address = {New York, NY, USA},
                url = {https://doi.org/10.1145/3340531.3412759},
                doi = {10.1145/3340531.3412759},
                booktitle = {Proceedings of the 29th ACM International Conference on Information & Knowledge Management},
                pages = {2975–2982},
                numpages = {8},
                keywords = {recommender systems, content-based filtering, dataset, collaborative filtering, knowledge graph},
                location = {Virtual Event, Ireland},
                series = {CIKM '20}
              }
              `
            }
          </code>
        </pre>
      </p>

      <p>
        An extended edition of the white paper is available <BlankLink href="https://mindreader.tech/mindreader_extended.pdf">here</BlankLink>.
      </p>

      <h4>Releases</h4>
      <hr />
      <p>
        The latest release of MindReader, as well as previous versions, can be
        found on the <Link to="/releases">Releases</Link> page. We maintain
        stable releases appropriate for research as well as a rolling release
        which is continously updated. For all releases, we include the structure
        of the underlying knowledge graph on which the entities have been rated.
      </p>

      <h4>Structure</h4>
      <hr />
      <p>
        All dataset files are provided as related CSV files. The structure of
        each file is described in detail below.
      </p>

      <h5>Ratings</h5>
      <hr />
      <p>
        The ratings file (<code>ratings.csv</code>) contains a row for each
        rating tuple. Below we provide an explanation of the four columns.
      </p>
      <Container className="pb-4">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <code>userId</code>
              </td>
              <td>
                A unique identifier which anonymously identifies the user
                responsible for the rating.
              </td>
            </tr>

            <tr>
              <td>
                <code>uri</code>
              </td>

              <td>
                The URI of the rated entity, corresponding to URIs from{" "}
                <BlankLink href="https://wikidata.org">Wikidata</BlankLink>. The
                entity URIs match those in <code>triples.csv</code>. Currently,
                decades do not follow this convention, e.g., the decade 2010 is
                represented as DECADE_2010 instead of{" "}
                <BlankLink href="https://wikidata.org/wiki/Q19022">
                  Q19022
                </BlankLink>
                .
              </td>
            </tr>

            <tr>
              <td>
                <code>isItem</code>
              </td>

              <td>
                A boolean indication of whether the rated entity is an item
                (i.e., movie) or not.
              </td>
            </tr>

            <tr>
              <td>
                <code>sentiment</code>
              </td>

              <td>
                The rating provided by the user for the specific entity, which
                can take one of three values:
                <ul>
                  <li>-1 if the user responded "dislike"</li>
                  <li>0 if the user responded "don't know"</li>
                  <li>1 if the user responded "like"</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <h5>Knowledge graph triples</h5>
      <hr />
      <p>
        The knowledge graph triples file (<code>triples.csv</code>) contains a
        row for each head-relation-tail triple in the knowledge graph. Below we
        provide an explanation of the three columns.
      </p>
      <Container className="pb-4">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <code>head_uri</code>
              </td>
              <td>
                The URI of the head entity, corresponding to a URI from{" "}
                <BlankLink href="https://wikidata.org">Wikidata</BlankLink>.
              </td>
            </tr>

            <tr>
              <td>
                <code>relation</code>
              </td>

              <td>
                The name of relation connecting the head and tail entity. The
                relation name does not correspond to a{" "}
                <BlankLink href="https://wikidata.org">Wikidata</BlankLink> URI.
              </td>
            </tr>

            <tr>
              <td>
                <code>tail_uri</code>
              </td>

              <td>
                The URI of the tail entity, corresponding to a URI from{" "}
                <BlankLink href="https://wikidata.org">Wikidata</BlankLink>.
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <h5>Knowledge graph entities</h5>
      <hr />
      <p>
        The knowledge graph entities file (<code>entities.csv</code>) contains a
        row for each entity in the knowledge graph. Below we provide an
        explanation of the three columns.
      </p>
      <Container className="pb-4">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <code>uri</code>
              </td>
              <td>
                The URI of the entity, corresponding to a URI from{" "}
                <BlankLink href="https://wikidata.org">Wikidata</BlankLink>.
              </td>
            </tr>

            <tr>
              <td>
                <code>name</code>
              </td>

              <td>The name of entity.</td>
            </tr>

            <tr>
              <td>
                <code>labels</code>
              </td>

              <td>
                The labels for this entity, separated by <code>|</code>.
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <h5>Full Knowledge Graph</h5>
      <hr/>
      <p>The Neo4j graph is exported to GraphML. We refer to <BlankLink href="https://neo4j.com/labs/apoc/4.1/import/graphml/">Neo4j's guide</BlankLink>, but it is possible to import the graph using:</p>
          <pre>
            <code>
              {`   CALL apoc.import.graphml("neo4j.graphml", {readLabels: True})`}
              </code>
          </pre>

      <h4>Code and experiments</h4>
      <hr />
      <p>
        We provide a framework for partitioning the dataset and performing
        evaluations on various models on{" "}
        <BlankLink href="https://github.com/MI-911/warm-start-framework">
          GitHub
        </BlankLink>
        . Further instructions on partitioning the dataset and conducting the
        experiments are available in the repository.
      </p>
      
      <h4>Acknowledgements</h4>
      <hr />
      <p>
        MindReader was developed by <BlankLink href="https://abrams.dk/">Anders Højlund Brams</BlankLink>, <BlankLink href="https://anderslangballe.dk/">Anders Langballe Jakobsen</BlankLink>, Theis Erik Jendal, <BlankLink href="http://people.cs.aau.dk/~khose/">Katja Hose</BlankLink>, <BlankLink href="http://people.cs.aau.dk/~matteo/">Matteo Lissandrini</BlankLink>, and <BlankLink href="https://peterdolog.wordpress.com/">Peter Dolog</BlankLink> at <BlankLink href="https://www.cs.aau.dk/">Aalborg University</BlankLink>.
        We would like to thank all users of MindReader for contributing to the dataset.
      </p>
    </>
  );
};

export default About;
