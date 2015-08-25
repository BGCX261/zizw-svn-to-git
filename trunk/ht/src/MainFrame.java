import java.awt.GraphicsEnvironment;
import java.awt.Point;
import java.awt.Rectangle;

import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTree;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.MutableTreeNode;

public class MainFrame extends JFrame {

	private static GraphicsEnvironment ge = GraphicsEnvironment
			.getLocalGraphicsEnvironment();

	public MainFrame() {
		super("HT Main Frame");
	}

	protected void frameInit() {
		super.frameInit();
		//
		Point point = getInitialPoint();
		Point size = getInitialSize();
		setBounds(point.x, point.y, size.x, size.y);
		//
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		//
		// pack();
		setVisible(true);
	}

	private Point getInitialSize() {
		double RATE = 0.5;
		Rectangle rect = ge.getMaximumWindowBounds();
		return new Point((int) (rect.width * RATE), (int) (rect.height * RATE));
	}

	private Point getInitialPoint() {
		Point centerPoint = ge.getCenterPoint();
		Rectangle rect = ge.getMaximumWindowBounds();
		Point size = getInitialSize();
		return new Point((rect.width-size.x)/2, (rect.height-size.y)/2);
	}

}
