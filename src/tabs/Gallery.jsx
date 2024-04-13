import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { SkeletonCard } from 'components/SkeletonCard/SkeletonCard';

export class Gallery extends Component {
  state = {
    page: 1,
    search: '',
    images: [],
    showBtn: false,
    isEmpty: false,
    isError: '',
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const data = await ImageService.getPhotos(
          this.state.search,
          this.state.page
        );
        if (data.photos.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.photos],
          showBtn: Math.ceil(data.total_results / 15) > this.state.page,
        }));
      } catch (err) {
        this.setState({ isEmpty: err.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = searchTerm => {
    if (searchTerm === this.state.search) {
      alert('We have alredy shown these photos');
      return;
    }

    this.setState({
      search: searchTerm,
      page: 1,
      images: [],
      showBtn: false,
      isEmpty: false,
    });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    console.log(this.state.images);
    return (
      <>
        <SearchForm handleSearch={this.handleSearch} />
        {this.state.isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {this.state.isError && (
          <Text textAlign="center">
            Something went wrong, try again later... 😥
          </Text>
        )}

        <Grid>
          {this.state.images.map(image => (
            <GridItem key={image.id}>
              <CardItem color={image.avg_color}>
                <img src={image.src.large} alt={image.alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {this.state.isLoading && <SkeletonCard />}
        {this.state.showBtn && (
          <Button onClick={this.handleClick}>Load more</Button>
        )}
      </>
    );
  }
}
