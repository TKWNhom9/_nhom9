using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace QuanLyBanHang_25A4041883
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            try
            {
                Dao.Connect();
                ///Load data to GritView
                LoadDataToGridView();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
        private void LoadDataToGridView()
        {
            string sql = "select * from tblHang";
            DataTable dt = new DataTable();
            dt = Dao.LoadDataToTable(sql);
            dataGridView1.DataSource = dt;

        }

        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (dataGridView1.Rows.Count > 0)
            {
                txtMaHang.Text = dataGridView1.CurrentRow.Cells[0].Value.ToString();
                txtTenHang.Text = dataGridView1.CurrentRow.Cells[1].Value.ToString();
                txtMoTaHang.Text = dataGridView1.CurrentRow.Cells[2].Value.ToString();
                txtMaHang.Enabled = false;
                btnSua.Enabled = true;
                btnXoa.Enabled = true;
                btnHuy.Enabled = true;
            }
        }

        private void btnThem_Click(object sender, EventArgs e)
        {
            clear();
            btnHuy.Enabled = true;
            btnXoa.Enabled = false;
            btnSua.Enabled = false;
            txtMaHang.Enabled = true;
        }
        private void clear()
        {
            txtMaHang.Text = "";
            txtTenHang.Text = "";
            txtMoTaHang.Text = "";
        }

        private void btnSua_Click(object sender, EventArgs e)
        {
            //check data
            if (txtMaHang.Text == "")
            {
                MessageBox.Show("Chua chon du lieu de sua");
                return;
            }
            // check tên hàng, mô tả không duoc de trong
            if (string.IsNullOrWhiteSpace(txtTenHang.Text))
            {
                MessageBox.Show("Tên hàng không được để trống");
                return;
            }

            if (string.IsNullOrWhiteSpace(txtMoTaHang.Text))
            {
                MessageBox.Show("Mô tả không được để trống");
                return;
            }
            string sql = "update tblHang set TenHang = N'" + txtTenHang.Text.Trim() + "', " + "MoTa = N'" + txtMoTaHang.Text.Trim() + "' where MaHang = N'" + txtMaHang.Text.Trim() + "'";
            SqlCommand cmd = new SqlCommand(sql, Dao.conn);
            try
            {
                cmd.ExecuteNonQuery();
                LoadDataToGridView();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void btnLuu_Click(object sender, EventArgs e)
        {
            if (txtMaHang.Text == "" || txtTenHang.Text == "" || txtMoTaHang.Text == "")
            {
                MessageBox.Show("Bạn phải nhập đầy đủ thông tin");
                return;
            }

            string sqlCheck = "SELECT MaHang FROM tblHang WHERE MaHang = N'" + txtMaHang.Text.Trim() + "'";
            if (Dao.CheckKey(sqlCheck))
            {
                MessageBox.Show("Mã hàng đã tồn tại, vui lòng nhập mã khác!");
                txtMaHang.Focus();
                return;
            }

            string sqlInsert = "INSERT INTO tblHang VALUES(N'" + txtMaHang.Text.Trim() + "', N'" + txtTenHang.Text.Trim() + "', N'" + txtMoTaHang.Text.Trim() + "')";
            Dao.RunSql(sqlInsert);
            LoadDataToGridView();
            clear();
        }

        private void btnXoa_Click(object sender, EventArgs e)
        {
            if (txtMaHang.Text == "")
            {
                MessageBox.Show("Bạn cần chọn bản ghi để xóa");
                return;
            }

            DialogResult dr = MessageBox.Show("Bạn có chắc muốn xóa không?", "Xác nhận", MessageBoxButtons.YesNo);
            if (dr == DialogResult.Yes)
            {
                string sql = "DELETE FROM tblHang WHERE MaHang = N'" + txtMaHang.Text.Trim() + "'";
                Dao.RunSql(sql);
                LoadDataToGridView();
                clear();
            }
        }

        private void btnHuy_Click(object sender, EventArgs e)
        {
            clear();
            txtMaHang.Enabled = true;
        }

        private void btnThoat_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Bạn có chắc chắn muốn thoát?", "Xác nhận", MessageBoxButtons.YesNo) == DialogResult.Yes)
            {
                Application.Exit();
            }
        }
    }
}
