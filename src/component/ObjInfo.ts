import Axios from 'axios';
import DebugLog from '@/lib/DebugLog';

class ObjInfo {
    private ObjInfoJson: any | null = null;
    private url: string = 'static/objectModel/project1/';
    private info1: string = '';
    private info2: string = '';
    private info3: string = '';
    private info4: string = '';

    constructor() {
        this.preload();
     }

      public preload = () => {
            Axios.get(this.url + 'ObjInfo.json')
                .then((response) => {
                    DebugLog('123');
                    DebugLog(response.data);
                    this.ObjInfoJson = response.data;
                    this.GetObjInfo();
                }).catch((error) => {
                    DebugLog(error);
                });
        }
        public GetObjInfo = () => {
         this.ObjInfoJson[0].Stone1.forEach((sample: any) => {
         this.info1 = sample.info1;
         this.info2 = sample.info2;
         this.info3 = sample.info3;
         this.info4 = sample.info4;
         });
        }

    }
export { ObjInfo };
