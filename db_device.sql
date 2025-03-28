-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th2 23, 2025 lúc 12:21 PM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `db_device`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `assignments`
--

CREATE TABLE `assignments` (
  `id` int UNSIGNED NOT NULL,
  `incident_reports_id` int UNSIGNED NOT NULL,
  `assignment_time` timestamp NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completion_time` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `assignments`
--

INSERT INTO `assignments` (`id`, `incident_reports_id`, `assignment_time`, `description`, `completion_time`, `created_at`, `updated_at`) VALUES
(11, 5, '2025-02-19 09:09:44', 'vvd', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `buildings`
--

CREATE TABLE `buildings` (
  `id` int UNSIGNED NOT NULL,
  `building_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `buildings`
--

INSERT INTO `buildings` (`id`, `building_name`, `created_at`, `updated_at`) VALUES
(1, 'A1', '2025-02-18 23:42:07', '2025-02-18 23:42:07'),
(2, 'A2', '2025-02-18 23:42:07', '2025-02-18 23:42:07'),
(3, 'A3', '2025-02-18 23:42:07', '2025-02-18 23:42:07'),
(4, 'A4\r\n', '2025-02-18 23:42:07', '2025-02-18 23:42:07'),
(5, 'A5', '2025-02-18 23:42:07', '2025-02-18 23:42:07'),
(6, 'A6', '2025-02-18 23:42:07', '2025-02-18 23:42:07'),
(7, 'Arvid Towne', '2025-02-18 23:42:07', '2025-02-18 23:42:07'),
(8, 'Meredith Roob', '2025-02-18 23:42:07', '2025-02-18 23:42:07'),
(9, 'Dr. Maurice Reinger III', '2025-02-18 23:42:07', '2025-02-18 23:42:07'),
(10, 'Dangelo Ziemann', '2025-02-18 23:42:07', '2025-02-18 23:42:07'),
(11, 'Update', '2025-02-19 00:38:54', '2025-02-19 07:47:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `classrooms`
--

CREATE TABLE `classrooms` (
  `id` int UNSIGNED NOT NULL,
  `building_id` int UNSIGNED NOT NULL,
  `room_type_id` int UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `classrooms`
--

INSERT INTO `classrooms` (`id`, `building_id`, `room_type_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 3, 3, 'Van Hegmann Jr.', '2025-02-18 23:54:09', '2025-02-18 23:54:09'),
(2, 7, 4, 'Blaise Kessler', '2025-02-18 23:54:09', '2025-02-18 23:54:09'),
(3, 7, 3, 'Agnes Hintz', '2025-02-18 23:54:09', '2025-02-18 23:54:09'),
(4, 2, 3, 'Tia Blanda', '2025-02-18 23:54:09', '2025-02-18 23:54:09'),
(5, 8, 4, 'Reed Stanton', '2025-02-18 23:54:09', '2025-02-18 23:54:09'),
(6, 7, 3, 'Sonia Swaniawski', '2025-02-18 23:54:09', '2025-02-18 23:54:09'),
(7, 7, 3, 'Dr. Charlie Langworth V', '2025-02-18 23:54:09', '2025-02-18 23:54:09'),
(8, 7, 4, 'Cyril Kozey', '2025-02-18 23:54:09', '2025-02-18 23:54:09'),
(9, 3, 3, 'Guadalupe Weber', '2025-02-18 23:54:09', '2025-02-18 23:54:09'),
(10, 3, 3, 'Karianne Botsford MD', '2025-02-18 23:54:09', '2025-02-18 23:54:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `equipments`
--

CREATE TABLE `equipments` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `equipments`
--

INSERT INTO `equipments` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Miss Larissa Beer III', 'Nemo vitae soluta ad tempora rerum. Voluptatibus iste rerum eos. Alias autem eos veritatis animi ipsam dicta dolores id.', '2025-02-18 23:55:51', '2025-02-18 23:55:51'),
(2, 'Lindsey Emard V', 'Sed nobis quaerat deserunt earum quas. Sit quia eius deleniti odit laborum.', '2025-02-18 23:55:51', '2025-02-18 23:55:51'),
(3, 'Saul Swaniawski', 'Excepturi beatae nemo molestiae. Dignissimos voluptas mollitia fugit et ex error sit vero. Deserunt excepturi doloribus eos qui quasi. Quis non non doloribus esse corporis.', '2025-02-18 23:55:51', '2025-02-18 23:55:51'),
(4, 'Spencer Oberbrunner II', 'Sed dolores ut et dolorem magnam natus. Vitae accusamus ut aspernatur officia. Deserunt quaerat aut a recusandae dolor odio ullam.', '2025-02-18 23:55:51', '2025-02-18 23:55:51'),
(5, 'Adrain Harvey', 'Quaerat nisi iusto et dolor incidunt recusandae. Quo perferendis vero voluptatibus. Ut sit velit excepturi quisquam et. Et tempore possimus impedit nam ullam laudantium. Est omnis incidunt cumque.', '2025-02-18 23:55:51', '2025-02-18 23:55:51'),
(6, 'Mr. Doug Osinski', 'Aperiam natus dolorem sed vel incidunt et. Minus est excepturi tempora nihil sunt repellendus cumque. Ut quibusdam autem voluptas. Ab rerum sed voluptatem est possimus.', '2025-02-18 23:55:51', '2025-02-18 23:55:51'),
(7, 'Prof. Norwood Friesen IV', 'Illo modi magnam recusandae omnis officiis et voluptates quia. Et assumenda et totam eligendi quo similique non. Autem asperiores ducimus adipisci et vel doloribus odio.', '2025-02-18 23:55:51', '2025-02-18 23:55:51'),
(8, 'Mrs. Kaci Green III', 'Ad natus occaecati asperiores eum illo aut animi voluptas. Necessitatibus dolor perspiciatis eligendi aut. Eius reiciendis et ea quod.', '2025-02-18 23:55:51', '2025-02-18 23:55:51'),
(9, 'Tyshawn Haag', 'Itaque fugiat necessitatibus rerum ducimus deserunt aut dolorem. Velit quidem aut quo. Adipisci aliquid ut incidunt totam soluta quo sit quos. Illo sit veniam veritatis nisi illo.', '2025-02-18 23:55:51', '2025-02-18 23:55:51'),
(10, 'Natalia Jerde', 'Quam doloribus perferendis dolorem dolores impedit cupiditate expedita. Reiciendis velit accusantium non ipsam voluptas. Fugit sint id et quas.', '2025-02-18 23:55:51', '2025-02-18 23:55:51');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `equipment_classrooms`
--

CREATE TABLE `equipment_classrooms` (
  `id` int UNSIGNED NOT NULL,
  `equipment_id` int UNSIGNED NOT NULL,
  `classroom_id` int UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `equipment_classrooms`
--

INSERT INTO `equipment_classrooms` (`id`, `equipment_id`, `classroom_id`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 3, 6, 3, '2025-02-18 23:57:02', '2025-02-18 23:57:02'),
(2, 4, 9, 10, '2025-02-18 23:57:02', '2025-02-18 23:57:02'),
(3, 1, 10, 8, '2025-02-18 23:57:02', '2025-02-18 23:57:02'),
(4, 8, 6, 1, '2025-02-18 23:57:02', '2025-02-18 23:57:02'),
(5, 4, 1, 3, '2025-02-18 23:57:02', '2025-02-18 23:57:02'),
(6, 9, 9, 7, '2025-02-18 23:57:02', '2025-02-18 23:57:02'),
(7, 6, 10, 3, '2025-02-18 23:57:02', '2025-02-18 23:57:02'),
(8, 7, 8, 7, '2025-02-18 23:57:02', '2025-02-18 23:57:02'),
(9, 4, 1, 8, '2025-02-18 23:57:02', '2025-02-18 23:57:02'),
(10, 10, 2, 3, '2025-02-18 23:57:02', '2025-02-18 23:57:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `incident_reports`
--

CREATE TABLE `incident_reports` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `equipment_classroom_id` int UNSIGNED NOT NULL,
  `report_time` timestamp NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `incident_reports`
--

INSERT INTO `incident_reports` (`id`, `user_id`, `equipment_classroom_id`, `report_time`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 8, 10, '2024-06-17 19:55:28', 'Expedita omnis ut aut officia. Soluta ab quidem voluptatem quae corrupti incidunt. Consequatur ut sint odit vel ullam. Veritatis at iste sit dolor voluptatem qui.', 'cancelled', '2025-02-19 00:16:24', '2025-02-19 00:16:24'),
(2, 10, 4, '2025-01-09 20:54:36', 'Magni iste totam aut aut quod et. Optio et ipsam blanditiis temporibus. Id omnis quos iste facere. Omnis et non ratione aspernatur possimus.', 'pending', '2025-02-19 00:16:24', '2025-02-19 00:16:24'),
(3, 4, 10, '2024-06-09 08:32:03', 'Laboriosam ut culpa molestiae placeat quia quidem consequatur. Velit a nihil illum rerum nostrum sint. Tempore occaecati et reprehenderit quos natus eos est sit. Sed neque est voluptas eius.', 'pending', '2025-02-19 00:16:24', '2025-02-19 00:16:24'),
(4, 9, 9, '2024-12-20 00:02:20', 'Voluptatem fuga enim at laudantium. Consequatur itaque omnis tenetur ex. Omnis sit vitae aut molestiae. Necessitatibus aut ipsa temporibus.', 'cancelled', '2025-02-19 00:16:24', '2025-02-19 00:16:24'),
(5, 3, 7, '2024-11-29 23:46:15', 'Ea repellat consequuntur suscipit distinctio non sit sint. Quia occaecati architecto et accusamus veritatis.', 'pending', '2025-02-19 00:16:24', '2025-02-19 00:16:24'),
(6, 8, 5, '2024-10-31 07:22:32', 'Nulla earum dolorem nesciunt molestiae. Libero culpa inventore cupiditate vel et. Sequi quod eos sed alias eum velit. Consequatur vel pariatur qui enim.', 'pending', '2025-02-19 00:16:24', '2025-02-19 00:16:24'),
(7, 3, 1, '2024-10-13 02:45:58', 'Voluptates consequatur suscipit sapiente tempora. Est quo perspiciatis eius aut ducimus ut. Laboriosam voluptas quia eos. Non eum aliquid nam et natus deserunt possimus eum.', 'cancelled', '2025-02-19 00:16:24', '2025-02-19 00:16:24'),
(8, 2, 5, '2024-06-05 08:52:32', 'Reprehenderit aut odit molestiae aut fugiat. Quibusdam quidem qui ut sunt. Ad accusantium qui nam ut minus. Nihil qui autem doloremque aperiam.', 'pending', '2025-02-19 00:16:24', '2025-02-19 00:16:24'),
(9, 10, 5, '2024-06-16 04:31:12', 'Tempora repellendus libero quia et quia corporis qui. Itaque magni perspiciatis natus qui et impedit.', 'completed', '2025-02-19 00:16:24', '2025-02-19 00:16:24'),
(10, 7, 4, '2024-05-15 21:28:45', 'Nihil eaque accusantium autem quod iusto maiores. Autem ut impedit minima voluptas. Fugit sunt enim rerum quos. Doloremque qui debitis quo.', 'pending', '2025-02-19 00:16:24', '2025-02-19 00:16:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_02_19_012029_create_roles_table', 2),
(6, '2025_02_19_012651_create_repair_teams__table', 3),
(7, '2025_02_19_013218_create_assignments_table', 4),
(8, '2025_02_19_013449_create_assignment_users_table', 5),
(9, '2025_02_19_014409_create_buildings_table', 6),
(10, '2025_02_19_014536_create_room_types_table', 7),
(11, '2025_02_19_014704_create_classrooms_table', 8),
(12, '2025_02_19_014946_create_equipments_table', 9),
(13, '2025_02_19_015258_create_equipment_classrooms_table', 10),
(14, '2025_02_19_015559_create_incident_reports_table', 11),
(15, '2025_02_19_020303_add_columns_to_users_table', 12),
(16, '2025_02_19_155735_add_columns_to_assignments_table', 13);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `repair_teams`
--

CREATE TABLE `repair_teams` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `repair_teams`
--

INSERT INTO `repair_teams` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Ban sửa chữa THSP', '2025-02-18 20:23:18', '2025-02-18 20:23:18');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'quản trị', '2025-02-18 20:15:08', '2025-02-18 20:15:08'),
(2, 'user', 'Người dùng', '2025-02-18 20:15:08', '2025-02-18 20:15:08'),
(3, 'staff', 'Nhân viên sửa chữa thiết bị', '2025-02-18 20:15:08', '2025-02-18 20:15:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_types`
--

CREATE TABLE `room_types` (
  `id` int UNSIGNED NOT NULL,
  `room_type_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `room_types`
--

INSERT INTO `room_types` (`id`, `room_type_name`, `created_at`, `updated_at`) VALUES
(3, 'Phòng máy', '2025-02-18 23:48:02', '2025-02-18 23:48:02'),
(4, 'Phòng học', '2025-02-18 23:48:02', '2025-02-18 23:48:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `role_id` int UNSIGNED NOT NULL,
  `repair_team_id` int UNSIGNED DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `role_id`, `repair_team_id`, `username`, `name`, `email`, `phone`, `address`, `gender`, `avatar`, `password`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 'dennis.conn', 'Alia Gorczany', 'rozella.lebsack@bruen.net', '972.238.9622', '2369 Kling Hill\nJuleschester, HI 48729-3284', 'male', 'https://via.placeholder.com/640x480.png/005522?text=minus', 'f~8bM+c&(_', '2025-02-19 00:05:45', '2025-02-19 00:05:45'),
(2, 3, 1, 'smith.seth', 'Gust Gulgowski', 'lacy.douglas@leuschke.com', '1-337-347-9603', '909 Rae Trafficway Apt. 800\nEast Marcelle, GA 21420-8867', 'male', 'https://via.placeholder.com/640x480.png/00cc33?text=et', 'o_LH|~y*ZxJ<2X', '2025-02-19 00:05:45', '2025-02-19 00:05:45'),
(3, 3, 1, 'rosario35', 'Ms. Mazie Stiedemann DDS', 'qoconner@yahoo.com', '+1 (281) 401-6642', '309 Samanta Corners\nPort Summerhaven, KS 96242-5601', 'female', 'https://via.placeholder.com/640x480.png/00bb33?text=odit', 'lBz>Jq,@(}rAC', '2025-02-19 00:05:45', '2025-02-19 00:05:45'),
(4, 2, 1, 'arden.ziemann', 'Delores Jerde', 'roxane.gaylord@bahringer.net', '+1 (580) 680-1162', '7849 Rafael Oval\nWest Bernadineview, IA 09726-0705', 'female', 'https://via.placeholder.com/640x480.png/0011ee?text=qui', 'e+h4.r{+i', '2025-02-19 00:05:45', '2025-02-19 00:05:45'),
(5, 1, 1, 'bergnaum.lauriane', 'Howell Gerhold', 'wendy81@murphy.org', '+1.215.790.0872', '29285 Simonis Estate Suite 448\nNorth Monserrat, ND 05118', 'female', 'https://via.placeholder.com/640x480.png/0055ee?text=voluptate', 'KI_uI$f+', '2025-02-19 00:05:45', '2025-02-19 00:05:45'),
(6, 1, 1, 'jovany.johnson', 'Zion Stokes', 'lbuckridge@tromp.com', '+1.806.707.7336', '3481 Gleichner Lake\nRaphaelleton, KY 21614-9246', 'female', 'https://via.placeholder.com/640x480.png/00ffaa?text=provident', 'Gr:qn\"n-:Y|{q[K', '2025-02-19 00:05:45', '2025-02-19 00:05:45'),
(7, 3, 1, 'norberto.mante', 'Lenny Murazik', 'gdicki@hintz.com', '(540) 562-2891', '700 Emie Prairie Apt. 934\nBayermouth, AZ 46921-2000', 'female', 'https://via.placeholder.com/640x480.png/0022ee?text=consequatur', 'AgqT4q+S$s.t_', '2025-02-19 00:05:45', '2025-02-19 00:05:45'),
(8, 3, 1, 'veronica.hoppe', 'Prof. Antonia Bartoletti', 'vincenza51@gmail.com', '1-762-440-1200', '971 Bonnie Course Apt. 047\nSwifthaven, SC 07786-8525', 'male', 'https://via.placeholder.com/640x480.png/007700?text=in', 's&Q,7u/_{Sc&:CA/4E/r', '2025-02-19 00:05:45', '2025-02-19 00:05:45'),
(9, 2, 1, 'tromp.madilyn', 'Dr. Carol Reichert V', 'spinka.blanca@gmail.com', '(713) 731-0907', '332 Zachary Village\nMorarfort, SD 03024-0594', 'female', 'https://via.placeholder.com/640x480.png/0022bb?text=illum', 'Al@pOv\"sGAeCu.?tZ-Cm', '2025-02-19 00:05:45', '2025-02-19 00:05:45'),
(10, 3, 1, 'lavada11', 'Daphne Wehner', 'leannon.sierra@hotmail.com', '+1.830.442.0292', '782 Sheldon Harbor Apt. 970\nLake Caesartown, MN 07851', 'female', 'https://via.placeholder.com/640x480.png/00aa77?text=velit', 'R\'\\:8%0#=%\\=', '2025-02-19 00:05:45', '2025-02-19 00:05:45');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignments_incident_reports_id_foreign` (`incident_reports_id`);

--
-- Chỉ mục cho bảng `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `classrooms`
--
ALTER TABLE `classrooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `classrooms_building_id_foreign` (`building_id`),
  ADD KEY `classrooms_room_type_id_foreign` (`room_type_id`);

--
-- Chỉ mục cho bảng `equipments`
--
ALTER TABLE `equipments`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `equipment_classrooms`
--
ALTER TABLE `equipment_classrooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipment_classrooms_equipment_id_foreign` (`equipment_id`),
  ADD KEY `equipment_classrooms_classroom_id_foreign` (`classroom_id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `incident_reports`
--
ALTER TABLE `incident_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `incident_reports_user_id_foreign` (`user_id`),
  ADD KEY `incident_reports_equipment_classroom_id_foreign` (`equipment_classroom_id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `repair_teams`
--
ALTER TABLE `repair_teams`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`),
  ADD KEY `users_repair_team_id_foreign` (`repair_team_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `buildings`
--
ALTER TABLE `buildings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `classrooms`
--
ALTER TABLE `classrooms`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `equipments`
--
ALTER TABLE `equipments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `equipment_classrooms`
--
ALTER TABLE `equipment_classrooms`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `incident_reports`
--
ALTER TABLE `incident_reports`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `repair_teams`
--
ALTER TABLE `repair_teams`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_incident_reports_id_foreign` FOREIGN KEY (`incident_reports_id`) REFERENCES `incident_reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `classrooms`
--
ALTER TABLE `classrooms`
  ADD CONSTRAINT `classrooms_building_id_foreign` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `classrooms_room_type_id_foreign` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `equipment_classrooms`
--
ALTER TABLE `equipment_classrooms`
  ADD CONSTRAINT `equipment_classrooms_classroom_id_foreign` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_classrooms_equipment_id_foreign` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `incident_reports`
--
ALTER TABLE `incident_reports`
  ADD CONSTRAINT `incident_reports_equipment_classroom_id_foreign` FOREIGN KEY (`equipment_classroom_id`) REFERENCES `equipment_classrooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `incident_reports_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_repair_team_id_foreign` FOREIGN KEY (`repair_team_id`) REFERENCES `repair_teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
