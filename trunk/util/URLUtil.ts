export default class URLUtil{
	public validateProtocol(url:string):string
	{
		if(url == null) return null;
		var index:number = url.indexOf("://");
		if(index < 0) return url;
		var protocol:string = url.substring(0, index);
		// 调整http和https
		if(protocol == "http" || protocol == "https")
		{
			return window.location.protocol + url.substr(index + 1);
		}
		// 调整ws和wss
		if(protocol == "ws" || protocol == "wss")
		{
			if(window.location.protocol == "https:") protocol = "wss";
			else protocol = "ws";
			return protocol + url.substr(index);
		}
		// 不需要调整
		return url;
	}
}