import Container from "./Container";
import Image from "./Image";
import Text from "./Text";
import Button from "./Button";
import Carousel from "./Carousel";
import Video from "./Video";
import Link from "./Link";
import List from "./List";

export const materialList = [
  Container,
  Image,
  Text,
  Button,
  Carousel,
  Link,
  Video,
  List,
];

export const materialMap = materialList.reduce(
  (acc, v) => ({ ...acc, [v._name]: v }),
  {}
);
