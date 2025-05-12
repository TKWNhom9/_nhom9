create database QuanLyBanHang_25A40418;
GO

USE QuanLyBanHang_25A4041883;
go
CREATE TABLE tblHang (
    MaHang NVARCHAR(10) PRIMARY KEY,
    TenHang NVARCHAR(50),
    MoTa NVARCHAR(300)
);
INSERT INTO tblHang (MaHang, TenHang, MoTa)
VALUES 
('H01', N'Gỗ êm', N'Gỗ êm bằng chất liệu bông, đa dạng màu sắc'),
('H02', N'Cốc thuỷ tinh', N'Cốc thuỷ tinh hình trái tim');