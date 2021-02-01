import React, {useState, useEffect} from "react";
import Layout from "../Layout";
import {read, listRelated} from "../apiCore";
import RCard from "../Card/Card";
import ControlPanel from "./pdfReader/ControlPanel";
import Loader from "./pdfReader/Loader";
import {Document, Page, pdfjs} from "react-pdf";
import {addItem} from "../cartHelpers";
import styled from "styled-components";
import ShowImage from "../ShowImage";

export const PdfReaderMobStyle = styled.div`
  overflow-y: scroll;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;

  .PDFDocument {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .PDFPage {
    box-shadow: 0 0 8px rgba(0, 0, 0, .5);
    max-width: 100px;
  }
  
`;

export const PdfReaderPCStyle = styled.div`
  overflow-y: scroll;
  height: 500px;
  
`;

const Product = (props, cartButton = true,) => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    // eslint-disable-next-line
    const [error, setError] = useState({});
    const [redirect, setRedirect] = useState(false);

    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const loadSingleProduct = (productId) => {
        read(productId).then((data) => {
            if (data && data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related
                listRelated(data._id).then((data) => {
                    if (data && data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };
    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = (redirect) => {

    };
    const showAddToCartButton = () => {
        return (
            cartButton && (
                <div id="btt" onClick={addToCart} className="ui positive button">Add to Bag</div>
            )
        );
    };
    const showReadOnlineButton = () => {
        return (
            cartButton && (
               <a className="ui positive button" href="#pdf-section">Read Online</a>
            )
        );
    };

    const pdfWrapperRef = React.useRef();

    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    return (
        <Layout
            title={product && product.name}
            className="container"
            description={
                product && product.author && product.author.substring(0, 80)
            }
        >
            <div className="my-5">


                <div align="center" className="container">

                    <div align="left">
                        <div className="card h-100">
                            <div className="card-header bg-dark text-white "></div>
                            <div className="card-body">
                                {shouldRedirect(redirect)}
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-6 " align="center">
                                        <div className="img-fluid rounded">
                                            <ShowImage item={product} url="product"/>
                                            <div className="card-header bg-dark text-white ">{product.name}</div>
                                            <p className="lead mt-2 responsive">
                                                {product.author}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-6 mt-2">
                                        <table className="table table-bordered">
                                            <tbody>
                                            <tr>
                                                <th scope="row">Subject:</th>
                                                <td>{product.name}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Grade:</th>
                                                <td>{product.grade} grade</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Author:</th>
                                                <td>{product.author}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Year:</th>
                                                <td>{product.year}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Page:</th>
                                                <td>{product.page}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Publisher:</th>
                                                <td>{product.publisher}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                        <div className="ui two buttons mb-2">
                                            {showAddToCartButton()}
                                        </div>
                                        <div className="ui two buttons">
                                            {showReadOnlineButton()}
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                                    <div className="d-md-none">
                                        <section
                                            className="d-flex flex-column align-items-center">
                                            <ControlPanel
                                                scale={scale}
                                                setScale={setScale}
                                                numPages={numPages}
                                                pageNumber={pageNumber}
                                                setPageNumber={setPageNumber}
                                                file="/assets/docs/file-sample.pdf"
                                            />
                                            <PdfReaderMobStyle>
                                                <Loader isLoading={isLoading}/>
                                                <Document className={"PDFDocument"}
                                                          file="/assets/docs/file-sample.pdf"
                                                          onLoadSuccess={onDocumentLoadSuccess}>
                                                    <Page className={"PDFPage"} pageNumber={pageNumber} scale={scale}/>

                                                </Document>
                                            </PdfReaderMobStyle>
                                            <ControlPanel
                                                scale={scale}
                                                setScale={setScale}
                                                numPages={numPages}
                                                pageNumber={pageNumber}
                                                setPageNumber={setPageNumber}
                                                file="/assets/docs/file-sample.pdf"
                                            />
                                        </section>
                                    </div>

                                    <div className="d-none d-md-block">
                                        <section
                                            id="pdf-section"
                                            className="d-flex flex-column align-items-center">
                                            <ControlPanel
                                                scale={scale}
                                                setScale={setScale}
                                                numPages={numPages}
                                                pageNumber={pageNumber}
                                                setPageNumber={setPageNumber}
                                                file="/assets/docs/file-sample.pdf"
                                            />
                                            <PdfReaderPCStyle>
                                                <Loader isLoading={isLoading}/>
                                                <Document className={"PDFDocument"}
                                                          file="/assets/docs/file-sample.pdf"
                                                          onLoadSuccess={onDocumentLoadSuccess}>
                                                    <Page className={"PDFPage"} pageNumber={pageNumber} scale={scale}/>

                                                </Document>
                                            </PdfReaderPCStyle>
                                            <ControlPanel
                                                scale={scale}
                                                setScale={setScale}
                                                numPages={numPages}
                                                pageNumber={pageNumber}
                                                setPageNumber={setPageNumber}
                                                file="/assets/docs/file-sample.pdf"
                                            />
                                        </section>
                                    </div>
                        </div>
                    </div>
                    <hr/>
                    <h3>Related Books</h3>
                    <br/>
                </div>
                <div className="container">
                    {relatedProduct && relatedProduct.length === 0 && (
                        <div>No Similar Product 1</div>
                    )}
                    <div className="row">
                        {relatedProduct &&
                        relatedProduct.map((product, i) => (
                            <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-3 ">
                                <RCard product={product}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Product;
