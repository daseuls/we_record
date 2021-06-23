import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import Styled from 'styled-components';
import BestBatch from './BestBatch/BestBatch';
import PeersBox from './PeersBox/PeersBox';
import checkObjData from '../Util/checkObjData';

export default function Batch() {
  const [batchInfo, setBatchInfo] = useState({});
  const { winner_batch_information, my_batch_information } = batchInfo;

  useEffect(() => {
    batchInfoFetch(setBatchInfo);
  }, []);

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        {checkObjData(batchInfo) > 0 && (
          <BestBatch
            winnerInfo={winner_batch_information}
            myBatchInfo={my_batch_information}
          />
        )}
        {checkObjData(batchInfo) > 0 && (
          <PeersBox myBatchInfo={my_batch_information} />
        )}
      </Container>
    </FadeIn>
  );
}

const Container = Styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 142px;
`;

const batchInfoFetch = setBatchInfo => {
  const batchNum = sessionStorage.getItem('batch');

  fetch(`http://10.58.2.17:8000/users/batch/${batchNum}`, {
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ result }) => {
      setBatchInfo(result);
    });
};