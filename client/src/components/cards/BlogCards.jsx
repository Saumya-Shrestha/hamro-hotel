import React, { useEffect, useState } from "react";

const BlogCards = ({ mode }) => {
  const [news, setnews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(8);

  const fetchData = async () => {
    try {
      const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=e09d9f7d5a38417fac4d41c193572a25");
      const data = await response.json();
      setnews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      setnews({ articles: [] });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.articles ? news.articles.slice(indexOfFirstArticle, indexOfLastArticle) : [];
  const totalPages = news.articles ? Math.ceil(news.articles.length / articlesPerPage) : 0;

  // Functions to change page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top when page changes
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top when page changes
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  return (
    <>
      <div className={`bg-${mode} pb-4`}>
        <div className="container py-5">
          <div className="row">
            <h4 className={`${mode === "light" ? "light-accent-icon" : "dark-accent-icon"} fs-2 fw-bold text-center pb-4`}>Our Latest Blogs</h4>
            {currentArticles.length > 0 ? (
              currentArticles.map((article, index) => (
                <div
                  className="col-md-3 mb-4"
                  key={index}
                >
                  <div className={`card h-100 bg-${mode} shadow-sm border-${mode === "light" ? "0" : "secondary"} transition-all hover-shadow`}>
                    <img
                      src={article.urlToImage || "https://placehold.co/400x200?text=Image+Not+Found"}
                      className="card-img-top text-center"
                      alt={"Blog Image"}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className={`text-${mode === "light" ? "dark" : "light"} card-body py-3 d-flex flex-column`}>
                      <div className={`small text-${mode === "light" ? "muted" : "white-50"} pb-3`}>
                        <div className="d-flex flex-wrap justify-content-between mb-2">
                          {article.source?.name && (
                            <div className="me-2">
                              <i className="bi bi-newspaper me-1"></i>
                              <span>{article.source.name}</span>
                            </div>
                          )}

                          {article.author && (
                            <div>
                              <i className="bi bi-person me-1"></i>
                              <span>{article.author}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="card-text fw-bold mb-3">{article.title ? article.title.split(" - ")[0] : ""}</p>
                      <p className="card-text small mb-5">{article.description}</p>

                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div className={`text-${mode === "light" ? "muted" : "white-50"}`}>
                          {article.publishedAt && (
                            <div>
                              <i className="bi bi-calendar me-1"></i>
                              <span>
                                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          )}
                        </div>

                        <button className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-2`}>
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className={`text-${mode === "light" ? "dark" : "light"}`}>No articles to display</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="row mt-4">
              <div className="col-12">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={goToPreviousPage}
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>

                    {/* Generate page number buttons */}
                    {[...Array(totalPages).keys()].map((number) => (
                      <li
                        key={number + 1}
                        className={`page-item ${currentPage === number + 1 ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => goToPage(number + 1)}
                        >
                          {number + 1}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={goToNextPage}
                        aria-label="Next"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogCards;
