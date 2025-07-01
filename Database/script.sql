DROP TABLE IF EXISTS Commentaire;
DROP TABLE IF EXISTS Favori;
DROP TABLE IF EXISTS Utilisateur;
DROP TABLE IF EXISTS Oeuvre;
DROP TABLE IF EXISTS Genre;
DROP TABLE IF EXISTS Langue;
DROP TABLE IF EXISTS Acteur;
DROP TABLE IF EXISTS Realisateur;
DROP TABLE IF EXISTS Scenariste;


CREATE TABLE Utilisateur (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    identifiant TEXT NOT NULL,
    mot_de_passe TEXT NOT NULL
);


CREATE TABLE Genre (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT UNIQUE NOT NULL
);


CREATE TABLE Langue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT UNIQUE NOT NULL
);


CREATE TABLE Acteur (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL
);

CREATE TABLE Realisateur (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL
);

CREATE TABLE Scenariste (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL
);

CREATE TABLE Oeuvre (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imdb_id TEXT UNIQUE,
    titre TEXT NOT NULL,
    annee INTEGER,
    duree TEXT,
    description TEXT,
    affiche TEXT,
    type TEXT CHECK(type IN ('film', 'serie')),
    genre TEXT,
    langue TEXT,
    realisateur_id INTEGER,
    acteur_principal_id INTEGER,
    scenariste_id INTEGER,
    FOREIGN KEY (realisateur_id) REFERENCES Realisateur(id),
    FOREIGN KEY (acteur_principal_id) REFERENCES Acteur(id),
    FOREIGN KEY (scenariste_id) REFERENCES Scenariste(id)
);

CREATE TABLE Favori (
    utilisateur_id INTEGER,
    oeuvre_id INTEGER,
    PRIMARY KEY (utilisateur_id, oeuvre_id),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(id),
    FOREIGN KEY (oeuvre_id) REFERENCES Oeuvre(id)
);

CREATE TABLE Commentaire (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    utilisateur_id INTEGER,
    oeuvre_id INTEGER,
    texte TEXT,
    note INTEGER CHECK(note BETWEEN 0 AND 10),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(id),
    FOREIGN KEY (oeuvre_id) REFERENCES Oeuvre(id)
);

INSERT INTO Genre (nom) VALUES ('Science-fiction');
INSERT INTO Genre (nom) VALUES ('Comédie')

INSERT INTO Langue (nom) VALUES ('Français')
INSERT INTO Langue (nom) VAlUES ('Anglais ')

INSERT INTO Acteur (nom) VALUES ('Brad PITT');

INSERT INTO Realisateur (nom) VALUES ('Steven Spielberg');

INSERT INTO Scenariste (nom) VALUES ('Peter Gould');

INSERT INTO Oeuvre (
  titre, annee, duree, description, affiche, type,
  genre, langue, realisateur_id, acteur_principal_id, scenariste_id
)
VALUES (
  'Breaking Bad', 2008, '45 min',
  'Un prof de chimie devient un baron de la drogue.',
  'https://url-vers-affiche.jpg', 'serie',
  'Action, Drame', 'Anglais',
  1, 1, 1
);

INSERT INTO Favori (utilisateur_id, oeuvre_id) VALUES (1, 1);

INSERT INTO Commentaire (utilisateur_id, oeuvre_id, texte, note)
VALUES (1, 1, 'Une série incroyable, super bien écrite.', 9);