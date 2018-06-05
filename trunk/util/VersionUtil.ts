export default class VersionUtil{

    /*
    * 作用 比较两个版本号的大小
    * 条件: 版本号是以.分割的 子版本号的级数可以不一致
    * @param firstVersion 第一个版本号
    * @param secondeVersion 第二个版本号
    * @return number 如果返回1表示前者大于后者, -1表示小于，0表示相等
    * @author 肖建军
    * */
    public compareVersion( firstVersion:string, secondVersion:string):number
    {
        let result:number = 0 ;
        let firstArr:string[] = firstVersion.split(".") ;
        let secondArr:string[] = secondVersion.split(".") ;
        let firstArrLen:number = firstArr.length ;
        let secondArrLen:number = secondArr.length ;

        //级数是否相等
        let hasEqualLen:boolean = ( firstArrLen == secondArrLen ) ;

        //需要对比判断的级数
        let compareLen:number = 0 ;
        if( hasEqualLen ) {
            compareLen = firstArrLen ;
        } else {
            compareLen = Math.min(firstArrLen, secondArrLen);
        }

        //判断级数相等的部分
        for( let i:number = 0 ; i < compareLen ; i ++ ) {
            if( parseInt( firstArr[i] ) == parseInt( secondArr[i]) ) {
                continue ;
            } else {
                result = parseInt( firstArr[i] ) > parseInt( secondArr[i] ) ? 1 : -1;
                break ;
            }
        }

        //判断级数不等的部分
        if( result == 0 && !hasEqualLen ) {
            result = firstArrLen > secondArrLen ? 1 : -1 ;
        }    
        return result ;
    }
}    