-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2019 at 08:13 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `belajar_nodejs_socketio`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `coordinate` varchar(255) NOT NULL,
  `is_login` tinyint(1) NOT NULL,
  `image_link` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `city`, `coordinate`, `is_login`, `image_link`, `created`) VALUES
(1, 'Asep', 'Asep', 'Asep Hakim Saja', 'Depok', '-7.702048333333333,110.34499833333332', 1, 'http://lisasloane2.weebly.com/uploads/6/0/2/9/60297579/download_8.png?250', '2019-07-19 05:57:51'),
(2, 'Hakim', 'Hakim', 'Hakim Hakim Aja', 'Asmat', '-7.78205,110.34488000000002', 0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSspINMRnkc-15h-W1NfQJFHws04VLZJNj2wq5jzP9Ur59VSM373A', '2019-07-18 16:37:33'),
(3, 'lukman', 'lukman', 'Asep Asep Asep', 'Aceh', '-7.7520500000000006,110.34488000000002', 0, 'https://as1.ftcdn.net/jpg/01/96/11/40/500_F_196114029_bxrR9d8Qrvn6hNsCuU3f2bPkxmRd3hMU.jpg', '2019-07-18 15:39:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
