using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace QuanLyBanHang_25A4041883
{
    internal class Dao
    {
        public static SqlConnection conn;
        public static string ConnectionString = "Data Source=NGOCANH\\SQLEXPRESS;Initial Catalog=QuanLyBanHang_25A4041883;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        public static void Connect()
        {
            conn = new SqlConnection(ConnectionString);
            try
            {
                if (conn.State == ConnectionState.Closed)
                    conn.Open();
            }
            catch (Exception exx)
            {
                throw exx;
            }
        }
        public static void Close()
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
        }
        public static DataTable LoadDataToTable(string sql)
        {
            DataTable dt = new DataTable();
            SqlDataAdapter adapter = new SqlDataAdapter(sql, conn);
            adapter.Fill(dt);
            return dt;
        }

        public static bool CheckKey(string sql)
        {
            SqlCommand cmd = new SqlCommand(sql, Dao.conn);
            SqlDataReader reader = cmd.ExecuteReader();
            bool hasRows = reader.HasRows;
            reader.Close();
            return hasRows;
        }
        public static void RunSql(string sql)
        {
            SqlCommand cmd = new SqlCommand();
            Connect();
            cmd.Connection = conn;
            cmd.CommandText = sql;
            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Lỗi: " + ex.Message);
            }
        }
    }
}

