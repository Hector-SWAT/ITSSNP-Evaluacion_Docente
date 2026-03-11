-- ============================================================
--  SISTEMA DE EVALUACIÓN DOCENTE / TUTORÍA — SICOT
--  v3.0  |  MySQL 8.0+  |  Compatible con phpMyAdmin
--  Dashboard: por docente, por periodo, alumnos pendientes
--  Pautas de integridad para encuesta sin errores
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
--  Crear y seleccionar la base de datos
-- ------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `sicot_evaluacion`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `sicot_evaluacion`;

-- ============================================================
--  1. TABLAS BASE
-- ============================================================

-- ------------------------------------------------------------
--  Departamento
-- ------------------------------------------------------------
CREATE TABLE `departamento` (
    `id_depa`       SMALLINT        NOT NULL,
    `nombre`        VARCHAR(60)     NOT NULL,
    `nombre_corto`  VARCHAR(20)     NOT NULL,
    PRIMARY KEY (`id_depa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Carrera
-- ------------------------------------------------------------
CREATE TABLE `carrera` (
    `id_carre`          TINYINT UNSIGNED    NOT NULL,
    `nombre`            VARCHAR(70)         NOT NULL,
    `nombre_corto`      VARCHAR(25)         NOT NULL,
    `letra`             CHAR(2)             NULL,
    `situacion`         TINYINT             NOT NULL DEFAULT 1
                            COMMENT '1=Activa 0=Inactiva',
    `id_depa`           SMALLINT            NOT NULL,
    `id_jefe`           INT                 NOT NULL,
    `id_nivel_estudio`  TINYINT             NOT NULL,
    `fecha_inicio`      DATE                NOT NULL,
    `fecha_terminacion` DATE                NOT NULL,
    `periodo_modulo`    INT                 NOT NULL,
    PRIMARY KEY (`id_carre`),
    CONSTRAINT `fk_carrera_depa`
        FOREIGN KEY (`id_depa`) REFERENCES `departamento`(`id_depa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Docente  (también actúa como tutor)
-- ------------------------------------------------------------
CREATE TABLE `docente` (
    `id_doce`       INT             NOT NULL,
    `apellidos`     VARCHAR(30)     NOT NULL,
    `nombre`        VARCHAR(30)     NOT NULL,
    `genero`        CHAR(1)         NOT NULL,
    `grado`         VARCHAR(6)      NOT NULL  COMMENT 'Dr. M.C. Ing. Lic.',
    `num_nomina`    INT             NOT NULL,
    `vigente`       TINYINT(1)      NOT NULL DEFAULT 1,
    `id_depa`       SMALLINT        NULL,
    PRIMARY KEY (`id_doce`),
    CONSTRAINT `fk_docente_depa`
        FOREIGN KEY (`id_depa`) REFERENCES `departamento`(`id_depa`),
    CONSTRAINT `chk_docente_genero` CHECK (`genero` IN ('M','F','O'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Alumno
--  · Clave = hash SHA-256 de la contraseña SICOT (VARCHAR 64)
--  · NombreCompleto generado por columna virtual
-- ------------------------------------------------------------
CREATE TABLE `alumno` (
    `num_control`               INT             NOT NULL,
    `num_ficha`                 VARCHAR(9)      NULL,
    `a_paterno`                 VARCHAR(20)     NOT NULL,
    `a_materno`                 VARCHAR(20)     NOT NULL,
    `nombre`                    VARCHAR(25)     NOT NULL,
    `nombre_completo`           VARCHAR(70)
                                    GENERATED ALWAYS AS
                                    (CONCAT(`a_paterno`,' ',`a_materno`,' ',`nombre`))
                                    VIRTUAL,
    `genero`                    CHAR(1)         NOT NULL,
    `f_nacimiento`              DATE            NOT NULL,
    `curp`                      VARCHAR(18)     NOT NULL,
    `situacion`                 TINYINT         NOT NULL DEFAULT 1
                                    COMMENT '1=Regular 2=Irregular 3=Baja_temp 4=Baja_def 5=Egresado',
    `clave`                     VARCHAR(64)     NOT NULL
                                    COMMENT 'Hash SHA-256 contraseña SICOT',
    `semestre`                  TINYINT         NOT NULL,
    `id_carre`                  TINYINT UNSIGNED NOT NULL,
    `periodo_ingreso`           SMALLINT        NOT NULL,
    `correo_e`                  VARCHAR(255)    NULL,
    `periodo_egreso`            SMALLINT        NULL,
    `periodos_convalidados`     TINYINT         NOT NULL DEFAULT 0,
    `id_plan_estudio`           SMALLINT        NOT NULL,
    `id_modulo_especialidad`    SMALLINT        NULL,
    `id_modalidad_estudio`      TINYINT         NOT NULL,
    `id_tipo_ingreso`           TINYINT         NOT NULL,
    `id_bachillerato`           INT             NOT NULL,
    `id_especialidad_bach`      TINYINT         NOT NULL,
    `promedio_bachillerato`     DECIMAL(4,2)    NOT NULL,
    `anio_egreso_bachillerato`  SMALLINT        NOT NULL,
    PRIMARY KEY (`num_control`),
    UNIQUE KEY `uq_alumno_curp` (`curp`),
    CONSTRAINT `fk_alumno_carrera`
        FOREIGN KEY (`id_carre`) REFERENCES `carrera`(`id_carre`),
    CONSTRAINT `chk_alumno_genero`
        CHECK (`genero` IN ('M','F','O')),
    CONSTRAINT `chk_alumno_promedio`
        CHECK (`promedio_bachillerato` BETWEEN 0 AND 10),
    CONSTRAINT `chk_alumno_situacion`
        CHECK (`situacion` BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Periodo Escolar
-- ------------------------------------------------------------
CREATE TABLE `periodo_escolar` (
    `id_perio`          SMALLINT        NOT NULL,
    `nombre`            VARCHAR(25)     NOT NULL,
    `nombre_corto`      VARCHAR(10)     NOT NULL,
    `situacion`         TINYINT(1)      NOT NULL DEFAULT 0
                            COMMENT '1=Activo/En curso',
    `inicio`            DATE            NULL,
    `fin`               DATE            NULL,
    `inicio_vacaciones` DATE            NULL,
    `fin_vacaciones`    DATE            NULL,
    PRIMARY KEY (`id_perio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Materia
-- ------------------------------------------------------------
CREATE TABLE `materia` (
    `id_mate`           VARCHAR(10)     NOT NULL,
    `nombre`            VARCHAR(80)     NOT NULL,
    `nombre_corto`      VARCHAR(20)     NOT NULL,
    `creditos`          TINYINT         NOT NULL,
    `horas_teoria`      TINYINT         NOT NULL,
    `horas_practica`    TINYINT         NOT NULL,
    `unidades`          TINYINT         NOT NULL,
    `horas_curso`       SMALLINT        NULL,
    `id_depa`           SMALLINT        NULL,
    `objetivo`          TEXT            NULL,
    `caracterizacion`   TEXT            NULL,
    PRIMARY KEY (`id_mate`),
    CONSTRAINT `fk_materia_depa`
        FOREIGN KEY (`id_depa`) REFERENCES `departamento`(`id_depa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Grupo
-- ------------------------------------------------------------
CREATE TABLE `grupo` (
    `id_grupo`      INT             NOT NULL AUTO_INCREMENT,
    `clave`         VARCHAR(4)      NOT NULL,
    `cve_plan`      CHAR(1)         NOT NULL,
    `cupo`          TINYINT         NOT NULL,
    `inscritos`     TINYINT         NOT NULL DEFAULT 0,
    `semestre`      TINYINT         NULL,
    `hora_lun`      VARCHAR(8)      NOT NULL DEFAULT '',
    `aula_lun`      VARCHAR(4)      NOT NULL DEFAULT '',
    `hora_mar`      VARCHAR(8)      NOT NULL DEFAULT '',
    `aula_mar`      VARCHAR(4)      NOT NULL DEFAULT '',
    `hora_mie`      VARCHAR(8)      NOT NULL DEFAULT '',
    `aula_mie`      VARCHAR(4)      NOT NULL DEFAULT '',
    `hora_jue`      VARCHAR(8)      NOT NULL DEFAULT '',
    `aula_jue`      VARCHAR(4)      NOT NULL DEFAULT '',
    `hora_vie`      VARCHAR(8)      NOT NULL DEFAULT '',
    `aula_vie`      VARCHAR(4)      NOT NULL DEFAULT '',
    `hora_sab`      VARCHAR(8)      NOT NULL DEFAULT '',
    `aula_sab`      VARCHAR(4)      NOT NULL DEFAULT '',
    `aprobados`     TINYINT         NOT NULL DEFAULT 0,
    `reprobados`    TINYINT         NOT NULL DEFAULT 0,
    `desertores`    TINYINT         NOT NULL DEFAULT 0,
    `id_mate`       VARCHAR(10)     NULL,
    `id_doce`       INT             NULL,
    `id_perio`      SMALLINT        NULL,
    `id_carre`      TINYINT UNSIGNED NULL,
    `abierto`       TINYINT(1)      NOT NULL DEFAULT 1,
    `id_plan_estudio` INT           NULL,
    `vigente`       TINYINT(1)      NOT NULL DEFAULT 1,
    `folio_acta`    INT             NULL,
    PRIMARY KEY (`id_grupo`),
    CONSTRAINT `fk_grupo_materia`
        FOREIGN KEY (`id_mate`)  REFERENCES `materia`(`id_mate`),
    CONSTRAINT `fk_grupo_docente`
        FOREIGN KEY (`id_doce`)  REFERENCES `docente`(`id_doce`),
    CONSTRAINT `fk_grupo_periodo`
        FOREIGN KEY (`id_perio`) REFERENCES `periodo_escolar`(`id_perio`),
    CONSTRAINT `fk_grupo_carrera`
        FOREIGN KEY (`id_carre`) REFERENCES `carrera`(`id_carre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Inscripcion  (Alumno ↔ Grupo por periodo)
-- ------------------------------------------------------------
CREATE TABLE `inscripcion` (
    `id_inscripcion`    INT             NOT NULL AUTO_INCREMENT,
    `num_control`       INT             NOT NULL,
    `id_grupo`          INT             NOT NULL,
    `id_perio`          SMALLINT        NOT NULL,
    `fecha_alta`        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `activa`            TINYINT(1)      NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_inscripcion`),
    UNIQUE KEY `uq_inscripcion_alumno_grupo` (`num_control`, `id_grupo`),
    CONSTRAINT `fk_insc_alumno`
        FOREIGN KEY (`num_control`) REFERENCES `alumno`(`num_control`),
    CONSTRAINT `fk_insc_grupo`
        FOREIGN KEY (`id_grupo`)    REFERENCES `grupo`(`id_grupo`),
    CONSTRAINT `fk_insc_periodo`
        FOREIGN KEY (`id_perio`)    REFERENCES `periodo_escolar`(`id_perio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
--  2. MÓDULO DE ENCUESTA
-- ============================================================

-- ------------------------------------------------------------
--  TipoEncuesta  (Docente | Tutoría)
-- ------------------------------------------------------------
CREATE TABLE `tipo_encuesta` (
    `id_tipo_encuesta`  TINYINT         NOT NULL,
    `nombre`            VARCHAR(50)     NOT NULL,
    `descripcion`       VARCHAR(255)    NULL,
    PRIMARY KEY (`id_tipo_encuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Encuesta  (una por tipo + periodo)
-- ------------------------------------------------------------
CREATE TABLE `encuesta` (
    `id_encuesta`       INT             NOT NULL AUTO_INCREMENT,
    `nombre`            VARCHAR(100)    NOT NULL,
    `descripcion`       VARCHAR(255)    NULL,
    `id_tipo_encuesta`  TINYINT         NOT NULL,
    `id_perio`          SMALLINT        NOT NULL,
    `fecha_inicio`      DATETIME        NOT NULL,
    `fecha_fin`         DATETIME        NOT NULL,
    `activa`            TINYINT(1)      NOT NULL DEFAULT 1,
    `fecha_creacion`    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_encuesta`),
    CONSTRAINT `fk_encuesta_tipo`
        FOREIGN KEY (`id_tipo_encuesta`) REFERENCES `tipo_encuesta`(`id_tipo_encuesta`),
    CONSTRAINT `fk_encuesta_periodo`
        FOREIGN KEY (`id_perio`)         REFERENCES `periodo_escolar`(`id_perio`),
    -- No puede haber dos encuestas activas del mismo tipo en el mismo periodo
    UNIQUE KEY `uq_encuesta_tipo_periodo_activa` (`id_tipo_encuesta`, `id_perio`, `activa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Categoria  (9 criterios de la encuesta de tutoría)
-- ------------------------------------------------------------
CREATE TABLE `categoria` (
    `id_categoria`  TINYINT         NOT NULL AUTO_INCREMENT,
    `nombre`        VARCHAR(120)    NOT NULL,
    `descripcion`   VARCHAR(255)    NULL,
    `orden`         TINYINT         NOT NULL DEFAULT 1,
    `activa`        TINYINT(1)      NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Rubrica  (texto de la escala 1-5 por categoría)
-- ------------------------------------------------------------
CREATE TABLE `rubrica` (
    `id_rubrica`    INT             NOT NULL AUTO_INCREMENT,
    `id_categoria`  TINYINT         NOT NULL,
    `valor`         TINYINT         NOT NULL COMMENT '1=Deficiente … 5=Excelente',
    `etiqueta`      VARCHAR(20)     NOT NULL,
    `descripcion`   VARCHAR(255)    NOT NULL,
    PRIMARY KEY (`id_rubrica`),
    UNIQUE KEY `uq_rubrica_cat_valor` (`id_categoria`, `valor`),
    CONSTRAINT `fk_rubrica_categoria`
        FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id_categoria`),
    CONSTRAINT `chk_rubrica_valor`
        CHECK (`valor` BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  Pregunta  (reactivos ligados a encuesta + categoría)
-- ------------------------------------------------------------
CREATE TABLE `pregunta` (
    `id_pregunta`   SMALLINT        NOT NULL AUTO_INCREMENT,
    `id_encuesta`   INT             NOT NULL,
    `id_categoria`  TINYINT         NOT NULL,
    `texto`         VARCHAR(350)    NOT NULL,
    `tipo_respuesta` TINYINT        NOT NULL DEFAULT 1
                        COMMENT '1=Likert 1-5  2=Escala 1-10  3=Opción múltiple  4=Texto libre',
    `es_comentario` TINYINT(1)      NOT NULL DEFAULT 0
                        COMMENT '1=Pregunta abierta final (no calificable)',
    `orden`         TINYINT         NOT NULL DEFAULT 1,
    `requerida`     TINYINT(1)      NOT NULL DEFAULT 1,
    `activa`        TINYINT(1)      NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_pregunta`),
    CONSTRAINT `fk_pregunta_encuesta`
        FOREIGN KEY (`id_encuesta`)  REFERENCES `encuesta`(`id_encuesta`),
    CONSTRAINT `fk_pregunta_categoria`
        FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
--  3. TABLAS DE CONTROL DEL PROCESO DE ENCUESTA
--     (pautas para que la encuesta se conteste sin errores)
-- ============================================================

-- ------------------------------------------------------------
--  EvaluacionDocente  (cabecera: quién evalúa a quién / dónde)
--  · Estado controla el flujo: Iniciada → En proceso → Completada → Anulada
-- ------------------------------------------------------------
CREATE TABLE `evaluacion_docente` (
    `id_evaluacion` INT             NOT NULL AUTO_INCREMENT,
    `id_encuesta`   INT             NOT NULL,
    `num_control`   INT             NOT NULL  COMMENT 'Alumno evaluador',
    `id_doce`       INT             NOT NULL  COMMENT 'Docente/tutor evaluado',
    `id_grupo`      INT             NOT NULL,
    `id_perio`      SMALLINT        NOT NULL,
    `estado`        TINYINT         NOT NULL DEFAULT 1
                        COMMENT '1=Iniciada 2=En_proceso 3=Completada 4=Anulada',
    `pagina_actual` TINYINT         NOT NULL DEFAULT 1
                        COMMENT 'Última página alcanzada (para retomar)',
    `fecha_inicio`  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `fecha_fin`     DATETIME        NULL
                        COMMENT 'Se rellena al completar',
    `ip_origen`     VARCHAR(45)     NULL      COMMENT 'Auditoría',
    `user_agent`    VARCHAR(255)    NULL      COMMENT 'Auditoría navegador',
    PRIMARY KEY (`id_evaluacion`),
    -- Pauta clave: un alumno evalúa UNA SOLA VEZ al mismo docente/grupo/periodo
    UNIQUE KEY `uq_eval_alumno_doce_grupo_perio`
        (`num_control`, `id_doce`, `id_grupo`, `id_perio`),
    CONSTRAINT `fk_eval_encuesta`
        FOREIGN KEY (`id_encuesta`)  REFERENCES `encuesta`(`id_encuesta`),
    CONSTRAINT `fk_eval_alumno`
        FOREIGN KEY (`num_control`)  REFERENCES `alumno`(`num_control`),
    CONSTRAINT `fk_eval_docente`
        FOREIGN KEY (`id_doce`)      REFERENCES `docente`(`id_doce`),
    CONSTRAINT `fk_eval_grupo`
        FOREIGN KEY (`id_grupo`)     REFERENCES `grupo`(`id_grupo`),
    CONSTRAINT `fk_eval_periodo`
        FOREIGN KEY (`id_perio`)     REFERENCES `periodo_escolar`(`id_perio`),
    CONSTRAINT `chk_eval_estado`
        CHECK (`estado` BETWEEN 1 AND 4)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  RespuestaEvaluacion  (detalle: una fila por pregunta)
--  · Pauta: sólo se acepta calificacion en preguntas Likert/escala;
--           sólo comentario en preguntas texto libre
-- ------------------------------------------------------------
CREATE TABLE `respuesta_evaluacion` (
    `id_respuesta`  INT             NOT NULL AUTO_INCREMENT,
    `id_evaluacion` INT             NOT NULL,
    `id_pregunta`   SMALLINT        NOT NULL,
    `calificacion`  TINYINT         NULL
                        COMMENT 'Valores 1-5 para tipo_respuesta=1',
    `comentario`    TEXT            NULL
                        COMMENT 'Texto libre para tipo_respuesta=4 o comentario adicional',
    `fecha_resp`    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_respuesta`),
    -- Pauta: una sola respuesta por pregunta por evaluación
    UNIQUE KEY `uq_resp_eval_pregunta` (`id_evaluacion`, `id_pregunta`),
    CONSTRAINT `fk_resp_evaluacion`
        FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion_docente`(`id_evaluacion`)
            ON DELETE CASCADE,
    CONSTRAINT `fk_resp_pregunta`
        FOREIGN KEY (`id_pregunta`)   REFERENCES `pregunta`(`id_pregunta`),
    CONSTRAINT `chk_resp_calificacion`
        CHECK (`calificacion` IS NULL OR `calificacion` BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  LogAccesoEncuesta  (auditoría de intentos de acceso)
--  · Detecta intentos de doble envío / acceso fuera de fecha
-- ------------------------------------------------------------
CREATE TABLE `log_acceso_encuesta` (
    `id_log`        INT             NOT NULL AUTO_INCREMENT,
    `num_control`   INT             NOT NULL,
    `id_encuesta`   INT             NOT NULL,
    `id_doce`       INT             NULL,
    `accion`        VARCHAR(30)     NOT NULL
                        COMMENT 'INICIO|GUARDADO|COMPLETADO|INTENTO_DUPLICADO|FUERA_FECHA|ANULADO',
    `detalle`       VARCHAR(255)    NULL,
    `ip_origen`     VARCHAR(45)     NULL,
    `fecha_hora`    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_log`),
    KEY `idx_log_alumno` (`num_control`),
    KEY `idx_log_encuesta` (`id_encuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ------------------------------------------------------------
--  SesionAlumno  (login SICOT con token JWT)
-- ------------------------------------------------------------
CREATE TABLE `sesion_alumno` (
    `id_sesion`     INT             NOT NULL AUTO_INCREMENT,
    `num_control`   INT             NOT NULL,
    `fecha_hora`    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ip_origen`     VARCHAR(45)     NULL,
    `activa`        TINYINT(1)      NOT NULL DEFAULT 1,
    `token`         VARCHAR(512)    NULL      COMMENT 'JWT',
    `fecha_expira`  DATETIME        NULL,
    PRIMARY KEY (`id_sesion`),
    KEY `idx_sesion_alumno_activa` (`num_control`, `activa`),
    CONSTRAINT `fk_sesion_alumno`
        FOREIGN KEY (`num_control`) REFERENCES `alumno`(`num_control`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
--  4. ÍNDICES PARA DASHBOARD (consultas frecuentes rápidas)
-- ============================================================

-- Evaluaciones por docente y periodo (dashboard principal)
CREATE INDEX `idx_eval_doce_perio`
    ON `evaluacion_docente` (`id_doce`, `id_perio`);

-- Evaluaciones completadas para reportes
CREATE INDEX `idx_eval_estado_perio`
    ON `evaluacion_docente` (`estado`, `id_perio`);

-- Grupos por docente y periodo
CREATE INDEX `idx_grupo_doce_perio`
    ON `grupo` (`id_doce`, `id_perio`);

-- Inscripciones activas de un alumno
CREATE INDEX `idx_insc_alumno_activa`
    ON `inscripcion` (`num_control`, `activa`);

-- Preguntas por encuesta y orden
CREATE INDEX `idx_pregunta_encuesta_orden`
    ON `pregunta` (`id_encuesta`, `orden`);

-- Respuestas por evaluación
CREATE INDEX `idx_resp_evaluacion`
    ON `respuesta_evaluacion` (`id_evaluacion`);


-- ============================================================
--  5. DATOS PRECARGADOS
-- ============================================================

-- Tipos de encuesta
INSERT INTO `tipo_encuesta` (`id_tipo_encuesta`, `nombre`, `descripcion`) VALUES
(1, 'Docente',  'Evaluación del desempeño docente en aula'),
(2, 'Tutoría',  'Evaluación del tutor asignado al alumno tutorado');

-- 9 categorías de la encuesta de tutoría
INSERT INTO `categoria` (`id_categoria`, `nombre`, `orden`, `activa`) VALUES
(1, 'Detección y diagnóstico oportuno de necesidades',                              1, 1),
(2, 'Monitoreo del rendimiento académico',                                          2, 1),
(3, 'Seguimiento y retroalimentación continua',                                     3, 1),
(4, 'Comunicación y relación con los tutorados',                                    4, 1),
(5, 'Compromiso y responsabilidad',                                                 5, 1),
(6, 'Capacidad para motivar y acompañar en el desarrollo personal y profesional',   6, 1),
(7, 'Impacto en la reducción de reprobación y deserción',                           7, 1),
(8, 'Aplicación de estrategias de rescate académico',                               8, 1),
(9, 'Satisfacción general del tutor o la tutora',                                   9, 1);

-- Rúbrica completa (5 valores × 9 categorías = 45 filas)
INSERT INTO `rubrica` (`id_categoria`, `valor`, `etiqueta`, `descripcion`) VALUES
-- Criterio 1
(1,5,'EXCELENTE',  'Detectó completamente mis necesidades y ofreció un apoyo excelente.'),
(1,4,'MUY BUENO',  'Detectó bien mis necesidades y ofreció un apoyo adecuado.'),
(1,3,'BUENO',      'Detectó mis necesidades de forma general y ofreció apoyo limitado.'),
(1,2,'REGULAR',    'Detectó algunas de mis necesidades, pero no ofreció apoyo adecuado.'),
(1,1,'DEFICIENTE', 'No detectó mis necesidades ni ofreció apoyo.'),
-- Criterio 2
(2,5,'EXCELENTE',  'Realizó un seguimiento constante y me brindó apoyo eficaz en todo momento.'),
(2,4,'MUY BUENO',  'Realizó un buen seguimiento y me apoyó en las materias problemáticas.'),
(2,3,'BUENO',      'Realizó seguimiento regular pero no siempre me apoyó en mis problemáticas.'),
(2,2,'REGULAR',    'Hizo un seguimiento ocasional pero no constante.'),
(2,1,'DEFICIENTE', 'Nunca realizó seguimiento de mi desempeño.'),
-- Criterio 3
(3,5,'EXCELENTE',  'Siempre hizo un seguimiento constante y su retroalimentación fue muy valiosa.'),
(3,4,'MUY BUENO',  'Hizo un buen seguimiento y me dio retroalimentación útil.'),
(3,3,'BUENO',      'Hizo un seguimiento irregular con retroalimentación limitada.'),
(3,2,'REGULAR',    'Hizo un seguimiento mínimo y su retroalimentación fue escasa.'),
(3,1,'DEFICIENTE', 'Nunca hizo seguimiento ni dio retroalimentación.'),
-- Criterio 4
(4,5,'EXCELENTE',  'La comunicación fue excelente y siempre me sentí en confianza.'),
(4,4,'MUY BUENO',  'La comunicación fue buena y generó confianza en muchas ocasiones.'),
(4,3,'BUENO',      'La comunicación fue irregular, aunque a veces me sentí en confianza.'),
(4,2,'REGULAR',    'La comunicación fue escasa y no generó confianza.'),
(4,1,'DEFICIENTE', 'No hubo comunicación ni confianza.'),
-- Criterio 5
(5,5,'EXCELENTE',  'Siempre asistió y demostró un alto nivel de compromiso con mi desarrollo.'),
(5,4,'MUY BUENO',  'Asistió a las sesiones y demostró un buen nivel de compromiso.'),
(5,3,'BUENO',      'Asistió a la mayoría de las sesiones, pero su compromiso fue irregular.'),
(5,2,'REGULAR',    'Asistió a pocas sesiones y su compromiso fue mínimo.'),
(5,1,'DEFICIENTE', 'No asistió ni mostró compromiso.'),
-- Criterio 6
(6,5,'EXCELENTE',  'Me motivó siempre y me dio una excelente orientación para mi desarrollo.'),
(6,4,'MUY BUENO',  'Me motivó constantemente y me ofreció una buena orientación.'),
(6,3,'BUENO',      'Me motivó algunas veces y la orientación fue general.'),
(6,2,'REGULAR',    'Me motivó de manera limitada y no me brindó mucha orientación.'),
(6,1,'DEFICIENTE', 'No me motivó ni me ofreció orientación.'),
-- Criterio 7
(7,5,'EXCELENTE',  'Su impacto fue muy positivo, ayudándome a evitar la reprobación y el abandono.'),
(7,4,'MUY BUENO',  'Su impacto fue positivo y me ayudó a mejorar mi rendimiento.'),
(7,3,'BUENO',      'Su impacto fue moderado, pero no evitó todas las dificultades.'),
(7,2,'REGULAR',    'Tuvo un impacto muy limitado en mi desempeño.'),
(7,1,'DEFICIENTE', 'No tuvo ningún impacto positivo.'),
-- Criterio 8
(8,5,'EXCELENTE',  'Aplicó estrategias excelentes y me ayudó a superar todas mis dificultades.'),
(8,4,'MUY BUENO',  'Aplicó buenas estrategias y me ayudó a superar algunas dificultades.'),
(8,3,'BUENO',      'Aplicó algunas estrategias, pero no siempre resultaron efectivas.'),
(8,2,'REGULAR',    'Aplicó estrategias mínimas o ineficaces.'),
(8,1,'DEFICIENTE', 'No aplicó ninguna estrategia de rescate.'),
-- Criterio 9  (etiquetas propias para satisfacción)
(9,5,'MUY ALTA',   'Muy alta satisfacción con el acompañamiento de mi tutor(a).'),
(9,4,'ALTA',       'Alta satisfacción con el acompañamiento de mi tutor(a).'),
(9,3,'REGULAR',    'Satisfacción regular con el acompañamiento de mi tutor(a).'),
(9,2,'BAJA',       'Baja satisfacción con el acompañamiento de mi tutor(a).'),
(9,1,'MUY BAJA',   'Muy baja satisfacción con el acompañamiento de mi tutor(a).');


-- ============================================================
--  6. STORED PROCEDURES
-- ============================================================
DELIMITER $$

-- ------------------------------------------------------------
--  sp_GenerarPreguntasTutoria
--  Inserta las 17 preguntas oficiales para una encuesta nueva
-- ------------------------------------------------------------
CREATE PROCEDURE `sp_GenerarPreguntasTutoria`(IN p_id_encuesta INT)
BEGIN
    -- Validar que la encuesta existe y es de tipo Tutoría
    IF NOT EXISTS (
        SELECT 1 FROM `encuesta`
        WHERE `id_encuesta` = p_id_encuesta AND `id_tipo_encuesta` = 2
    ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'La encuesta no existe o no es de tipo Tutoría.';
    END IF;

    -- Prevenir duplicados: no insertar si ya tiene preguntas
    IF EXISTS (
        SELECT 1 FROM `pregunta` WHERE `id_encuesta` = p_id_encuesta
    ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'La encuesta ya tiene preguntas registradas.';
    END IF;

    INSERT INTO `pregunta`
        (`id_encuesta`,`id_categoria`,`texto`,`tipo_respuesta`,`es_comentario`,`orden`,`requerida`)
    VALUES
    -- Criterio 1
    (p_id_encuesta,1,'¿El tutor(a) identifica de manera oportuna las necesidades académicas, personales o socioemocionales del tutorado?',1,0,1,1),
    (p_id_encuesta,1,'¿El tutor(a) realiza un diagnóstico adecuado que permite conocer la situación académica y personal del tutorado?',1,0,2,1),
    -- Criterio 2
    (p_id_encuesta,2,'¿El tutor(a) da seguimiento periódico al desempeño académico del tutorado (calificaciones, asistencia, avance en materias)?',1,0,3,1),
    (p_id_encuesta,2,'¿El tutor(a) interviene cuando detecta riesgo de reprobación o bajo rendimiento académico?',1,0,4,1),
    -- Criterio 3
    (p_id_encuesta,3,'¿El tutor(a) mantiene un seguimiento constante de los acuerdos y compromisos establecidos con el tutorado?',1,0,5,1),
    (p_id_encuesta,3,'¿El tutor(a) brinda retroalimentación clara, constructiva y orientada a la mejora?',1,0,6,1),
    -- Criterio 4
    (p_id_encuesta,4,'¿El tutor(a) mantiene una comunicación respetuosa, empática y accesible con los tutorados?',1,0,7,1),
    (p_id_encuesta,4,'¿El tutor(a) genera un ambiente de confianza que facilita el diálogo abierto?',1,0,8,1),
    -- Criterio 5
    (p_id_encuesta,5,'¿El tutor(a) cumple en tiempo y forma con las actividades y reportes establecidos en el programa de tutorías?',1,0,9,1),
    (p_id_encuesta,5,'¿El tutor(a) demuestra disposición y responsabilidad en la atención de los tutorados?',1,0,10,1),
    -- Criterio 6
    (p_id_encuesta,6,'¿El tutor(a) motiva al tutorado para alcanzar sus metas académicas y personales?',1,0,11,1),
    (p_id_encuesta,6,'¿El tutor(a) orienta al tutorado en su proyecto de vida y desarrollo profesional?',1,0,12,1),
    -- Criterio 7
    (p_id_encuesta,7,'¿La intervención del tutor(a) contribuye a prevenir la reprobación del tutorado?',1,0,13,1),
    (p_id_encuesta,7,'¿La intervención del tutor(a) favorece la permanencia del tutorado en la institución?',1,0,14,1),
    -- Criterio 8
    (p_id_encuesta,8,'¿El tutor(a) canaliza oportunamente al tutorado a asesorías académicas, orientación educativa, servicios médicos u otros apoyos cuando es necesario?',1,0,15,1),
    (p_id_encuesta,8,'¿El tutor(a) implementa estrategias específicas para apoyar la recuperación académica del tutorado?',1,0,16,1),
    -- Criterio 9
    (p_id_encuesta,9,'En términos generales, ¿qué tan satisfecho(a) se encuentra con el acompañamiento brindado por su tutor(a)?',1,0,17,1);

END$$


-- ------------------------------------------------------------
--  sp_IniciarEvaluacion
--  Crea la cabecera de evaluación SOLO si pasan todas las pautas:
--    1. Encuesta activa y dentro de fechas
--    2. Alumno inscrito en el grupo
--    3. No evaluación previa completada
--    4. Registro de auditoría
-- ------------------------------------------------------------
CREATE PROCEDURE `sp_IniciarEvaluacion`(
    IN  p_num_control   INT,
    IN  p_id_encuesta   INT,
    IN  p_id_doce       INT,
    IN  p_id_grupo      INT,
    IN  p_ip            VARCHAR(45),
    OUT p_id_evaluacion INT,
    OUT p_mensaje       VARCHAR(255)
)
BEGIN
    DECLARE v_activa        TINYINT DEFAULT 0;
    DECLARE v_dentro_fecha  TINYINT DEFAULT 0;
    DECLARE v_inscrito      TINYINT DEFAULT 0;
    DECLARE v_ya_completo   TINYINT DEFAULT 0;
    DECLARE v_id_perio      SMALLINT;

    -- 1. Verificar encuesta activa y fechas
    SELECT COUNT(*), MAX(id_perio)
    INTO   v_activa, v_id_perio
    FROM   `encuesta`
    WHERE  `id_encuesta`  = p_id_encuesta
      AND  `activa`       = 1
      AND  NOW() BETWEEN `fecha_inicio` AND `fecha_fin`;

    IF v_activa = 0 THEN
        SET p_id_evaluacion = 0;
        SET p_mensaje = 'ERROR: La encuesta no está activa o fuera de fechas.';
        INSERT INTO `log_acceso_encuesta`
            (`num_control`,`id_encuesta`,`id_doce`,`accion`,`detalle`,`ip_origen`)
        VALUES (p_num_control, p_id_encuesta, p_id_doce, 'FUERA_FECHA', p_mensaje, p_ip);
        LEAVE sp_IniciarEvaluacion;
    END IF;

    -- 2. Verificar que el alumno está inscrito en el grupo
    SELECT COUNT(*) INTO v_inscrito
    FROM   `inscripcion`
    WHERE  `num_control` = p_num_control
      AND  `id_grupo`    = p_id_grupo
      AND  `activa`      = 1;

    IF v_inscrito = 0 THEN
        SET p_id_evaluacion = 0;
        SET p_mensaje = 'ERROR: El alumno no está inscrito en el grupo indicado.';
        INSERT INTO `log_acceso_encuesta`
            (`num_control`,`id_encuesta`,`id_doce`,`accion`,`detalle`,`ip_origen`)
        VALUES (p_num_control, p_id_encuesta, p_id_doce, 'INICIO', p_mensaje, p_ip);
        LEAVE sp_IniciarEvaluacion;
    END IF;

    -- 3. Verificar que no haya evaluación ya completada
    SELECT COUNT(*) INTO v_ya_completo
    FROM   `evaluacion_docente`
    WHERE  `num_control` = p_num_control
      AND  `id_doce`     = p_id_doce
      AND  `id_grupo`    = p_id_grupo
      AND  `id_perio`    = v_id_perio
      AND  `estado`      = 3;

    IF v_ya_completo > 0 THEN
        SET p_id_evaluacion = 0;
        SET p_mensaje = 'ERROR: Ya existe una evaluación completada para este docente/grupo.';
        INSERT INTO `log_acceso_encuesta`
            (`num_control`,`id_encuesta`,`id_doce`,`accion`,`detalle`,`ip_origen`)
        VALUES (p_num_control, p_id_encuesta, p_id_doce, 'INTENTO_DUPLICADO', p_mensaje, p_ip);
        LEAVE sp_IniciarEvaluacion;
    END IF;

    -- 4. Crear o retomar evaluación en curso
    INSERT INTO `evaluacion_docente`
        (`id_encuesta`,`num_control`,`id_doce`,`id_grupo`,`id_perio`,`estado`,`ip_origen`)
    VALUES
        (p_id_encuesta, p_num_control, p_id_doce, p_id_grupo, v_id_perio, 1, p_ip)
    ON DUPLICATE KEY UPDATE
        `estado`      = IF(`estado` = 4, 4, `estado`),   -- no reabrir anuladas
        `ip_origen`   = p_ip;

    SET p_id_evaluacion = LAST_INSERT_ID();
    SET p_mensaje = 'OK: Evaluación iniciada correctamente.';

    INSERT INTO `log_acceso_encuesta`
        (`num_control`,`id_encuesta`,`id_doce`,`accion`,`detalle`,`ip_origen`)
    VALUES (p_num_control, p_id_encuesta, p_id_doce, 'INICIO', p_mensaje, p_ip);

END$$


-- ------------------------------------------------------------
--  sp_CompletarEvaluacion
--  Marca la evaluación como COMPLETADA sólo si todas las
--  preguntas requeridas tienen respuesta
-- ------------------------------------------------------------
CREATE PROCEDURE `sp_CompletarEvaluacion`(
    IN  p_id_evaluacion INT,
    OUT p_ok            TINYINT,
    OUT p_mensaje       VARCHAR(255)
)
BEGIN
    DECLARE v_total_requeridas  INT DEFAULT 0;
    DECLARE v_total_respondidas INT DEFAULT 0;
    DECLARE v_id_encuesta       INT;
    DECLARE v_num_control       INT;

    SELECT `id_encuesta`, `num_control`
    INTO   v_id_encuesta, v_num_control
    FROM   `evaluacion_docente`
    WHERE  `id_evaluacion` = p_id_evaluacion;

    -- Total preguntas requeridas de la encuesta
    SELECT COUNT(*) INTO v_total_requeridas
    FROM   `pregunta`
    WHERE  `id_encuesta` = v_id_encuesta
      AND  `requerida`   = 1
      AND  `activa`      = 1;

    -- Total preguntas requeridas respondidas en esta evaluación
    SELECT COUNT(*) INTO v_total_respondidas
    FROM   `respuesta_evaluacion`    re
    JOIN   `pregunta`                p  ON p.`id_pregunta` = re.`id_pregunta`
    WHERE  re.`id_evaluacion` = p_id_evaluacion
      AND  p.`requerida`      = 1
      AND  (re.`calificacion` IS NOT NULL OR re.`comentario` IS NOT NULL);

    IF v_total_respondidas < v_total_requeridas THEN
        SET p_ok      = 0;
        SET p_mensaje = CONCAT('Faltan ', (v_total_requeridas - v_total_respondidas),
                               ' pregunta(s) requeridas por contestar.');
    ELSE
        UPDATE `evaluacion_docente`
        SET    `estado`    = 3,
               `fecha_fin` = NOW()
        WHERE  `id_evaluacion` = p_id_evaluacion;

        SET p_ok      = 1;
        SET p_mensaje = 'Evaluación completada y guardada correctamente.';

        INSERT INTO `log_acceso_encuesta`
            (`num_control`,`id_encuesta`,`accion`,`detalle`)
        SELECT v_num_control, v_id_encuesta, 'COMPLETADO', p_mensaje;
    END IF;

END$$

DELIMITER ;


-- ============================================================
--  7. VISTAS PARA DASHBOARD
-- ============================================================

-- ------------------------------------------------------------
--  v_dashboard_estado_encuesta
--  ¿Cuántos alumnos contestaron vs. falta por periodo?
--  → Tarjeta principal del dashboard
-- ------------------------------------------------------------
CREATE VIEW `v_dashboard_estado_encuesta` AS
SELECT
    pe.`id_perio`,
    pe.`nombre_corto`                               AS periodo,
    e.`id_encuesta`,
    e.`nombre`                                      AS encuesta,
    te.`nombre`                                     AS tipo_encuesta,
    COUNT(DISTINCT i.`num_control`)                 AS total_alumnos,
    COUNT(DISTINCT CASE WHEN ev.`estado` = 3
          THEN ev.`num_control` END)                AS completaron,
    COUNT(DISTINCT CASE WHEN ev.`estado` IS NULL
          OR ev.`estado` != 3
          THEN i.`num_control` END)                 AS pendientes,
    ROUND(
        COUNT(DISTINCT CASE WHEN ev.`estado` = 3
              THEN ev.`num_control` END) * 100.0
        / NULLIF(COUNT(DISTINCT i.`num_control`),0)
    , 1)                                            AS pct_completado
FROM       `inscripcion`         i
JOIN       `grupo`               g   ON g.`id_grupo`  = i.`id_grupo`
JOIN       `periodo_escolar`     pe  ON pe.`id_perio` = i.`id_perio`
JOIN       `encuesta`            e   ON e.`id_perio`  = pe.`id_perio` AND e.`activa` = 1
JOIN       `tipo_encuesta`       te  ON te.`id_tipo_encuesta` = e.`id_tipo_encuesta`
LEFT JOIN  `evaluacion_docente`  ev
           ON  ev.`num_control` = i.`num_control`
           AND ev.`id_encuesta` = e.`id_encuesta`
WHERE i.`activa` = 1
GROUP BY pe.`id_perio`, pe.`nombre_corto`,
         e.`id_encuesta`, e.`nombre`, te.`nombre`;


-- ------------------------------------------------------------
--  v_alumnos_pendientes
--  Lista individual de quién NO ha contestado (para notificar)
-- ------------------------------------------------------------
CREATE VIEW `v_alumnos_pendientes` AS
SELECT
    pe.`id_perio`,
    pe.`nombre_corto`   AS periodo,
    e.`id_encuesta`,
    i.`num_control`,
    a.`nombre_completo` AS alumno,
    a.`correo_e`,
    a.`semestre`,
    c.`nombre_corto`    AS carrera,
    d.`id_doce`,
    CONCAT(d.`apellidos`,' ',d.`nombre`) AS docente,
    g.`id_grupo`,
    g.`clave`           AS grupo,
    m.`nombre`          AS materia,
    COALESCE(ev.`estado`, 0) AS estado_evaluacion
    -- 0=Sin iniciar 1=Iniciada 2=En_proceso
FROM       `inscripcion`         i
JOIN       `alumno`              a   ON a.`num_control` = i.`num_control`
JOIN       `carrera`             c   ON c.`id_carre`    = a.`id_carre`
JOIN       `grupo`               g   ON g.`id_grupo`    = i.`id_grupo`
JOIN       `docente`             d   ON d.`id_doce`     = g.`id_doce`
JOIN       `materia`             m   ON m.`id_mate`     = g.`id_mate`
JOIN       `periodo_escolar`     pe  ON pe.`id_perio`   = i.`id_perio`
JOIN       `encuesta`            e   ON e.`id_perio`    = pe.`id_perio` AND e.`activa` = 1
LEFT JOIN  `evaluacion_docente`  ev
           ON  ev.`num_control` = i.`num_control`
           AND ev.`id_doce`     = d.`id_doce`
           AND ev.`id_grupo`    = g.`id_grupo`
           AND ev.`id_perio`    = pe.`id_perio`
WHERE i.`activa` = 1
  AND (ev.`estado` IS NULL OR ev.`estado` != 3);


-- ------------------------------------------------------------
--  v_promedio_por_criterio
--  Promedio por docente + criterio (para gráfica radar/barra)
-- ------------------------------------------------------------
CREATE VIEW `v_promedio_por_criterio` AS
SELECT
    ev.`id_perio`,
    pe.`nombre_corto`                               AS periodo,
    ev.`id_doce`,
    CONCAT(d.`apellidos`,' ',d.`nombre`)            AS docente,
    d.`grado`,
    ev.`id_grupo`,
    g.`clave`                                       AS grupo,
    m.`nombre`                                      AS materia,
    c.`id_categoria`,
    c.`nombre`                                      AS criterio,
    c.`orden`                                       AS orden_criterio,
    COUNT(DISTINCT ev.`id_evaluacion`)              AS total_evaluaciones,
    ROUND(AVG(r.`calificacion`), 2)                 AS promedio_criterio
FROM       `evaluacion_docente`     ev
JOIN       `respuesta_evaluacion`   r   ON r.`id_evaluacion` = ev.`id_evaluacion`
JOIN       `pregunta`               p   ON p.`id_pregunta`   = r.`id_pregunta`
JOIN       `categoria`              c   ON c.`id_categoria`  = p.`id_categoria`
JOIN       `docente`                d   ON d.`id_doce`       = ev.`id_doce`
JOIN       `grupo`                  g   ON g.`id_grupo`      = ev.`id_grupo`
JOIN       `materia`                m   ON m.`id_mate`       = g.`id_mate`
JOIN       `periodo_escolar`        pe  ON pe.`id_perio`     = ev.`id_perio`
WHERE ev.`estado` = 3
  AND r.`calificacion` IS NOT NULL
GROUP BY ev.`id_perio`, pe.`nombre_corto`,
         ev.`id_doce`, d.`apellidos`, d.`nombre`, d.`grado`,
         ev.`id_grupo`, g.`clave`, m.`nombre`,
         c.`id_categoria`, c.`nombre`, c.`orden`;


-- ------------------------------------------------------------
--  v_resumen_por_docente
--  Promedio general + clasificación por docente (tabla del dashboard)
-- ------------------------------------------------------------
CREATE VIEW `v_resumen_por_docente` AS
SELECT
    `id_perio`, `periodo`,
    `id_doce`,  `docente`, `grado`,
    `id_grupo`, `grupo`,   `materia`,
    MAX(`total_evaluaciones`)           AS total_evaluaciones,
    ROUND(AVG(`promedio_criterio`), 2)  AS promedio_general,
    CASE
        WHEN AVG(`promedio_criterio`) >= 4.5 THEN 'EXCELENTE'
        WHEN AVG(`promedio_criterio`) >= 3.5 THEN 'MUY BUENO'
        WHEN AVG(`promedio_criterio`) >= 2.5 THEN 'BUENO'
        WHEN AVG(`promedio_criterio`) >= 1.5 THEN 'REGULAR'
        ELSE 'DEFICIENTE'
    END AS clasificacion
FROM `v_promedio_por_criterio`
GROUP BY `id_perio`,`periodo`,`id_doce`,`docente`,`grado`,
         `id_grupo`,`grupo`,`materia`;


-- ------------------------------------------------------------
--  v_distribucion_respuestas
--  Cuántas veces eligió cada valor (1-5) por pregunta/docente
--  → Para gráficas de barras de distribución
-- ------------------------------------------------------------
CREATE VIEW `v_distribucion_respuestas` AS
SELECT
    ev.`id_perio`,
    pe.`nombre_corto`                               AS periodo,
    ev.`id_doce`,
    CONCAT(d.`apellidos`,' ',d.`nombre`)            AS docente,
    p.`id_pregunta`,
    p.`texto`                                       AS pregunta,
    c.`nombre`                                      AS criterio,
    r.`calificacion`                                AS valor,
    rb.`etiqueta`,
    COUNT(*)                                        AS frecuencia
FROM       `evaluacion_docente`     ev
JOIN       `respuesta_evaluacion`   r   ON r.`id_evaluacion` = ev.`id_evaluacion`
JOIN       `pregunta`               p   ON p.`id_pregunta`   = r.`id_pregunta`
JOIN       `categoria`              c   ON c.`id_categoria`  = p.`id_categoria`
JOIN       `rubrica`                rb  ON rb.`id_categoria` = c.`id_categoria`
                                      AND rb.`valor`         = r.`calificacion`
JOIN       `docente`                d   ON d.`id_doce`       = ev.`id_doce`
JOIN       `periodo_escolar`        pe  ON pe.`id_perio`     = ev.`id_perio`
WHERE ev.`estado` = 3
  AND r.`calificacion` IS NOT NULL
GROUP BY ev.`id_perio`, pe.`nombre_corto`,
         ev.`id_doce`, d.`apellidos`, d.`nombre`,
         p.`id_pregunta`, p.`texto`, c.`nombre`,
         r.`calificacion`, rb.`etiqueta`;


-- ------------------------------------------------------------
--  v_comentarios_docente
--  Comentarios abiertos por docente (para sección cualitativa)
-- ------------------------------------------------------------
CREATE VIEW `v_comentarios_docente` AS
SELECT
    ev.`id_perio`,
    pe.`nombre_corto`                               AS periodo,
    ev.`id_doce`,
    CONCAT(d.`apellidos`,' ',d.`nombre`)            AS docente,
    p.`texto`                                       AS pregunta,
    r.`comentario`,
    ev.`fecha_fin`                                  AS fecha_respuesta
FROM       `evaluacion_docente`     ev
JOIN       `respuesta_evaluacion`   r   ON r.`id_evaluacion` = ev.`id_evaluacion`
JOIN       `pregunta`               p   ON p.`id_pregunta`   = r.`id_pregunta`
JOIN       `docente`                d   ON d.`id_doce`       = ev.`id_doce`
JOIN       `periodo_escolar`        pe  ON pe.`id_perio`     = ev.`id_perio`
WHERE ev.`estado`   = 3
  AND r.`comentario` IS NOT NULL
  AND r.`comentario` != '';


SET FOREIGN_KEY_CHECKS = 1;
-- ============================================================
--  FIN DEL SCRIPT v3.0
-- ============================================================
