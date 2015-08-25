package com.hms.even.services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.hms.rpc.Service;

@Service
public class GetSchemas {
	public Response execute() {
		Response resp = new Response();
		Connection conn = null;
		try {
			List<String> list = new ArrayList<String>();
			conn = ConnectionProvider.getConnection();
			if (conn == null) {
				throw new RuntimeException();
			}
			ResultSet rs = conn.getMetaData().getCatalogs();
			while (rs.next()) {
				String schema = rs.getString(1);
				list.add(schema);
			}
			String[] schemas = (String[])list.toArray(new String[0]);
			resp.setSchemas(schemas);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return resp;
	}

	public static class Response {
		private String[] schemas;

		public String[] getSchemas() {
			return schemas;
		}

		public void setSchemas(String[] schemas) {
			this.schemas = schemas;
		}

	}
}
