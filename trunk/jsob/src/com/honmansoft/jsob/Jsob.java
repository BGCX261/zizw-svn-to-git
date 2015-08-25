package com.honmansoft.jsob;

import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.Map;

import org.mozilla.javascript.CompilerEnvirons;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.Parser;
import org.mozilla.javascript.tools.ToolErrorReporter;

public class Jsob {
	public static void main(String[] args) throws Exception {
		CompilerEnvirons env = new CompilerEnvirons();
		ErrorReporter erpt = new ToolErrorReporter(true);
		Parser parser = new Parser(env, erpt);
		ObfNamer namer = new ObfNamer();
		Receiver.setNamer(namer);
		Receiver.reset();
		parser.parse(new InputStreamReader(Jsob.class
				.getResourceAsStream("prototype.js")), "js", 0);
		System.out.println(Receiver.get());
		for (Iterator<Map.Entry<String, String>> iter = namer.iterator(); iter
				.hasNext();) {
			Map.Entry<String, String> entry = iter.next();
			System.out.println(entry.getKey() + ":" + entry.getValue());
		}
	}
}
