import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.wutka.dtd.DTD;
import com.wutka.dtd.DTDAny;
import com.wutka.dtd.DTDChoice;
import com.wutka.dtd.DTDContainer;
import com.wutka.dtd.DTDElement;
import com.wutka.dtd.DTDEmpty;
import com.wutka.dtd.DTDItem;
import com.wutka.dtd.DTDMixed;
import com.wutka.dtd.DTDName;
import com.wutka.dtd.DTDPCData;
import com.wutka.dtd.DTDParser;
import com.wutka.dtd.DTDSequence;

public class Main {
	public static void main(String[] args) {
		// MainFrame frame = new MainFrame();
		DTDParser parser = new DTDParser(new InputStreamReader(
				getHibernateConfigurationDTD()));
		DTD dtd = null;
		try {
			dtd = parser.parse(true);
		} catch (IOException e) {
			throw new RuntimeException("Cause: " + e.getMessage());
		}
//		printElement(dtd., 0);
		DTDName rootName = new DTDName(dtd.rootElement.name);
	}

	private static void printElement(DTDItem item, int deep) {
		String prefix = "";
		for (int i = 0; i < deep; i++) {
			prefix += "\t";
		}
		if (item instanceof DTDAny) {
			System.out.println("any");
		} else if (item instanceof DTDContainer) {
			System.out.println("container");
			if (item instanceof DTDSequence) {
				;
			} else if (item instanceof DTDMixed) {
				;
			} else if (item instanceof DTDChoice) {
				;
			} else {
				throw new RuntimeException("");
			}
			DTDContainer container = (DTDContainer)item;
			DTDItem[] items = container.getItems();
			for ( int i = 0; i < items.length; i++ ) {
				System.out.println(items[i]);
			}
		} else if (item instanceof DTDEmpty) {
			System.out.println("empty");
		} else if (item instanceof DTDName) {
			System.out.println("name");
		} else if (item instanceof DTDPCData) {
			System.out.println("pcdata");
		} else {
			throw new RuntimeException("");
		}
	}

	private static InputStream getHibernateConfigurationDTD() {
		try {
			return Class.forName("org.hibernate.Hibernate")
					.getResourceAsStream("hibernate-configuration-3.0.dtd");
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("Cause: " + e.getMessage());
		}
	}
}
