package utility;

public final class Utils {

	public static boolean isEmptyOrNull(String data) {	
		if(data == null) {
			return true;
		}else if(data.isBlank()) {
			return true;
		}
		return false;
	}

}
