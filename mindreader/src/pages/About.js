import React from 'react';
import { Link } from 'react-router-dom';
import BlankLink from '../components/BlankLink';
import { Table } from 'react-bootstrap';

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

      <h4>Releases</h4><hr />
      <p>
        The latest release of MindReader, as well as previous versions, can be found on the <Link to="/releases">Releases</Link> page.
        We maintain stable releases appropriate for research as well as more recent versions with more ratings.
        For all releases, we include the structure of the underlying knowledge graph on which the entities have been rated.
      </p>

      <h4>Structure</h4><hr />
      <p>
        The dataset is provided as a csv file with an entry for each rating. Below we provide an explanation of the different columns.
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                userId
              </td>
              <td>
                A unique identifier which anonymously identifies the user responsible for the rating.
              </td>
            </tr>

            <tr>
              <td>
                uri
              </td>

              <td>
                The URI of the rated entity, corresponding to URIs from <BlankLink href="https://wikidata.org">Wikidata</BlankLink>. Currently, decades do not follow this convention, e.g., the decade 2010 is represented as DECADE_2010 instead of <BlankLink href="https://wikidata.org/wiki/Q19022">Q19022</BlankLink>.
              </td>
            </tr>

            <tr>
              <td>
                isItem
              </td>

              <td>
                A boolean indication of whether the rated entity is an item (i.e., movie) or not.
              </td>
            </tr>


            <tr>
              <td>
                sentiment
              </td>

              <td>
                The rating provided by the user for the specific entity, which can take one of three values:
                <ul>
                  <li>-1 if the user disliked the entity</li>
                  <li>0 if the user stated that they don't know how to rate the entity</li>
                  <li>1 if the user liked the entity</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </Table>
      </p>

      <h4>Experiments</h4><hr />
      <p>
        We provide a framework for partitioning the dataset and performing evaluations on various models on <BlankLink href="https://github.com/MI-911/model-framework">GitHub</BlankLink>.
        Further instructions on conducting the experiments are available in the repository.
      </p>

      <h4>Reference</h4><hr />
      <p>
        Guidelines for referencing the dataset will be present prior to publication.
      </p>
    </>
  );
};

export default About;