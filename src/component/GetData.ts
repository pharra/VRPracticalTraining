import $ from 'jquery';
import DebugLog from '@/lib/DebugLog';

export default class GetData {

  public static postGetExperiment(pagenum: number): any {
    let jsonData: any = null;
    $.ajax({
        url: '/api/post_experimentSearch',
        type: 'POST',
        async: false,
        data: { page : pagenum},
        timeout: 5000,
        dataType: 'json',
        success: (data, textStatus, jqXHR) => {
            jsonData = data;
        },
        error: (xhr, textStatus) => {
            DebugLog(xhr, textStatus);
        },
    });
    return jsonData;
  }

  public static postUserInfo(): any {
    let jsonData: any = null;
    $.ajax({
        url: '/api/post_userInfo',
        type: 'POST',
        async: false,
        data: {},
        timeout: 5000,
        dataType: 'json',
        success: (data, textStatus, jqXHR) => {
            jsonData = data;
        },
        error: (xhr, textStatus) => {
            DebugLog(xhr, textStatus);
        },
    });
    return jsonData;
  }

  public static getObjInfo(projectUrl: string): any {
    let jsonData: any = null;
    $.ajax({
        url: projectUrl,
        type: 'GET',
        async: false,
        data: {},
        timeout: 5000,
        dataType: 'json',
        success: (data, textStatus, jqXHR) => {
            jsonData = data[0];
        },
        error: (xhr, textStatus) => {
            DebugLog(xhr, textStatus);
        },
    });
    return jsonData;
  }
}
