package com.honmansoft.jsob;

import org.mozilla.javascript.Token;

public class Receiver {
	private static StringBuffer sb;

	private static INamer namer = new EchoNamer();

	public static void setNamer(INamer aNamer) {
		namer = aNamer;
	}
	
	public static void receive(int token, String string, char quoteChar,
			String numString) {
		switch (token) {
		case Token.ERROR:
			emit("ERROR");
			break;
		case Token.EOF:
			emit("");
			break;
		case Token.EOL:
			emit("");
			break;
		case Token.ENTERWITH:
			emit("ENTERWITH");
			break;
		case Token.LEAVEWITH:
			emit("LEAVEWITH");
			break;
		case Token.RETURN:
			emit("return ");
			break;
		case Token.GOTO:
			emit("GOTO");
			break;
		case Token.IFEQ:
			emit("IFEQ");
			break;
		case Token.IFNE:
			emit("IFNE");
			break;
		case Token.SETNAME:
			emit("SETNAME");
			break;
		case Token.BITOR:
			emit("|");
			break;
		case Token.BITXOR:
			emit("^");
			break;
		case Token.BITAND:
			emit("&");
			break;
		case Token.EQ:
			emit("==");
			break;
		case Token.NE:
			emit("!=");
			break;
		case Token.LT:
			emit("<");
			break;
		case Token.LE:
			emit("<=");
			break;
		case Token.GT:
			emit(">");
			break;
		case Token.GE:
			emit(">=");
			break;
		case Token.LSH:
			emit("<<");
			break;
		case Token.RSH:
			emit(">>");
			break;
		case Token.URSH:
			emit(">>>");
			break;
		case Token.ADD:
			emit("+");
			break;
		case Token.SUB:
			emit("-");
			break;
		case Token.MUL:
			emit("*");
			break;
		case Token.DIV:
			emit("/");
			break;
		case Token.MOD:
			emit("%");
			break;
		case Token.NOT:
			emit("!");
			break;
		case Token.BITNOT:
			emit("~");
			break;
		case Token.POS:
			emit("POS");
			break;
		case Token.NEG:
			emit("NEG");
			break;
		case Token.NEW:
			emit("new ");
			break;
		case Token.DELPROP:
			emit("delete ");
			break;
		case Token.TYPEOF:
			emit("typeof ");
			break;
		case Token.GETPROP:
			emit("GETPROP");
			break;
		case Token.SETPROP:
			emit("SETPROP");
			break;
		case Token.GETELEM:
			emit("GETELEM");
			break;
		case Token.SETELEM:
			emit("SETELEM");
			break;
		case Token.CALL:
			emit("CALL");
			break;
		case Token.NAME:
			emit(namer.name(string));
			break;
		case Token.NUMBER:
			emit(numString);
			break;
		case Token.STRING:
			emit(quoteChar + string + quoteChar);
			break;
		case Token.NULL:
			emit("null");
			break;
		case Token.THIS:
			emit("this");
			break;
		case Token.FALSE:
			emit("false");
			break;
		case Token.TRUE:
			emit("true");
			break;
		case Token.SHEQ:
			emit("===");
			break;
		case Token.SHNE:
			emit("!==");
			break;
		case Token.REGEXP:
			emit(string);
			break;
		case Token.BINDNAME:
			emit("BINDNAME");
			break;
		case Token.THROW:
			emit("throw ");
			break;
		case Token.RETHROW:
			emit("RETHROW");
			break;
		case Token.IN:
			emit(" in ");
			break;
		case Token.INSTANCEOF:
			emit(" instanceof ");
			break;
		case Token.LOCAL_LOAD:
			emit("LOCAL_LOAD");
			break;
		case Token.GETVAR:
			emit("GETVAR");
			break;
		case Token.SETVAR:
			emit("SETVAR");
			break;
		case Token.CATCH_SCOPE:
			emit("CATCH_SCOPE");
			break;
		case Token.ENUM_INIT_KEYS:
			emit("ENUM_INIT_KEYS");
			break;
		case Token.ENUM_INIT_VALUES:
			emit("ENUM_INIT_VALUES");
			break;
		case Token.ENUM_NEXT:
			emit("ENUM_NEXT");
			break;
		case Token.ENUM_ID:
			emit("ENUM_ID");
			break;
		case Token.THISFN:
			emit("THISFN");
			break;
		case Token.RETURN_RESULT:
			emit("RETURN_RESULT");
			break;
		case Token.ARRAYLIT:
			emit("ARRAYLIT");
			break;
		case Token.OBJECTLIT:
			emit("OBJECTLIT");
			break;
		case Token.GET_REF:
			emit("GET_REF");
			break;
		case Token.SET_REF:
			emit("SET_REF");
			break;
		case Token.DEL_REF:
			emit("DEL_REF");
			break;
		case Token.REF_CALL:
			emit("REF_CALL");
			break;
		case Token.REF_SPECIAL:
			emit("REF_SPECIAL");
			break;
		case Token.DEFAULTNAMESPACE:
			emit("DEFAULTNAMESPACE");
			break;
		case Token.ESCXMLTEXT:
			emit("ESCXMLTEXT");
			break;
		case Token.ESCXMLATTR:
			emit("ESCXMLATTR");
			break;
		case Token.REF_MEMBER:
			emit("REF_MEMBER");
			break;
		case Token.REF_NS_MEMBER:
			emit("REF_NS_MEMBER");
			break;
		case Token.REF_NAME:
			emit("REF_NAME");
			break;
		case Token.REF_NS_NAME:
			emit("REF_NS_NAME");
			break;
		case Token.TRY:
			emit("try");
			break;
		case Token.SEMI:
			emit(";");
			break;
		case Token.LB:
			emit("[");
			break;
		case Token.RB:
			emit("]");
			break;
		case Token.LC:
			emit("{");
			break;
		case Token.RC:
			emit("}");
			break;
		case Token.LP:
			emit("(");
			break;
		case Token.RP:
			emit(")");
			break;
		case Token.COMMA:
			emit(",");
			break;
		case Token.ASSIGN:
			emit("=");
			break;
		case Token.ASSIGN_BITOR:
			emit("|=");
			break;
		case Token.ASSIGN_BITXOR:
			emit("^=");
			break;
		case Token.ASSIGN_BITAND:
			emit("&=");
			break;
		case Token.ASSIGN_LSH:
			emit("<<=");
			break;
		case Token.ASSIGN_RSH:
			emit(">>=");
			break;
		case Token.ASSIGN_URSH:
			emit(">>>=");
			break;
		case Token.ASSIGN_ADD:
			emit("+=");
			break;
		case Token.ASSIGN_SUB:
			emit("-=");
			break;
		case Token.ASSIGN_MUL:
			emit("*=");
			break;
		case Token.ASSIGN_DIV:
			emit("/=");
			break;
		case Token.ASSIGN_MOD:
			emit("%=");
			break;
		case Token.HOOK:
			emit("?");
			break;
		case Token.COLON:
			emit(":");
			break;
		case Token.OR:
			emit("||");
			break;
		case Token.AND:
			emit("&&");
			break;
		case Token.INC:
			emit("++");
			break;
		case Token.DEC:
			emit("--");
			break;
		case Token.DOT:
			emit(".");
			break;
		case Token.FUNCTION:
			emit("function ");
			break;
		case Token.EXPORT:
			emit("EXPORT");
			break;
		case Token.IMPORT:
			emit("IMPORT");
			break;
		case Token.IF:
			emit("if");
			break;
		case Token.ELSE:
			emit("else ");
			break;
		case Token.SWITCH:
			emit("switch");
			break;
		case Token.CASE:
			emit("case ");
			break;
		case Token.DEFAULT:
			emit("default");
			break;
		case Token.WHILE:
			emit("while");
			break;
		case Token.DO:
			emit("do");
			break;
		case Token.FOR:
			emit("for");
			break;
		case Token.BREAK:
			emit("break ");
			break;
		case Token.CONTINUE:
			emit("continue ");
			break;
		case Token.VAR:
			emit("var ");
			break;
		case Token.WITH:
			emit("with");
			break;
		case Token.CATCH:
			emit("catch");
			break;
		case Token.FINALLY:
			emit("finally");
			break;
		case Token.VOID:
			emit("void ");
			break;
		case Token.RESERVED:
			emit("RESERVED");
			break;
		case Token.EMPTY:
			emit("EMPTY");
			break;
		case Token.BLOCK:
			emit("BLOCK");
			break;
		case Token.LABEL:
			emit("LABEL");
			break;
		case Token.TARGET:
			emit("TARGET");
			break;
		case Token.LOOP:
			emit("LOOP");
			break;
		case Token.EXPR_VOID:
			emit("EXPR_VOID");
			break;
		case Token.EXPR_RESULT:
			emit("EXPR_RESULT");
			break;
		case Token.JSR:
			emit("JSR");
			break;
		case Token.SCRIPT:
			emit("SCRIPT");
			break;
		case Token.TYPEOFNAME:
			emit("TYPEOFNAME");
			break;
		case Token.USE_STACK:
			emit("USE_STACK");
			break;
		case Token.SETPROP_OP:
			emit("SETPROP_OP");
			break;
		case Token.SETELEM_OP:
			emit("SETELEM_OP");
			break;
		case Token.LOCAL_BLOCK:
			emit("LOCAL_BLOCK");
			break;
		case Token.SET_REF_OP:
			emit("SET_REF_OP");
			break;
		case Token.DOTDOT:
			emit("DOTDOT");
			break;
		case Token.COLONCOLON:
			emit("COLONCOLON");
			break;
		case Token.XML:
			emit("XML");
			break;
		case Token.DOTQUERY:
			emit("DOTQUERY");
			break;
		case Token.XMLATTR:
			emit("XMLATTR");
			break;
		case Token.XMLEND:
			emit("XMLEND");
			break;
		case Token.TO_OBJECT:
			emit("TO_OBJECT");
			break;
		case Token.TO_DOUBLE:
			emit("TO_DOUBLE");
			break;
		case Token.GET:
			emit("GET");
			break;
		case Token.SET:
			emit("SET");
			break;
		case Token.CONST:
			emit("CONST");
			break;
		case Token.SETCONST:
			emit("SETCONST");
			break;
		default:
			// Token without name
			throw new IllegalStateException(String.valueOf(token));
		}
	}

	public static void emit(String s) {
		sb.append(s);
	}

	public static String get() {
		return sb.toString();
	}

	public static void reset() {
		sb = new StringBuffer();
	}
}
