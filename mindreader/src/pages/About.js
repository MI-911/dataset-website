import React from 'react';
import { Link } from 'react-router-dom';
import BlankLink from '../components/BlankLink';
import { Table, Container } from 'react-bootstrap';
import '../App.css';

const About = () => {
  return (
    <>
      <h2>MindReader</h2><hr />
      <p>
        MindReader is a novel dataset providing explicit user ratings over a knowledge graph within the movie domain.
        The latest stable version of the dataset contains 102,160 ratings from 1,174 users over 10,030 entities, and an associated knowledge graph consisting of 18,133 movie-related entities.
        The dataset is collected from an online movie recommendation game, <BlankLink href="https://mindreader.tech">MindReader</BlankLink>, where users are pseudo-randomly asked to provide preferences for both movie- and non-movie entities (e.g., genres, actors, and directors).
        For each entity, users can either like it, dislike it, or state that they do not know it.
      </p>

      <div className="text-center">
        <Link to="/releases">
          <button className="mr-btn mr-btn-lg">Download</button>
        </Link>
      </div>

      <h4>Releases</h4><hr />
      <p>
        The latest release of MindReader, as well as previous versions, can be found on the <Link to="/releases">Releases</Link> page.
        We maintain stable releases appropriate for research as well as a rolling release which is continously updated.
        For all releases, we include the structure of the underlying knowledge graph on which the entities have been rated.
      </p>

      <h4>Structure</h4><hr />
      <p>All dataset files are provided as related CSV files. The structure of each file is described in detail below.</p>

      <h5>Ratings</h5><hr />
      <p>
        The ratings file (<code>ratings.csv</code>) contains a row for each rating tuple. Below we provide an explanation of the four columns.
      </p>
      <Container className="pb-4">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <code>userId</code>
              </td>
              <td>
                A unique identifier which anonymously identifies the user responsible for the rating.
              </td>
            </tr>

            <tr>
              <td>
                <code>uri</code>
              </td>

              <td>
                The URI of the rated entity, corresponding to URIs from <BlankLink href="https://wikidata.org">Wikidata</BlankLink>. The entity URIs match those in <code>triples.csv</code>. Currently, decades do not follow this convention, e.g., the decade 2010 is represented as DECADE_2010 instead of <BlankLink href="https://wikidata.org/wiki/Q19022">Q19022</BlankLink>.
              </td>
            </tr>

            <tr>
              <td>
                <code>isItem</code>
              </td>

              <td>
                A boolean indication of whether the rated entity is an item (i.e., movie) or not.
              </td>
            </tr>


            <tr>
              <td>
                <code>sentiment</code>
              </td>

              <td>
                The rating provided by the user for the specific entity, which can take one of three values:
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
        The knowledge graph triples file (<code>triples.csv</code>) contains a row for each head-relation-tail triple in the knowledge graph. Below we provide an explanation of the three columns.
      </p>
      <Container className="pb-4">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <code>head_uri</code>
              </td>
              <td>
                The URI of the head entity, corresponding to a URI from <BlankLink href="https://wikidata.org">Wikidata</BlankLink>.
              </td>
            </tr>

            <tr>
              <td>
                <code>relation</code>
              </td>

              <td>
                The name of relation connecting the head and tail entity. The relation name does not correspond to a <BlankLink href="https://wikidata.org">Wikidata</BlankLink> URI.
              </td>
            </tr>

            <tr>
              <td>
                <code>tail_uri</code>
              </td>

              <td>
              The URI of the tail entity, corresponding to a URI from <BlankLink href="https://wikidata.org">Wikidata</BlankLink>.
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <h5>Knowledge graph entities</h5>
      <hr />
      <p>
        The knowledge graph entities file (<code>entities.csv</code>) contains a row for each entity in the knowledge graph. Below we provide an explanation of the two columns.
      </p>
      <Container className="pb-4">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <code>uri</code>
              </td>
              <td>
                The URI of the entity, corresponding to a URI from <BlankLink href="https://wikidata.org">Wikidata</BlankLink>.
              </td>
            </tr>

            <tr>
              <td>
                <code>name</code>
              </td>

              <td>
                The name of entity.
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <h4>Experiments</h4><hr />
      <p>
        We provide a framework for partitioning the dataset and performing evaluations on various models on <BlankLink href="https://github.com/MI-911/warm-start-framework">GitHub</BlankLink>.
        Further instructions on partitioning the dataset and conducting the experiments are available in the repository.
      </p>

      <h4>Reference</h4><hr />
      <p>
        Guidelines for referencing the dataset will be present prior to publication.
      </p>
    </>
  );
};

export default About;
