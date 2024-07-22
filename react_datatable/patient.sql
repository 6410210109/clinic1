-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 22, 2024 at 08:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `patient`
--

-- --------------------------------------------------------

--
-- Table structure for table `patient_details`
--

CREATE TABLE `patient_details` (
  `patient_id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `status` tinyint(10) DEFAULT NULL,
  `HN` int(9) DEFAULT NULL,
  `title` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patient_details`
--

INSERT INTO `patient_details` (`patient_id`, `first_name`, `last_name`, `gender`, `status`, `HN`, `title`) VALUES
(10002, 'ืnammy', 'kanok', 'female', 0, 994792857, 'ms'),
(11, 'david', 'miller', 'Female', 1, 630458572, 'นางสาว'),
(13, 'michael', 'brown', 'Male', 1, 569319470, 'ด.ญ'),
(15, 'rogers', 'chrishaydon', 'Female', 1, 142943061, 'นาย'),
(16, 'morgan', 'wright', 'Male', 1, 204174471, 'นางสาว'),
(10005, 'asd', 'sad', 'sadsad', 0, 994792860, 'sada'),
(10006, 'golf', 'set', 'male', 0, 994792861, 'mr'),
(10001, 'tonthan', 'maprasit', 'male', 0, 994792856, 'mr'),
(21, 'miller', 'michael', 'Male', 1, 955949841, 'นาย'),
(22, 'ross', 'rogers', 'Female', 1, 473978873, 'นาง'),
(23, 'brooks', 'mike', 'Male', 1, 502044873, 'นางสาว'),
(24, 'miller', 'daniel', 'Male', 1, 88287778, 'ด.ช'),
(10003, 'ton', 'than', 'eiei', 0, 994792858, 'mee'),
(26, 'wright', 'smith', 'Female', 1, 411658199, 'ด.ช'),
(27, 'david', 'morgan', 'Male', 1, 252378127, 'นางสาว'),
(28, 'smith', 'bell', 'Female', 1, 26916069, 'ด.ช'),
(30, 'michael', 'james', 'Female', 1, 806481806, 'ด.ช'),
(31, 'michael', 'sanders', 'Female', 1, 900071071, 'นาย'),
(32, 'john', 'rivera', 'Female', 1, 80909968, 'นาย'),
(33, 'paul', 'michael', 'Male', 1, 704336658, 'นาง'),
(34, 'ross', 'mark', 'Female', 1, 278953419, 'ด.ช'),
(35, 'brooks', 'smith', 'Female', 1, 281757151, 'นาง'),
(36, 'cooper', 'brown', 'Female', 1, 571925527, 'นางสาว'),
(37, 'ross', 'daniel', 'Male', 1, 14356217, 'นาง'),
(38, 'cooper', 'miller', 'Male', 1, 356004533, 'ด.ญ'),
(39, 'jenny09', 'maria', 'Female', 1, 736954047, 'ด.ญ'),
(40, 'paul', 'rivera', 'Female', 1, 616756665, 'นางสาว'),
(10004, 'play', '123', 't', 0, 994792859, 'tn'),
(42, 'bell', 'david', 'Female', 1, 514336111, 'นาง'),
(43, 'rivera', 'cooper', 'Male', 1, 952916942, 'นาง'),
(44, 'mark', 'david', 'Female', 1, 221576408, 'ด.ญ'),
(45, 'paul', 'cooper', 'Male', 1, 249131246, 'นางสาว'),
(46, 'brooks', 'david', 'Male', 1, 580927038, 'ด.ญ'),
(47, 'james', 'maria', 'Male', 1, 157241481, 'ด.ญ'),
(48, 'john', 'mark', 'Female', 1, 43426323, 'ด.ช'),
(49, 'rivera', 'jenny09', 'Female', 1, 745407204, 'นาย'),
(50, 'chrishaydon', 'sanders', 'Female', 1, 596757083, 'ด.ญ'),
(51, 'bell', 'david', 'Female', 1, 747563834, 'นางสาว'),
(52, 'morris', 'brooks', 'Female', 1, 947547954, 'นาง'),
(53, 'cooper', 'mark', 'Male', 1, 495048298, 'นาย'),
(54, 'james', 'brooks', 'Male', 1, 632597657, 'นางสาว'),
(55, 'brooks', 'morris', 'Male', 1, 677843424, 'นางสาว'),
(56, 'morgan', 'sanders', 'Female', 1, 491424179, 'ด.ญ'),
(57, 'rivera', 'cooper', 'Female', 1, 423590653, 'นาย'),
(58, 'bell', 'john', 'Female', 1, 643680763, 'ด.ช'),
(59, 'wright', 'brown', 'Male', 1, 947631884, 'ด.ช'),
(60, 'wright', 'sanders', 'Male', 1, 807117163, 'ด.ช'),
(61, 'smith', 'michael', 'Female', 1, 192690192, 'ด.ช'),
(62, 'bell', 'rivera', 'Male', 1, 542099506, 'นาง'),
(63, 'rivera', 'david', 'Female', 1, 132426982, 'ด.ช'),
(64, 'brooks', 'wright', 'Male', 1, 35836426, 'นางสาว'),
(65, 'chrishaydon', 'brown', 'Male', 1, 781901214, 'นาง'),
(66, 'michael', 'sanders', 'Male', 1, 801996826, 'ด.ญ'),
(67, 'daniel', 'mark', 'Female', 1, 664280515, 'นางสาว'),
(68, 'bell', 'michael', 'Male', 1, 915412131, 'นาง'),
(69, 'brown', 'bell', 'Female', 1, 584219141, 'ด.ญ'),
(70, 'rogers', 'john', 'Male', 1, 174859343, 'นาง'),
(71, 'paul', 'smith', 'Female', 1, 121639322, 'ด.ญ'),
(72, 'john', 'ross', 'Male', 1, 83618613, 'นาง'),
(73, 'wright', 'brooks', 'Male', 1, 53175132, 'ด.ญ'),
(74, 'brooks', 'brown', 'Male', 1, 15019852, 'นาง'),
(75, 'brown', 'morgan', 'Male', 1, 915573895, 'ด.ญ'),
(76, 'chrishaydon', 'brown', 'Male', 1, 532809951, 'นาง'),
(77, 'mark', 'smith', 'Female', 1, 917328102, 'นาง'),
(78, 'brooks', 'ross', 'Male', 1, 988210687, 'ด.ญ'),
(79, 'jenny09', 'morris', 'Male', 1, 189069160, 'นาย'),
(80, 'morgan', 'maria', 'Female', 1, 980713770, 'นางสาว'),
(81, 'rogers', 'brooks', 'Male', 1, 336361402, 'นาง'),
(82, 'rivera', 'brown', 'Male', 1, 739665733, 'นางสาว'),
(83, 'wright', 'maria', 'Female', 1, 689244488, 'นางสาว'),
(84, 'mike', 'brooks', 'Female', 1, 227225274, 'ด.ช'),
(85, 'sanders', 'mike', 'Male', 1, 68392938, 'ด.ช'),
(86, 'james', 'jenny09', 'Male', 1, 660288900, 'นางสาว'),
(87, 'jenny09', 'bell', 'Female', 1, 96265717, 'นาย'),
(88, 'chrishaydon', 'mark', 'Male', 1, 500461915, 'นาย'),
(89, 'sanders', 'chrishaydon', 'Male', 1, 213512458, 'นาย'),
(90, 'bell', 'paul', 'Female', 1, 566176573, 'นาย'),
(91, 'michael', 'maria', 'Male', 1, 190345523, 'นาย'),
(92, 'brown', 'paul', 'Male', 1, 253197926, 'ด.ญ'),
(93, 'john', 'ross', 'Female', 1, 694953093, 'นาย'),
(94, 'morris', 'chrishaydon', 'Female', 1, 715171716, 'นาย'),
(95, 'wright', 'brown', 'Male', 1, 490999335, 'นางสาว'),
(96, 'miller', 'morris', 'Male', 1, 309481559, 'ด.ช'),
(97, 'chrishaydon', 'morgan', 'Male', 1, 74409821, 'นาย'),
(98, 'cooper', 'maria', 'Female', 1, 443604457, 'ด.ญ'),
(99, 'miller', 'cooper', 'Female', 1, 994792855, 'ด.ช'),
(100, 'bell', 'mike', 'Female', 1, 643150934, 'นางสาว');

-- --------------------------------------------------------

--
-- Table structure for table `queue`
--

CREATE TABLE `queue` (
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `status` tinyint(10) DEFAULT NULL,
  `HN` int(9) DEFAULT NULL,
  `title` varchar(20) DEFAULT NULL,
  `queue_no` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `queue`
--

INSERT INTO `queue` (`first_name`, `last_name`, `gender`, `status`, `HN`, `title`, `queue_no`) VALUES
('david', 'miller', NULL, 0, 630458572, NULL, 4),
('ืnammy', 'kanok', NULL, 0, 994792857, NULL, 6),
('ton', 'than', NULL, 0, 994792858, NULL, 8),
('play', '123', NULL, 0, 994792859, NULL, 9),
('asd', 'sad', NULL, 0, 994792860, NULL, 10),
('golf', 'set', NULL, 0, 994792861, NULL, 11);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `id` int(10) NOT NULL,
  `accessToken` varchar(255) DEFAULT NULL,
  `role_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `id`, `accessToken`, `role_id`) VALUES
('than', 'golf', 1, 'f468915e3d9f286a77ccb3f992336825', 1),
('golf', 'than', 2, '682cd3fe74feb4ff0768a5dc8e57dc75', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patient_details`
--
ALTER TABLE `patient_details`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `queue`
--
ALTER TABLE `queue`
  ADD PRIMARY KEY (`queue_no`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patient_details`
--
ALTER TABLE `patient_details`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10007;

--
-- AUTO_INCREMENT for table `queue`
--
ALTER TABLE `queue`
  MODIFY `queue_no` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
