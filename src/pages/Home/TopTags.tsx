import React from 'react';
import { useFetch } from '../../hooks';

interface Props {
  history: any;
}

const TopTags = ({ history }: Props) => {
  const tagListState = useFetch([], [], 'tagList');
  return (
    <div className='top-tags'>
      <h5 className='top-tags-desc'>Top Tags:</h5>

      <div className='tags'>
        {tagListState.data.length > 0 &&
          tagListState.data.map(tag => {
            return (
              <h5
                key={tag._id}
                onClick={() =>
                  history.push({
                    pathname: `/productList/${tag.id}`,
                    state: { isTag: true }
                  })
                }
              >
                {tag.name}
              </h5>
            );
          })}
      </div>
    </div>
  );
};

export default TopTags;
