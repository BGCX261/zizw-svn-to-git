package com.honmansoft.jsob;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.mozilla.javascript.CompilerEnvirons;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.Parser;
import org.mozilla.javascript.tools.ToolErrorReporter;

public class TranslatorTest {

	private CompilerEnvirons env = new CompilerEnvirons();

	private ErrorReporter erpt = new ToolErrorReporter(true);

	private Parser parser = new Parser(env, erpt);

	@Test
	public void test() throws Exception {
		List<String> expectedStringList = new ArrayList<String>();
		// --Keywords
		expectedStringList.add("lbl:do{delete x.y;continue lbl;}while(true);");
		expectedStringList.add("lbl:for(x in y)break lbl;");
		expectedStringList.add("if(true)true;else flase;");
		expectedStringList.add("var x=new X();");
		expectedStringList.add("try{}catch(ex){}finally{}");
		expectedStringList.add("switch(x){case X:default:}");
		expectedStringList.add("function fn(){return love;throw ex;};");
		expectedStringList.add("with(this.x){void y;}");
		expectedStringList.add("x instanceof y;");
		expectedStringList.add("typeof x;");
		// --Punctuators
		// {}()[]
		expectedStringList.add("function fn(){var x=[];}");
		// .;,<><=
		expectedStringList.add("x.y,a.b;a<b;a>b;a<=b;");
		// >===!====!==
		expectedStringList.add("a>=b;a==b;a!=b;a===b;a!==b;");
		// +-*%++--
		expectedStringList.add("a+b;a-b;a*b;a%b;a++;a--;");
		// <<>>>>>&|^
		expectedStringList.add("a<<b;a>>b;a>>>b;a&b;a|b;a^b;");
		// ! ~ && || ? :
		expectedStringList.add("!a;~a;a&&b;a||b;a?b:c;");
		// = +=-= *=%= <<=
		expectedStringList.add("a=b;a+=b;a-=b;a*=b;a%=b;a<<=b;");
		// >>=>>>=&=|=^=
		expectedStringList.add("a>>b;a>>>b;a&=b;a|=b;a^=b;");
		// //=
		expectedStringList.add("a/b;a/=b;");
		// --RegExp
		expectedStringList.add("/abc/g;");
		// --null
		expectedStringList.add("null;");
		// --boolean
		expectedStringList.add("true;false;");
		// --number
		expectedStringList.add("3.4e4");
		// --string
		expectedStringList.add("'abc\"def';\"abc'def\";");
		for (int i = 0; i < expectedStringList.size(); i++) {
			String expectedString = expectedStringList.get(i);
			Receiver.reset();
			parser.parse(expectedString, "js", 0);
			String string = Receiver.get();
			Assert.assertEquals(expectedString, string);
		}
	}
}
