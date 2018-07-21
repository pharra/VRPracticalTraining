import Axios from 'axios';
import DebugLog from '@/lib/DebugLog';

class ObjInfo {
    private ObjInfoJson: any | null = null;
    private url: string = 'static/objectModel/project1/';
    private info: any;

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
        this.info = this.ObjInfoJson[0].Stone1;
    }

}
export { ObjInfo };
