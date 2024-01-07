-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2024 at 02:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2207118_m_dzikri_gumilang_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_keuangan_dzikri`
--

CREATE TABLE `transaksi_keuangan_dzikri` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `amount` bigint(20) NOT NULL,
  `status` enum('Debit','Kredit') NOT NULL,
  `receiver` varchar(50) NOT NULL,
  `jk` enum('L','P') NOT NULL,
  `no_telp` varchar(13) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi_keuangan_dzikri`
--

INSERT INTO `transaksi_keuangan_dzikri` (`id`, `date`, `description`, `amount`, `status`, `receiver`, `jk`, `no_telp`, `address`) VALUES
(1, '2023-12-01', 'Dana prodi pilkom', 7200000, 'Kredit', 'Diluc', 'L', '081234567891', 'Mondo'),
(2, '2023-12-05', 'Sewa auditorium', 4800000, 'Debit', 'Ningsih', 'P', '082233445566', 'Liyue'),
(3, '2023-12-10', 'Sewa gor badminton', 3600000, 'Kredit', 'Cici', 'P', '083821222015', 'Cina'),
(4, '2023-12-15', 'Sewa lapangan futsal', 1440000, 'Debit', 'Dennis', 'L', '088102300914', 'Depok'),
(30, '2024-01-09', 'Sewa sound system', 500000, 'Kredit', 'Raiden', 'P', '082763738212', 'Inazom'),
(32, '2023-11-08', 'Beli PS 5', 9000000, 'Kredit', 'Tatang', 'L', '089763839133', 'Natlan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transaksi_keuangan_dzikri`
--
ALTER TABLE `transaksi_keuangan_dzikri`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaksi_keuangan_dzikri`
--
ALTER TABLE `transaksi_keuangan_dzikri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
