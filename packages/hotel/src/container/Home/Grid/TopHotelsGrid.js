import React, { useState, useEffect } from "react";
import Heading from "@iso/ui/Heading/Heading";
import TextLink from "@iso/ui/TextLink/TextLink";
import Container from "@iso/ui/UI/Container/Container";
import { HotelPostGridLoader } from "@iso/ui/ContentLoader/ContentLoader";
import SectionGrid from "@hotel/components/SectionGrid/SectionGrid.cra";
import SectionTitle from "@hotel/components/SectionTitle/SectionTitle";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
import useDataApi from "@iso/lib/hooks/useDataApi";
import axios from "axios";
import { API_URL } from "../../../settings/constant";
import {
  LISTING_POSTS_PAGE,
  SINGLE_POST_PAGE,
} from "../../../settings/constant";

const TopHotelsGrid = () => {
  const { data, loading } = useDataApi("/data/top-hotel.json");
  const { width } = useWindowSize();

  const [products, setProducts] = useState([]);

  // const API_URL = "http://econail.localhost/api";
  let test = [];
  useEffect(() => {
    axios.get(`${API_URL}/g/product`).then((res) => {
      if (res.data.status) {
        test = [...res.data.data.data];
        setProducts(test);
      }
    });
  }, []);

  let posts = products;
  let limit;
  if (products && width <= 767) {
    posts = products.slice(0, 4);
    limit = 4;
  }
  if (products && width >= 768) {
    posts = products.slice(0, 6);
    limit = 6;
  }
  if (products && width >= 992) {
    posts = products.slice(0, 8);
    limit = 8;
  }
  if (products && width >= 1200) {
    posts = products.slice(0, 10);
    limit = 10;
  }
  if (products && width >= 1800) {
    posts = products.slice(0, 12);
    limit = 12;
  }
  // if (data && width <= 767) {
  //   posts = data.slice(0, 4);
  //   limit = 4;
  // }
  // if (data && width >= 768) {
  //   posts = data.slice(0, 6);
  //   limit = 6;
  // }
  // if (data && width >= 992) {
  //   posts = data.slice(0, 8);
  //   limit = 8;
  // }
  // if (data && width >= 1200) {
  //   posts = data.slice(0, 10);
  //   limit = 10;
  // }
  // if (data && width >= 1800) {
  //   posts = data.slice(0, 12);
  //   limit = 12;
  // }

  return (
    <Container fluid={true}>
      <SectionTitle
        title={<Heading content="Top sản phẩm nổi bật" />}
        link={<TextLink link={LISTING_POSTS_PAGE} content="Show all" />}
      />

      <SectionGrid
        link={SINGLE_POST_PAGE}
        columnWidth={[1 / 2, 1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 5, 1 / 6]}
        data={posts}
        loading={loading}
        limit={limit}
        placeholder={<HotelPostGridLoader />}
      />
    </Container>
  );
};

export default TopHotelsGrid;
