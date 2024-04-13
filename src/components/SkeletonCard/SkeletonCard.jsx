import { Grid } from 'components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonCard = () => {
  return (
    <Grid>
      {Array(15)
        .fill()
        .map((image, idx) => (
          <li key={idx}>
            <Skeleton height={180} />
          </li>
        ))}
    </Grid>
  );
};
