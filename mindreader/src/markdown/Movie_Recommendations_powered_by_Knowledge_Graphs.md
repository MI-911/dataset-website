# Movie Recommendations powered by Knowledge Graphs and Neo4j
When you visit Netflix, you are met by several lists of movies for you to watch. Some new releases, some popular among other users, and most interestingly, some **Top Picks for You**. Netflix uses a powerful **recommendation system** to generate this list. Based on what you have watched and rated, it builds a profile of your tastes in terms of genres, plots, actors and more, and uses this profile *to recommend movies that fit to your taste*. 

Recommendation systems, or recommenders, are used by a huge number of platforms including Amazon, Netflix, Facebook and many other e-commerce and service provision platforms. Their purpose is simple: recommend the items/movies/people that a specific user will most likely buy/watch/become friends with.

***In this article, we will go through how we can build an effective recommendation system using only Neo4j.*** 

While many recommender systems rely on several subsystems interacting with each other (e.g., machine learning clusters training and pulling data from a central database), we will implement a recommender that runs directly on the database itself - and very efficiently so - by exploiting the expressive power of Knowledge Graphs.

We also show how we have used this technology to build [MindReader](https://mindreader.tech), a recommendation system using graph technologies (explained later in this article) allowing users to collaboratively build a dataset unlike any other dataset used in the research field of personalized recommendation. 
~~~~
# Recommendation systems - an overview

If you’re an avid watcher of horror movies, Netflix will pick up on this and recommend more horror movies to you rather than, for example, comedy shows and children’s movies. Regardless of the nature of one’s business, this is a desired feature. The problem, of course, lies in how to infer user preferences in  a simple, efficient, and effective way.

Generally, we talk about three ways of doing this: through **collaborative** or **content-based** filtering, or a combination (**hybrid**) of the two. A collaborative filtering recommender will use the interactions of users similar to you to determine what you would like. 

Imagine two hypothetical users, Mike and Drew, who are both fans of Sci-Fi movies and both like Star Wars. Mike likes Interstellar too, but Drew has not watched it. The collaborative filtering recommender would recommend Interstellar to Drew because Mike - who likes the same things as Drew - likes Interstellar. 

![](https://paper-attachments.dropbox.com/s_3AC515575F42C08EA5E2D48214B83DB75DCC6B4DEF32496E2D4455B69BDA79EF_1585654614857_image.png)


Collaborative filtering can be an effective strategy since the fact that two users like and dislike some set of items can effectively encode some quite complex preferences without us having to worry about what those preferences actually are.

On the other hand,  content-based filtering recommenders would look at the *content* of both movies and determine whether the similarity in content warrants a recommendation. That is, similar items will attract users with similar preferences.

![](https://paper-attachments.dropbox.com/s_3AC515575F42C08EA5E2D48214B83DB75DCC6B4DEF32496E2D4455B69BDA79EF_1585654939407_image.png)


This is also an effective strategy and more transparent than collaborative filtering, since we understand the similarity by means of more tangible properties like genres, actors, and so forth. Notice that, in our example, even without anyone rating Interstellar we can still infer users preferences. In collaborative filtering, this is not possible. **Indeed, content-based filtering can really shine in the** ***item cold-start*** **setting**. This is when a new item that no users have rated is introduced to the system.

We’re going to build a content-based recommender that uses a user’s information as well as a knowledge graph  (powered by a Neo4j graph database) for recommending products to users. First, however, it’s worth discussing why a knowedge graph and a graph database is necessary at all in the first place.

# Why graphs? 

Intuitively, for implementing a content-based recommender, we should be able to model all movies as simple objects with a list of properties (for instance, genres, actors, and subjects) in an SQL database. This, indeed, is easily implemented with a few tables connected through appropriate relationships.

The power of graph databases becomes clear once we start considering connections other than `Movie→HasProperty→Property`. In fact we want to express a much richer model where we represent inter-relations between properties - effectively allowing properties to have properties. This also allows us to explicitly model the nature of each relationship. In this case, the expressiveness of the graph model becomes clearer:


![](https://paper-attachments.dropbox.com/s_3AC515575F42C08EA5E2D48214B83DB75DCC6B4DEF32496E2D4455B69BDA79EF_1586521475168_image.png)


***The above is an example knowledge graph*** representing movies and books as well as actors, genres and the complex interelationships among them. In a knowledge graph, not only do we know what items are related to what properties, we know *how* they are related and impose no restrictions on what can be related and how. 

With such a graph structure, we suddenly have many new ways of describing the items we want to recommend. This translates to more complex reasoning about what a given user might appreciate and why when we compare two items. For example, if a user likes “Cloud Atlas” (the movie), they might like “Catch Me If You Can” because Tom Hanks stars in both of them. On the other hand, they could be looking for something different from fiction. If they’re looking for a book to buy, they might like “Cloud Atlas” (the book), and if they also liked “Catch Me If You Can”, maybe they would like the “I Am Malala” book as it is also a biography and won awards similar to the Cloud Atlas book. 

While modelling this with standard SQL technologies is definitely possible, it is usually very difficult because of the rich structure. Instead, in a graph database, modelling such structure is [more straightforward](https://neo4j.com/blog/data-modeling-basics/?ref=blog). Also, querying a lot of relationships in an SQL database like this is [not exactly a](https://neo4j.com/whitepapers/overcoming-sql-strain-graph-databases/?ref=blog) [very efficient](https://neo4j.com/whitepapers/overcoming-sql-strain-graph-databases/?ref=blog) [operation](https://neo4j.com/whitepapers/overcoming-sql-strain-graph-databases/?ref=blog). What’s more is that in a graph database, we are free to extend the structure of our database graph as we’d like and to represent an ever-evolving domain. 

# Making recommendations

To suggest items to users, it is common to deploy very complex machine learning models. Here, we will instead be exploiting the full power of graphs by using a variant of the ***PageRank*** *algorithm for making recommendations for our users*. PageRank is an algorithm that is at the core of Google’s ranking algorithm for web-pages. It is used to rank the most relevant and important pages on the internet based on how they are connected.  *This means that it is used to evaluate the importance of a page.*

The algorithm models a random web-surfer navigating the web by following links between individual web-pages. Web pages are presented as nodes and the connections (the edges) are created when a page contains a link to another page. The PageRank of a given website, i.e., a node in the web-graph, is given by how likely would be a user to end up on a specific web page if browsing the web aimlessly. 

![](https://paper-attachments.dropbox.com/s_3AC515575F42C08EA5E2D48214B83DB75DCC6B4DEF32496E2D4455B69BDA79EF_1586521317477_image.png)


In the graph in the figure, the most important web-page would be Wikipedia, followed by Neo4j and Dev.to, followed by Google and Reddit, and so on. 

In the PageRank model, we assume that the random web-surfer can teleport to any page in the entire network at any time. This is analogous to the surfer simply typing in a different URL in the browser instead of following the links on a page. In a variant called **Personalized PageRank**, we limit the target pages the surfer can teleport only to a specific set of graph nodes (this is called the preference set or the *personalized set* because they represent the pages a specific user likes the most). For example, if we “personalize” the PageRanks by only allowing the surfer to teleport to Medium, we get the following rankings: 


![](https://paper-attachments.dropbox.com/s_3AC515575F42C08EA5E2D48214B83DB75DCC6B4DEF32496E2D4455B69BDA79EF_1586521849923_image.png)


Note that the random-surfer model makes no requirement for what the graph is modelling. In the end, what we obtain is a ranking of nodes in the graph according to their relevance and importance, regardless of what the nodes represent.

So, we should be able to do something similar with out movie-graph database, right? Yes! 
The global PageRank of the previous knowledge graph gives us the following rankings:

![](https://paper-attachments.dropbox.com/s_3AC515575F42C08EA5E2D48214B83DB75DCC6B4DEF32496E2D4455B69BDA79EF_1586521501097_image.png)


This would be the rankings we would use to present products to a newly visiting user, yielding a top-three of (1) “I Am Malala”, (2) “Cloud Atlas (movie)”, and (3) “Catch Me If You Can”. As such, we would recommend that the user reads “I Am Malala”. 

Let’s imagine that the user accepts our recommendation, reads “I Am Malala” and enjoys it. What information does that give us? Also, how should the recommendation change as a result of this information? If nothing changes, we would recommend that the user watches the “Cloud Atlas” movie next, but perhaps the fact that they liked “I Am Malala” can be put to better use. An idea could be to simply personalize the PageRank towards “I Am Malala”. This will push nodes closely related to “I Am Malala” upwards through the ranks. As an added bonus, this allows us to limit the computation to the locally affected nodes.

Another quite significant advantage of Personalized PageRank is that we can personalize the ranks *even further* by assigning user-specific relation weights. For example, if a user likes seeing the same actors in different movies, we could weigh the `Stars` and `Co-stars` relations highly for that user. 

Running Personalized PageRank over the same graph with “I Am Malala” as the only source node, we get the following rankings:

![](https://paper-attachments.dropbox.com/s_3AC515575F42C08EA5E2D48214B83DB75DCC6B4DEF32496E2D4455B69BDA79EF_1586521527115_image.png)


With that small change, we would now recommend that the user either watches “Catch Me If You Can” or reads “Cloud Atlas (Book)” instead of watching “Cloud Atlas”.

To further demonstrate Personalized PageRank’s ability to adapt to user preferences, let’s instead assume we have a user who has read and enjoyed the “Cloud Atlas” book. In this case, we simply change the personalized set to that containing only “Cloud Atlas (Book)” and get the following rankings: 

![](https://paper-attachments.dropbox.com/s_3AC515575F42C08EA5E2D48214B83DB75DCC6B4DEF32496E2D4455B69BDA79EF_1586521545488_image.png)


So, with no further intervention from our side, we now have a personalised top-three for this user: (1) “I Am Malala (Book)”, (2) “Cloud Atlas”, (3) “Catch Me If You Can”. 

[Personalized PageRank](https://en.wikipedia.org/wiki/PageRank) has been proven to be a very effective ranking tool in the context of personalized recommendations ([Shams et. al 2016](https://arxiv.org/pdf/1604.03147.pdf)), and is even used by Twitter to presents with accounts they may want to follow ([Gupta et. al 2013](https://dl.acm.org/doi/10.1145/2488388.2488433)). Unfortunately, in it’s most basic form, PageRank is not a scalable algorithm as it requires several traversals over a potentially huge graph. Luckily for us, [Gallo et. al 2020](http://people.cs.aau.dk/~matteo/pdf/EDBT20-particle-filtering.pdf) presents a way to use particle filtering to very efficiently approximate PageRank over a knowledge graph. We will use this approach in the implementation later.

# MindReader

As mentioned earlier, we have used this approach to recommendations to build a recommender system on https://mindreader.tech. Behind the scenes, the users of MindReader are collaboratively building a dataset unlike any other dataset that is used even in the newest research in recommender systems - you can take a look and download the dataset [here](https://mindreader.tech/dataset).  If you need something to watch tonight and want and help researchers come up with newer and better models for recommendation, try and see if [MindReader can guess your movie-mind](https://mindreader.tech)! 

In the following, we’ll go through how we built MindReader. But first, some context:

MindReader is first and foremost a recommendation system for collaboratively building datasets. 
What makes the MindReader dataset stand out from the other well-established datasets in the research community is that we not only know how users have rated, for instance, horror and action movies starring Matt Damon, we know specifically what the users think about the genres and the actor. For the first time, researchers are able to see if the assumptions made during preference elicitation (e.g., “Drew likes Sci-Fi and Comedy because he likes Hitchhiker’s Guide to the Galaxy”) actually holds, since we now know how Drew rates these entities. Further, we’ll be able to try correctly inferring a user’s movie preferences from broader entities such as genres or subjects - a very useful approach in the cold-start setting, where we initially know nothing about the user. 

The game first collects a number of ratings from the user, ranging between ratings on movies, genres, actors and directors:

![](https://paper-attachments.dropbox.com/s_3AC515575F42C08EA5E2D48214B83DB75DCC6B4DEF32496E2D4455B69BDA79EF_1585731213315_image.png)


Note that in Neo4j, the “Related movies” section is extremely simple to implement - simply show the 1-hop neighbors in the graph that happen to be movies as we will show later. It would be less intuitive to design and require more complex queries in a traditional SQL database. 

After collecting enough ratings, we then present two lists: what we think the user will **like** and **dislike**. The path to generating these lists is surprisingly short - simply run Personalized PageRank with the nodes the user has liked and disliked as the source nodes, respectively, sort the nodes by their assigned rank, and pick the top 10:


![](https://paper-attachments.dropbox.com/s_3AC515575F42C08EA5E2D48214B83DB75DCC6B4DEF32496E2D4455B69BDA79EF_1585731519948_image.png)

# Querying the graph database

We found it surprisingly straightforward to use Neo4j with Python, our choice of language for the API. By simply installing the [Neo4j Bolt Driver](https://neo4j.com/docs/api/python-driver/current/) and initialising it with the database credentials, we were ready to query the database. However, before diving straight into querying from Python, we made heavy use of the Neo4j Browser, which allowed us to query our graph and visualise the results. This allowed us to experiment with queries and gain a better understanding of both our graph structure and the Cypher query language.

For example, we can visualise the people related to the movie Cloud Atlas with the following query (example borrowed from the [Guide to Cypher Basics](https://neo4j.com/developer/guide-cypher-basics/)):

    MATCH (people: Person)-[relatedTo]-(movie: Movie {name: "Cloud Atlas"}) 
    RETURN people, movie
![](https://paper-attachments.dropbox.com/s_68106E2644987B1A004A9333E10BE677E1D2F8412372D0AC95E5F238336F4738_1585822359332_image.png)


We only use two Cypher queries: one we use to fetch nodes to ask about (e.g., genres, actors, and directors) and one to recommend movies. Both utilise a PageRank score, and as mentioned before, we use [particle filtering](https://github.com/DenisGallo/Neo4j-ParticleFiltering), a Neo4j plugin that approximates (Personalized) PageRank significantly faster than the default implementation.

First, let’s store the URIs of the nodes liked by the current user in `$uris`. These comprise our personalization set - the source nodes that the random surfer can teleport to. We collect the nodes corresponding to these URIs and pass them to the `particlefiltering` algorithm:


    MATCH (n) WHERE n.uri IN $uris WITH COLLECT(n) AS nLst
    CALL particlefiltering(nLst, 0, 100) YIELD nodeId, score

This gives us the nodes’ identifiers `nodeId` and their Personalized PageRank scores `score`. 

Of course, we do not want to return nodes that have already been seen by the user. A simple fix is having a list of all entity URIs seen by a user in the `$seen` variable, which we filter out with the command:

    MATCH (n) WHERE id(n) = nodeId AND NOT n.uri IN $seen
        WITH DISTINCT id(n) AS id, score, n.name AS name

We could in principle return everything here, but we noticed that users had a difficult time recognizing an actor or understanding a subject without having some related information. We therefore find all related movies to the entities. In our graph, only movies with a sequel or prequel are connected. If we therefore simply used the `MATCH` keyword, we would get rid of all movies without a movie edge. To get around that issue, we conduct an `OPTIONAL MATCH` and use `collect()` to limit the related movies to the 5 movies with the highest *global* PageRank.


    OPTIONAL MATCH (r)<--(m: Movie) WHERE id(r) = id
        WITH algo.asNode(id) AS r, m, score
    
    ORDER BY m.pagerank DESC
        WITH r, COLLECT(DISTINCT m)[..5] as movies, score

And that’s it! We can now return, extracting the information we need:

    RETURN r:Director AS director, r:Actor AS actor, 
           r.imdb AS imdb, r:Subject AS subject, 
           r:Movie AS movie, r:Company AS company, 
           r:Decade AS decade, r.uri AS uri, 
           r.name AS name, r:Genre AS genre,
           r:Person AS person, r:Category AS category, 
           r.image AS image, r.year AS year, 
           movies, score

With Neo4j, we are therefore able to find relevant nodes and easily extracting data of high relevance without implementing an otherwise complex recommender system.

If we were to do this with more traditional SQL technologies, we would need to model the nodes and edges in tables, extract the nodes for every query including several joins, build a graph in a separate graph tool and compute the rankings from there. However, because of the power of graph databases, this all happens directly on the database.

# Summary

In this article, we have described how graph databases can be leveraged very effectively to generate recommendations from a Neo4j graph database of products, regardless of the domain of the database. We also show how we have used Neo4j to build [MindReader](https://mindreader.tech), our considerations during the process and how our choice of database management system has benefitted us. 

We strongly encourage the reader to consider how a graph database can improve their current situation. As completely new users of Neo4j, it has allowed us to implement a recommendation system that allows users to collaboratively build a [dataset unlike any other](https://mindreader.tech/dataset) used in the research field of personalized recommendation, opening a wide range of new avenues of research.  If implemented with traditional SQL technologies, even considering our higher familiarity with SQL, development time would have increased by an order of magnitude, and would likely not perform as well. 

If you need something to watch tonight, you can [try out MindReader on our website](https://mindreader.tech). In doing so, you help advance research and extend the most exciting dataset in the personalized recommendation research community. The full MindReader dataset is available for [download](https://mindreader.tech/dataset) for anyone interested.

