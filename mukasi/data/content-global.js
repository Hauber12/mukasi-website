/* Inhalte (Chronik, Vorstand, Ehrenmitglieder, Feste) + Termine 2026 */
(function(){
const chronik = [
["1886","Bereits im Jahre 1886 hatten sich Musikanten in Simmerberg zusammengefunden um gemeinsam zu musizieren."],
["1889","Offizielle Gründung der Kapelle unter dem Namen „Simmerberger Blechmusikgesellschaft“. Die Gesellschaft bestand damals aus dem Dirigenten Hermann Nuber und 7 weiteren Musikanten."],
["1914/18","Während des 1. Weltkriegs war eine Weiterführung der Kapelle nicht mehr möglich."],
["1920","Am 7. Juli 1920 wurde die „Musikgesellschaft Simmerberg“ gegründet."],
["1922","Am 19. März fand die Gründungsversammlung des „Musikverein Simmerberg“ statt. 1. Vorsitzender war Eugen Wanner, 1. Dirigent Hans Reichart."],
["1939/45","Im 2. Weltkrieg wurden 14 Musikanten einberufen, deshalb ruhten die Aktivitäten der Musiker."],
["1945","Das Kriegsende schien der Musik den tödlichen Schlag zu versetzen. Auf Befehl des französischen Ortskommandanten mussten alle Musikinstrumente an die Besatzungstruppen abgeliefert werden. Der Verein musste auf Anordnung der Besatzungsmacht aufgelöst werden."],
["1947","In einer Wiedergründungsversammlung trat man zur Neubildung der Musikkapelle. Heinrich Pfanner wurde 1. Dirigent. Die „Musikkapelle Simmerberg“ bekam die offizielle Zulassung durch die französische Besatzungsmacht."],
["1948","Kirchweih-Konzert im Riesersaal."],
["1951","Fahnenweihe im Jahre 1951."],
["1956","Die Kapelle stellt sich erstmals in neuer Tracht bei einem Standkonzert vor dem Salzfaktorhaus vor."],
["1957","Oktoberfest in Pforzheim."],
["1958","Frühlingsfest in Köln."],
["1959","Oktoberfestumzug München."],
["1975","Festzelt in Balach."],
["1976","Fest in Waldbröl im Bergischem Land."],
["1978","Bei einem Großbrand im „Gasthaus Krone“ fiel die Fahne dem Feuer zum Opfer. Das Notenmaterial konnte gerade noch gerettet werden."],
["1979","Durch eine Abstimmung wurde beschlossen, zum ersten Mal Damen in die Kapelle aufzunehmen. Festzelt in Le Lode (Französische Schweiz)."],
["1980","Die neue Fahne wurde bei dem Jahrhundertfest zusammen mit der Sportgemeinde und der Feuerwehr eingeweiht."],
["1981","Platzkonzert in der Fußgängerzone in Stuttgart und Einmarsch in das Neckarstadion. Stadtfest Waldbröl im Oberbergischem Land."],
["1983","Festzelt Oldersum (Ostfriesland)."],
["1987","Das wohl größte Erlebnis für die Musiker aus Simmerberg war die Reise nach Milwaukee und Chicago. Der einwöchige Aufenthalt kam durch den Kontakt zu dem schweizerischen Ehepaar Doris und Skip Geiger zustande. Fest in Wackernheim (Mainz)."],
["1988","Fest in Numbrecht."],
["1989","Fest in Wackernheim (Mainz). Marktfest in Oldersum (Ostfriesland)."],
["1990","Im August 1990 wurde mit dem Schützenverein Simmerberg aufgrund des 101-jährigen Bestehens der Musikkapelle Simmerberg und des 100-jährigen Bestehens des Schützenvereins ein viertägiges Festzelt in Simmerberg abgehalten. Fest in Schleswig-Holstein."],
["1991","Weinfest in Dettingen (Baden-Württemberg)."],
["1992","Fest in Wackernheim (Mainz)."],
["1993","Fest in Hutzfeld (Bosau)."],
["1995","Durch den langjährigen Freund und Gönner Horst Emil Escher wurden der Musikkapelle Simmerberg in den Jahren 1995 und 1998 unvergessliche Auftritte auf Gran Canaria ermöglicht. Fest in Röddenau."],
["1996","Sportfest in Hutzfeld (Bosau). Feuerwehrfest in Wackernheim (Mainz)."],
["1997","Die Musikkapelle wurde zum 60. Geburtstag von Horst Emil Escher in das Hilton Hotel nach München eingeladen. In den Jahren 1997–2004 wurde die Musikkapelle mehrfach von dem Ehepaar Wolfgang († 2014) und Jutta Hartmann nach Berlin eingeladen."],
["1998","Konzertreise nach Gran Canaria. Nach 26 Jahren gibt Remig Siegel das Vorstandsamt an Adolf Paptistella weiter und wird für seine Verdienste zum Ehrenvorstand ernannt."],
["1999","Fest in Lackendorf (Rottweil)."],
["2000","Fest in Leckendorf (Rottweil)."],
["2001","5-tägige Konzertreise nach Hamburg."],
["2002","65. Geburtstag von Wolfgang Hartmann († 2014)."],
["2004","Stadtfest in Wackernheim (Mainz). Salzzug und Markterhebung in Simmerberg. 65. Geburtstag von Jutta Hartmann in Berlin. 3 Tage Comedyabend in Simmerberg."],
["2005","Fest in Frankenhausen (Darmstadt)."],
["2006","„Kerb“ in Frankenhausen (Darmstadt). 850 Jahre Hutzfeld (Bosau). 3 Tage Comedyabend in Simmerberg."],
["2007","Narrensprung in Baienfurt."],
["2008","Gemeinsame 4-tägige Festzeltveranstaltung mit dem Schützenverein und der Landjugend Simmerberg anlässlich der Fahnenweihe und des 25-jährigen Bestehens der katholischen Landjugend."],
["2009","Generationenwechsel: Adolf Paptistella gibt nach 11 Jahren sein Vorstandsamt an Christian Hauber und Markus Ihler ab. Heute ist er Ehrenmitglied."],
["2012","Eine Abordnung der Musikkapelle begleitet, gemeinsam mit dem Liederkranz Weiler und dem Partnerschaftsverein, die Vertreter der Gemeinde zur Unterzeichnung der Städtepartnerschaft nach Ollioules (Frankreich)."],
["2013","Gründung des „Förderverein der Musikkapelle Simmerberg e.V.“ Bei dem traditionellen Salzzug in Simmerberg reihte sich die Musikkapelle in den Umzug ein. Die Musikkapelle organisiert zum 50. Mal den Simmerberger Dorfnikolaus. Bereits zum vierten Mal folgten wir der Einladung der Gemeinde Hutzfeld (Bosau) in den hohen Norden Deutschlands."],
["2014","Die Musikkapelle feierte ihr 125-jähriges Bestehen mit einer 5-tägigen Festzeltveranstaltung."],
["2015","Stimmungswettbewerb in Seibranz (1. Platz)."],
["2017","Stimmungswettbewerb in Dornbirn (2. Platz). Besuch der Partnerschaftsgemeinde in Valmontone (Italien)."],
["2018","56. Bezirksmusikfest in Simmerberg."]
].map(([year, text]) => ({ year, text, major: ["1886","1889","1947","1979","1987","2009","2013","2014","2018"].includes(year) }));

const vorstand = [
  { group: "Musikalische Leitung", people: [["Arthur Wegmann","1. Dirigent"]] },
  { group: "Vorstandsteam", people: [["Markus Ihler","Vorstand"],["Josef Müller","Vorstand"],["Martin Wucher","Vorstand"]] },
  { group: "Verwaltung & Organisation", people: [["Katharina Mamerow","Schriftführerin"],["Regina Müller","Kassiererin"],["Steffi Koch","Marketing & Datenschutz"],["Daniela Ihler","Organisation Proberaum"]] },
  { group: "Ausstattung, Noten & Jugend", people: [["Jakob Hauber","Jugendvertreter"],["Birgit Lommer","Zeugwartin"],["Geli Sprung","Instrumentenwartin"],["Matthias Schadt","Notenwart"],["Christian Hauber","Beisitzer"]] }
].map(g => ({ group: g.group, people: g.people.map(([name, role]) => ({ name, role, initials: name.split(" ").map(w => w[0]).join("") })) }));

const ehren = [["Franz Hartmann","Ehrendirigent"],["Erich Paptistella",""],["Richard Wilhelmi",""],["Michaela Deubele",""],["Josef Hartmann",""],["Adolf Hartmann",""],["Adolf Paptistella",""],["Michael Blank",""]].map(([name, role]) => ({ name, role }));

const feste = [
["flyer-nf9.png","Neueste Ausgabe","Näääxxt Fescht 9.0","08. – 10. Mai 2025",["Donnerstag: Tegernseer Tanzlmusi · Alpensound","Freitag: Papi's Pumpels · Allgäu Feager","Samstag: Party Fever · Illertaler · 2 Engel & Charlie"]],
["flyer-nf8.png","3-Tage-Programm","Näääxxt Fescht 8.0","09. – 11. Mai 2024",["Donnerstag: OHO · Dirt Road · Die Draufgänger · Albkracher","Freitag: Böhmischer Alptraum · DJ Marco Mzee · Mountain Crew","Samstag: Die 4 Lustigen 5 · Stubete Gäng · Allgäu Feager"]],
["flyer-nf7.png","2 Tage · Holz-Optik","Näääxxt Fescht 7.0","12. – 13. Mai 2023",["Freitag: Die 4 Lustigen 5 · Fäaschtbänkler · DJ Marco Mzee","Samstag: MV Scheffau · Allgäu Feager · Lorenz Büffel"]],
["flyer-nf6.jpg","Comeback nach Corona","Näääxxt Fescht 6.0","26. – 28. Mai 2022 · Festplatz Simmerberg",["Donnerstag: Alpenblech · Die Draufgänger · La Paloma Boys","Freitag: Die 4 Lustigen 5 · Fäaschtbänkler · DJ Marco Mzee","Samstag: Christoph Glassehner · Allgäu Feager · Melissa Naschenweng"]],
["flyer-nf5.jpg","Beheiztes Festzelt","Näääxxt Fescht 5.0","10. – 11. Mai 2019",["Freitag: Alpensound · Powerkryner","Samstag: Die 4 Lustigen 5 · Lederrebellen"]],
["flyer-bezirksmusikfest.jpg","4 Tage · Bezirksmusikfest","56. Bezirksmusikfest in Simmerberg","10. – 13. Mai 2018",["Do: MV Ellhofen · La Paloma Boys · Fäaschtbänkler","Freitag: Bayern · Allgäu Feager","Samstag: MV Scheffau · Powerkryner","Sonntag: OHO · 4 Lustigen 5 · MK Wohmbrechts & Gestratz"]],
["flyer-nf3.png","Festplatz Simmerberg","Näääxxt Fescht 3.0","05. – 06. Mai 2017",["Freitag: Lederrebellen","Samstag: Allgäu Feager · Powerkryner"]],
["flyer-nf2.jpg","Eintritt 9 €","Näääxxt Fescht 2.0","06. – 07. Mai 2016",["Freitag: Lederrebellen","Samstag: Quattropoly · Fättes Blech · Die Brasserie DJ Marco Mzee"]],
["flyer-nf1.jpg","Wo alles begann","Näääxxt Fescht 1.0","17. – 18. April 2015",["Freitag: Lederrebellen","Samstag: DJ Marco Mzee · Dorfrocker"]]
].map(([img, kicker, title, date, lines]) => ({ img: "mukasi/img/" + img, kicker, title, date, year: (date.match(/\d{4}/) || [""])[0], lines: lines.map(t => ({ t })) }));

const fasching = [1,2,3,4,5].map(n => ({ img: "mukasi/img/fasching-" + n + ".jpg" }));
const img = (p) => p;
window.MUKASI = { chronik, vorstand, ehren, feste, fasching, img, termine: [{"title":"Kinderfasching Simmerberg","date":"2026-02-01T13:13","year":"2026","type":"verein","location":"Simmerberg","notes":""},{"title":"Generalversammlung","date":"2026-03-06T19:30","year":"2026","type":"verein","location":"Krone (Simmerberg)","notes":""},{"title":"Maibaum aufstellen","date":"2026-05-01T00:00","year":"2026","type":"auftritt","location":"Simmerberg","notes":""},{"title":"Heilige Kommunion","date":"2026-05-03T10:15","year":"2026","type":"auftritt","location":"Simmerberg","notes":""},{"title":"1. Standkonzert","date":"2026-05-20T19:30","year":"2026","type":"auftritt","location":"Simmerberg","notes":"mit Trachtenverein"},{"title":"150 Jahre Feuerwehr Stiefenhofen (Umzug)","date":"2026-05-24T13:30","year":"2026","type":"auftritt","location":"Stiefenhofen","notes":"Umzug"},{"title":"Weckruf Fronleichnam","date":"2026-06-04T06:00","year":"2026","type":"auftritt","location":"Simmerberg","notes":""},{"title":"Fronleichnam Prozession","date":"2026-06-04T08:45","year":"2026","type":"auftritt","location":"Simmerberg","notes":""},{"title":"150 Jahre Feuerwehr Röthenbach (Umzug)","date":"2026-06-14T13:00","year":"2026","type":"auftritt","location":"Röthenbach","notes":"Umzug"},{"title":"Sternmarsch Krumbach (AT)","date":"2026-06-19T18:30","year":"2026","type":"auftritt","location":"Krumbach (Österreich)","notes":""},{"title":"2. Standkonzert","date":"2026-06-25T19:30","year":"2026","type":"auftritt","location":"Simmerberg","notes":"mit Trachtenverein"},{"title":"Bezirksmusikfest Maierhöfen (Festumzug)","date":"2026-07-05T13:00","year":"2026","type":"auftritt","location":"Maierhöfen","notes":""},{"title":"Salzzug Simmerberg","date":"2026-07-11T00:00","year":"2026","type":"auftritt","location":"Simmerberg","notes":""},{"title":"Standkonzert Weiler","date":"2026-07-14T20:00","year":"2026","type":"auftritt","location":"Weiler","notes":""},{"title":"Abendmesse Hochgrat","date":"2026-08-04T19:30","year":"2026","type":"auftritt","location":"Hochgrat","notes":""},{"title":"3. Standkonzert","date":"2026-08-07T19:30","year":"2026","type":"auftritt","location":"Simmerberg","notes":"mit Trachtenverein"},{"title":"4. Standkonzert – Frühschoppen","date":"2026-09-13T10:30","year":"2026","type":"auftritt","location":"Simmerberg","notes":"mit Trachtenverein"},{"title":"Erntedank Simmerberg","date":"2026-10-04T10:15","year":"2026","type":"auftritt","location":"Simmerberg","notes":"Fahnenabordnung"},{"title":"Volkstrauertag","date":"2026-11-15T10:15","year":"2026","type":"auftritt","location":"Simmerberg","notes":"Fahnenabordnung"},{"title":"Jahreskonzert","date":"2026-11-28T00:00","year":"2026","type":"konzert","location":"Simmerberg","notes":""},{"title":"Weihnachtsmarkt Simmerberg","date":"2026-11-29T13:00","year":"2026","type":"auftritt","location":"Simmerberg","notes":""},{"title":"Adventssingen Simmerberg","date":"2026-12-13T19:30","year":"2026","type":"auftritt","location":"Simmerberg","notes":""},{"title":"Spielen unterm Christbaum","date":"2026-12-24T00:00","year":"2026","type":"auftritt","location":"Simmerberg","notes":""},{"title":"Silvesterblasen – Tag 1","date":"2026-12-28T09:00","year":"2026","type":"auftritt","location":"Simmerberg","notes":""},{"title":"Silvesterblasen – Tag 2","date":"2026-12-29T08:30","year":"2026","type":"auftritt","location":"","notes":"Simmerberg"}] };
})();
