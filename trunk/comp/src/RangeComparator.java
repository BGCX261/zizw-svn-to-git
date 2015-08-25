
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import eclipsecompare.IRangeComparator;

public class RangeComparator implements IRangeComparator {

	public static void main(String[] args) {
		new RangeComparator("I love		\t u\n\nfuck");
	}

	public RangeComparator(String text) {
		StringTokenizer tokenizer = new StringTokenizer(text, " \r\t\n");
		while (tokenizer.hasMoreTokens()) {
			list.add(tokenizer.nextToken());
		}
	}

	public int getRangeCount() {
		return list.size();
	}

	public boolean rangesEqual(int thisIndex, IRangeComparator other,
			int otherIndex, boolean ignoreCase) {
		if (ignoreCase) {
			return ((RangeComparator) other).list.get(otherIndex).toString()
					.toLowerCase().equals(
							list.get(thisIndex).toString().toLowerCase());
		} else {
			return ((RangeComparator) other).list.get(otherIndex).equals(
					list.get(thisIndex));
		}
	}

	public boolean skipRangeComparison(int length, int maxLength,
			IRangeComparator other) {
		return false;
	}

	List list = new ArrayList();
}