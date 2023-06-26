import React from 'react';
import {Translate} from "react-jhipster";
import {useSearchParams} from "react-router-dom";

const LicenceLanding = () => {

  const [params] = useSearchParams();

  return (
    <div className="p-sm-4 p-1 text-justify">
      {/*<h2>Online Task Manager</h2>*/}
      <h4><Translate contentKey={'licence.description' } /> </h4>
      <p>
        <Translate contentKey={`information.pageKey.${params.get('pageKey')}.title`}/>
      </p>
      <h4><Translate contentKey={'information.titles.requirements'}/>:</h4>
      <p>
        <Translate contentKey={`information.pageKey.${params.get('pageKey')}.requirements`}/>
      </p>
      <h4><Translate contentKey={'information.titles.process'}/>: </h4>
      <p>
        <Translate contentKey={`information.pageKey.${params.get('pageKey')}.process`}/>
      </p>
      <h4><Translate contentKey={'licence.timeEstimate'} />:</h4>
      <p>
        <Translate contentKey={'licence.onAverage'} />
      </p>
      <h4><Translate contentKey={'licence.fee'} />:</h4>
      <p>
        {params.get('pageKey') == 1 ?
        `Kz 20,000`
          :
          params.get('pageKey') == 2 ?
            `Kz 18,000`
            :
            params.get('pageKey') == 3 ?
              `Kz 37,000`
              :
              `Kz 132,000`
        }
      </p>
    </div>
  );
};

export default LicenceLanding;
