-- ============================================================
--  SICOT — DATOS INICIALES OFICIALES
--  Instituto Tecnológico Superior de la Sierra Norte de Puebla
--  (ITSSNP) — TecNM
--
--  Ejecutar DESPUÉS del script principal (evaluacion_docente_v3.sql)
--
--  Incluye:
--    · 11 carreras oficiales del ITSSNP
--    · Departamentos por área
--    · Usuario administrador: admin / admin
--    · 8 docentes reales (carga académica alumno 25100019)
--    · Alumno: CORTÉS MALDONADO ROBERTO — No. Control 25100019
--    · Periodo activo: ENE-JUN/26
--    · Grupos y materias de la carga académica
--    · Encuesta de tutoría activa con 17 preguntas
-- ============================================================

USE `sicot_evaluacion`;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
--  1. DEPARTAMENTOS
-- ============================================================
INSERT IGNORE INTO `departamento` (`id_depa`, `nombre`, `nombre_corto`) VALUES
(1,  'Ingeniería en Sistemas e Informática',            'INF'),
(2,  'Ingeniería Industrial y Manufactura',             'IND'),
(3,  'Ingeniería Agroindustrial y Ciencias Agropecuarias', 'AGR'),
(4,  'Ingeniería en Energías y Medio Ambiente',         'ENE'),
(5,  'Ingeniería en Logística y Transporte',            'LOG'),
(6,  'Ingeniería Electromecánica',                      'EMC'),
(7,  'Ingeniería Forestal y Recursos Naturales',        'FOR'),
(8,  'Gastronomía y Turismo',                           'GAS'),
(9,  'Ciencias Económico-Administrativas',              'CEA'),
(10, 'Ciencias Básicas y Humanidades',                  'CBH');


-- ============================================================
--  2. CARRERAS OFICIALES DEL ITSSNP
-- ============================================================
INSERT IGNORE INTO `carrera`
    (`id_carre`,`nombre`,`nombre_corto`,`letra`,`situacion`,
     `id_depa`,`id_jefe`,`id_nivel_estudio`,
     `fecha_inicio`,`fecha_terminacion`,`periodo_modulo`) VALUES
(1,  'Ingeniería en Agronomía',                        'IAGR',  'A', 1, 3, 1, 3, '2005-01-01','2099-12-31', 9),
(2,  'Ingeniería en Energías Renovables',              'IER',   'E', 1, 4, 1, 3, '2012-01-01','2099-12-31', 9),
(3,  'Ingeniería en Logística',                        'ILOG',  'L', 1, 5, 1, 3, '2010-01-01','2099-12-31', 9),
(4,  'Ingeniería Electromecánica',                     'IEM',   'M', 1, 6, 1, 3, '2008-01-01','2099-12-31', 9),
(5,  'Ingeniería Forestal',                            'IFOR',  'F', 1, 7, 1, 3, '2005-01-01','2099-12-31', 9),
(6,  'Ingeniería en Industrias Alimentarias',          'IIND',  'Q', 1, 3, 1, 3, '2005-01-01','2099-12-31', 9),
(7,  'Ingeniería en Innovación Agrícola Sustentable',  'IIAS',  'S', 1, 3, 1, 3, '2016-01-01','2099-12-31', 9),
(8,  'Ingeniería Informática',                         'INF',   'I', 1, 1, 1, 3, '2005-01-01','2099-12-31', 9),
(9,  'Ingeniería Industrial (Presencial)',              'IIP',   'P', 1, 2, 1, 3, '2005-01-01','2099-12-31', 9),
(10, 'Ingeniería Industrial (Mixta)',                  'IIM',   'X', 1, 2, 1, 3, '2015-01-01','2099-12-31', 9),
(11, 'Gastronomía',                                    'GAST',  'G', 1, 8, 1, 3, '2012-01-01','2099-12-31', 9),
(12, 'Contador Público',                               'CP',    'C', 1, 9, 1, 3, '2005-01-01','2099-12-31', 9);


-- ============================================================
--  3. USUARIO ADMINISTRADOR
--  Tabla especial para el admin del sistema
--  Usuario: admin  |  Contraseña: admin
--  SHA-256("admin") = 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
-- ============================================================
CREATE TABLE IF NOT EXISTS `usuario_admin` (
    `id_admin`      INT             NOT NULL AUTO_INCREMENT,
    `usuario`       VARCHAR(50)     NOT NULL,
    `nombre`        VARCHAR(80)     NOT NULL,
    `clave`         VARCHAR(64)     NOT NULL COMMENT 'SHA-256 de la contraseña',
    `activo`        TINYINT(1)      NOT NULL DEFAULT 1,
    `fecha_creacion` DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_admin`),
    UNIQUE KEY `uq_admin_usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `usuario_admin` (`id_admin`, `usuario`, `nombre`, `clave`, `activo`) VALUES
(1, 'admin', 'Administrador SICOT',
 '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 1);

-- ============================================================
--  NOTA para el backend (server.js):
--  En la ruta POST /api/auth/login, la validación del admin
--  debe quedar así:
--
--  const crypto = require("crypto")
--  const hashInput = crypto.createHash("sha256").update(password).digest("hex")
--  -- Consultar: SELECT * FROM usuario_admin WHERE usuario=? AND clave=? AND activo=1
-- ============================================================


-- ============================================================
--  4. PERIODO ESCOLAR ACTIVO: ENE-JUN/26
-- ============================================================
UPDATE `periodo_escolar` SET `situacion` = 0;

INSERT IGNORE INTO `periodo_escolar`
    (`id_perio`,`nombre`,`nombre_corto`,`situacion`,`inicio`,`fin`) VALUES
(2024, 'Agosto–Diciembre 2024', 'AGO-DIC24', 0, '2024-08-05','2024-12-20'),
(2025, 'Enero–Junio 2025',      'ENE-JUN25', 0, '2025-01-13','2025-06-27'),
(2026, 'Enero–Junio 2026',      'ENE-JUN26', 1, '2026-01-12','2026-06-26');

UPDATE `periodo_escolar` SET `situacion` = 1 WHERE `id_perio` = 2026;


-- ============================================================
--  5. DOCENTES REALES (carga académica del alumno 25100019)
--
--  Extraídos del kardex:
--   · L.I.    SILVERIO GARRIDO ELID              → id_doce = 101
--   · M.S.C.  HERNANDEZ JIMENEZ FRANCISCO        → id_doce = 102
--   · M.D.E   LEGUIZAMO HERNANDEZ MIRIAM         → id_doce = 103  ← TUTORA
--   · Lic.    CORTES MARQUEZ ABEL ABNER          → id_doce = 104
--   · DRA.    BARRIENTOS BONILLA NANCI           → id_doce = 105
--   · I.S.C.  LAZCANO RODRIGUEZ EMILIANO         → id_doce = 106
--   · M.A.    LOZANO QUINTERO MARIA DE JESUS     → id_doce = 107
-- ============================================================
INSERT IGNORE INTO `docente`
    (`id_doce`,`apellidos`,`nombre`,`genero`,`grado`,`num_nomina`,`vigente`,`id_depa`) VALUES
(101, 'SILVERIO GARRIDO',    'ELID',                   'F', 'L.I.',   20101, 1, 1),
(102, 'HERNANDEZ JIMENEZ',   'FRANCISCO',              'M', 'M.S.C.', 20102, 1, 10),
(103, 'LEGUIZAMO HERNANDEZ', 'MIRIAM',                 'F', 'M.D.E.', 20103, 1, 10),
(104, 'CORTES MARQUEZ',      'ABEL ABNER',             'M', 'Lic.',   20104, 1, 9),
(105, 'BARRIENTOS BONILLA',  'NANCI',                  'F', 'Dra.',   20105, 1, 9),
(106, 'LAZCANO RODRIGUEZ',   'EMILIANO',               'M', 'I.S.C.', 20106, 1, 1),
(107, 'LOZANO QUINTERO',     'MARIA DE JESUS',         'F', 'M.A.',   20107, 1, 1);


-- ============================================================
--  6. ALUMNO: CORTÉS MALDONADO ROBERTO
--  No. Control:  25100019
--  Carrera:      Ingeniería Informática (id_carre = 8)
--  Semestre:     2
--  Periodo:      ENE-JUN/26
--  Créditos:     28
--
--  Contraseña:   25100019  (mismo que número de control, práctica habitual)
--  SHA-256("25100019") = generado abajo
--
--  Si prefieres contraseña "1234":
--  SHA-256("1234") = 03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4
-- ============================================================

INSERT IGNORE INTO `alumno`
    (`num_control`,`a_paterno`,`a_materno`,`nombre`,
     `genero`,`f_nacimiento`,`curp`,
     `situacion`,`clave`,`semestre`,`id_carre`,
     `periodo_ingreso`,`correo_e`,
     `id_plan_estudio`,`id_modalidad_estudio`,`id_tipo_ingreso`,
     `id_bachillerato`,`id_especialidad_bach`,
     `promedio_bachillerato`,`anio_egreso_bachillerato`) VALUES
(25100019,
 'CORTÉS',        -- a_paterno
 'MALDONADO',     -- a_materno
 'ROBERTO',       -- nombre
 'M',
 '2006-01-01',    -- fecha nacimiento aproximada (ajustar con el real)
 'COMR060101HPLLBN00', -- CURP placeholder (ajustar con el real)
 1,               -- situacion = Regular
 -- SHA-256 de "1234" → contraseña inicial: 1234
 '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
 2,               -- semestre
 8,               -- id_carre = Ing. Informática
 2026,            -- periodo_ingreso ENE-JUN/26
 '25100019@itssnp.edu.mx',
 1, 1, 1, 1, 1,
 8.00,            -- promedio bachillerato (ajustar)
 2025             -- año egreso bachillerato
);


-- ============================================================
--  7. MATERIAS DE LA CARGA ACADÉMICA (semestre 2 — INF)
-- ============================================================
INSERT IGNORE INTO `materia`
    (`id_mate`,`nombre`,`nombre_corto`,`creditos`,
     `horas_teoria`,`horas_practica`,`unidades`,`id_depa`) VALUES
('INF-POO',  'Programación Orientada a Objetos',      'PROG.O.O.',    5, 3, 2, 4, 1),
('INF-FIS',  'Física Informática',                    'FÍS. INF.',    4, 3, 2, 4, 10),
('INF-TUT',  'Tutoría Grupal',                        'TUT. GRUPAL',  0, 1, 0, 0, 10),
('INF-CAL',  'Cálculo Integral',                      'CÁLC. INT.',   5, 4, 1, 4, 10),
('INF-CON',  'Contabilidad Financiera',               'CONT. FIN.',   4, 3, 2, 4, 9),
('INF-MAD',  'Matemáticas Discretas',                 'MAT. DISC.',   5, 4, 1, 4, 10),
('INF-ARF',  'Administración de Recursos Fondo Inf.', 'ADM. REC. FI', 5, 3, 2, 4, 1);


-- ============================================================
--  8. GRUPOS (periodo 2026, carrera INF semestre 2)
--  Grupo de tutoría: 1 tutor asignado (LEGUIZAMO HERNANDEZ MIRIAM)
-- ============================================================
INSERT IGNORE INTO `grupo`
    (`id_grupo`,`clave`,`cve_plan`,`cupo`,`inscritos`,`semestre`,
     `id_mate`,`id_doce`,`id_perio`,`id_carre`) VALUES
-- Tutoría grupal — Dra./M.D.E Leguizamo (tutora oficial)
(1001, 'IN2A', 'A', 35, 1, 2, 'INF-TUT', 103, 2026, 8),
-- Demás materias del semestre 2
(1002, 'IN2A', 'A', 35, 1, 2, 'INF-POO', 101, 2026, 8),  -- L.I. Silverio
(1003, 'IN2A', 'A', 35, 1, 2, 'INF-FIS', 102, 2026, 8),  -- M.S.C. Hernandez
(1004, 'IN2A', 'A', 35, 1, 2, 'INF-CAL', 104, 2026, 8),  -- Cortes Marquez
(1005, 'IN2A', 'A', 35, 1, 2, 'INF-CON', 105, 2026, 8),  -- Dra. Barrientos
(1006, 'IN2A', 'A', 35, 1, 2, 'INF-MAD', 106, 2026, 8),  -- I.S.C. Lazcano
(1007, 'IN2A', 'A', 35, 1, 2, 'INF-ARF', 107, 2026, 8);  -- M.A. Lozano


-- ============================================================
--  9. INSCRIPCIONES — ROBERTO en todos sus grupos
-- ============================================================
INSERT IGNORE INTO `inscripcion` (`num_control`,`id_grupo`,`id_perio`) VALUES
(25100019, 1001, 2026),  -- Tutoría Grupal — Leguizamo
(25100019, 1002, 2026),  -- Prog. O.O.      — Silverio
(25100019, 1003, 2026),  -- Física Inf.     — Hernandez
(25100019, 1004, 2026),  -- Cálculo Integ.  — Cortes Marquez
(25100019, 1005, 2026),  -- Contabilidad    — Barrientos
(25100019, 1006, 2026),  -- Mat. Discretas  — Lazcano
(25100019, 1007, 2026);  -- Admon. Rec.     — Lozano


-- ============================================================
--  10. ENCUESTA DE TUTORÍA ACTIVA — ENE-JUN/26
-- ============================================================
-- Desactivar encuestas anteriores del tipo Tutoría
UPDATE `encuesta` SET `activa` = 0 WHERE `id_tipo_encuesta` = 2;

-- Eliminar preguntas previas de la encuesta 1 si ya existen
-- (para poder llamar al SP limpiamente)
DELETE FROM `pregunta` WHERE `id_encuesta` = 1;
DELETE FROM `encuesta` WHERE `id_encuesta` = 1;

INSERT INTO `encuesta`
    (`id_encuesta`,`nombre`,`descripcion`,`id_tipo_encuesta`,
     `id_perio`,`fecha_inicio`,`fecha_fin`,`activa`) VALUES
(1,
 'Evaluación de Tutores — ENE-JUN/26',
 'Encuesta oficial de evaluación al tutor asignado. Periodo Enero–Junio 2026. ITSSNP.',
 2, 2026,
 '2026-01-12 08:00:00',
 '2026-06-26 23:59:59',
 1);

-- Generar las 17 preguntas oficiales usando el stored procedure
CALL sp_GenerarPreguntasTutoria(1);


-- ============================================================
--  11. VERIFICACIÓN FINAL
-- ============================================================
SELECT '========================================' AS info
UNION ALL SELECT 'VERIFICACIÓN DE DATOS INICIALES — SICOT'
UNION ALL SELECT '========================================';

SELECT 'departamentos'    AS tabla, COUNT(*) AS total FROM departamento
UNION ALL SELECT 'carreras',        COUNT(*) FROM carrera
UNION ALL SELECT 'docentes',        COUNT(*) FROM docente
UNION ALL SELECT 'usuario_admin',   COUNT(*) FROM usuario_admin
UNION ALL SELECT 'alumnos',         COUNT(*) FROM alumno
UNION ALL SELECT 'periodos',        COUNT(*) FROM periodo_escolar
UNION ALL SELECT 'materias',        COUNT(*) FROM materia
UNION ALL SELECT 'grupos',          COUNT(*) FROM grupo
UNION ALL SELECT 'inscripciones',   COUNT(*) FROM inscripcion
UNION ALL SELECT 'encuestas',       COUNT(*) FROM encuesta
UNION ALL SELECT 'preguntas',       COUNT(*) FROM pregunta
UNION ALL SELECT 'categorias',      COUNT(*) FROM categoria
UNION ALL SELECT 'rubrica',         COUNT(*) FROM rubrica;

-- Confirmar alumno y su tutor asignado
SELECT
    a.num_control,
    a.nombre_completo           AS alumno,
    c.nombre                    AS carrera,
    a.semestre,
    pe.nombre                   AS periodo,
    CONCAT(d.grado,' ',d.apellidos,' ',d.nombre) AS tutor_asignado,
    m.nombre                    AS materia_tutoria,
    g.clave                     AS grupo
FROM alumno a
JOIN carrera c          ON c.id_carre  = a.id_carre
JOIN inscripcion i      ON i.num_control = a.num_control
JOIN grupo g            ON g.id_grupo  = i.id_grupo
JOIN materia m          ON m.id_mate   = g.id_mate
JOIN docente d          ON d.id_doce   = g.id_doce
JOIN periodo_escolar pe ON pe.id_perio = i.id_perio
WHERE a.num_control = 25100019
  AND m.id_mate = 'INF-TUT';

-- Confirmar carga académica completa del alumno
SELECT
    a.num_control,
    m.nombre                    AS asignatura,
    CONCAT(d.grado,' ',d.apellidos,' ',d.nombre) AS docente,
    g.clave                     AS grupo,
    m.creditos
FROM alumno a
JOIN inscripcion i   ON i.num_control = a.num_control
JOIN grupo g         ON g.id_grupo   = i.id_grupo
JOIN materia m       ON m.id_mate    = g.id_mate
JOIN docente d       ON d.id_doce    = g.id_doce
WHERE a.num_control = 25100019
  AND i.id_perio    = 2026
ORDER BY m.nombre;

-- Confirmar usuario admin
SELECT id_admin, usuario, nombre,
       IF(activo=1,'ACTIVO','INACTIVO') AS estado
FROM usuario_admin;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
--  CREDENCIALES DE ACCESO AL SISTEMA
-- ============================================================
-- ┌─────────────────────────────────────────────────────────┐
-- │  ADMINISTRADOR                                          │
-- │    Usuario:    admin                                    │
-- │    Contraseña: admin                                    │
-- ├─────────────────────────────────────────────────────────┤
-- │  ALUMNO DE PRUEBA                                       │
-- │    No. Control: 25100019                                │
-- │    Nombre:      CORTÉS MALDONADO ROBERTO                │
-- │    Carrera:     Ingeniería Informática — Semestre 2     │
-- │    Contraseña:  1234                                    │
-- │    Tutora:      M.D.E. LEGUIZAMO HERNANDEZ MIRIAM       │
-- └─────────────────────────────────────────────────────────┘
-- ============================================================
--  FIN DEL SCRIPT DE DATOS INICIALES
-- ============================================================
