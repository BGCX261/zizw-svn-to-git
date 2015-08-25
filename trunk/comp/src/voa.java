import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

import eclipsecompare.RangeDifference;
import eclipsecompare.RangeDifferencer;

public class voa {

	static boolean console;

	static boolean interactive;

	static String leftFilename;

	static String rightFilename;

	public static void main(String[] args) throws Exception {

		processArgs(args);

		RangeDifferencer.ignoreCase = true;

		String leftText = readText(leftFilename);
		if (leftText == null)
			return;
		RangeComparator left = new RangeComparator(leftText);
		RangeComparator right = new RangeComparator(
				interactive ? readText(System.in) : readText(rightFilename));

		RangeDifference[] diffs = RangeDifferencer.findRanges(left, right);

		StringBuffer sb = new StringBuffer();

		for (int i = 0; i < diffs.length; i++) {
			printDiff(diffs[i], left, right, sb);
		}

		String result = sb.toString();

		if (console) {
			System.out.print(result);
		} else {
			FileWriter fw = new FileWriter("temp.html");
			fw.write(result, 0, result.length());
			fw.flush();
		}

	}

	static void processArgs(String[] args) {
		for (int i = 0; i < args.length; i++) {
			if (args[i].equals("-c")) {
				console = true;
			} else if (args[i].equals("-i")) {
				interactive = true;
			} else if (leftFilename == null) {
				leftFilename = args[i];
			} else if (rightFilename == null) {
				rightFilename = args[i];
			}
		}
		if (leftFilename == null) {
			try {
				System.out.print("leftFilename: ");
				leftFilename = new BufferedReader(new InputStreamReader(
						System.in)).readLine();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (rightFilename == null)
			rightFilename = "temp.txt";
	}

	static String readText(InputStream is) throws Exception {
		Reader reader = new InputStreamReader(is);
		StringBuilder sb = new StringBuilder();
		int count = 0, bufferSize = 1024;
		char[] buffer = new char[bufferSize];
		for (;;) {
			count = reader.read(buffer, 0, bufferSize);
			if (count == -1)
				break;
			sb.append(buffer, 0, count);
		}
		return sb.toString();
	}

	static String readText(String fn) throws Exception {
		File file = new File(fn);
		if (!file.exists()) {
			System.out.println(fn + " not exists!");
			return null;
		}
		InputStream is = new FileInputStream(file);
		return readText(is);
	}

	static void printDiff(RangeDifference diff, RangeComparator left,
			RangeComparator right, StringBuffer sb) {
		String diffStart = "<";
		String diffEnd = "> ";

		if (!console) {
			diffStart = "&lt;";
			diffEnd = "&gt; ";
		}

		if (diff.kind() == RangeDifference.CHANGE) {
			if (!console)
				colorTagStart(sb);
			sb.append(diffStart);
		}
		if (diff.leftLength() != 0)
			for (int i = diff.leftStart(); i < diff.leftEnd(); i++) {
				sb.append(left.list.get(i));
				int j = diff.rightStart() + i - diff.leftStart();
				if (RangeDifference.NOCHANGE == diff.kind()
						&& !left.list.get(i).equals(right.list.get(j))) {
					sb.append("(");
					sb.append(right.list.get(j));
					sb.append(")");
				}
				sb.append(" ");
			}
		if (diff.kind() == RangeDifference.CHANGE)
			sb.append((diff.leftLength() == 0 ? " " : "") + "| ");
		if (diff.kind() == RangeDifference.CHANGE)
			if (diff.rightLength() != 0)
				for (int i = diff.rightStart(); i < diff.rightEnd(); i++) {
					sb.append(right.list.get(i));
					sb.append((i == diff.rightEnd() - 1 ? "" : " "));
				}
		if (diff.kind() == RangeDifference.CHANGE) {
			sb.append(diffEnd);
			if (!console)
				colorTagEnd(sb);
		}
	}

	static void colorTagStart(StringBuffer sb) {
		sb.append("<font color=red>");
	}

	static void colorTagEnd(StringBuffer sb) {
		sb.append("</font color=red>");
	}

}