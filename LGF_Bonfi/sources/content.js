// Contenu corrigé du rapport de visite de chantier (source unique pour le .docx et l'annexe PDF)
module.exports = {
  titre: "RAPPORT DE VISITE DE CHANTIER",
  sousTitre: "Constats, analyse technique et préconisations de reprise",
  ouvrage: "Siège du Groupe LGF Média – bâtiment R+7 recevant du public (phase second œuvre et finitions)",
  localisation: "Bonfi, commune de Matam – Conakry, Guinée",
  dates: "17 et 18 août 2026",
  auteur: "Lucien Bakole GUILAVOGUI, architecte",
  nature: "Rapport de constats et d'expertise technique",
  fiche: [
    ["Maître d'ouvrage", "Groupe LGF Média"],
    ["Maître d'œuvre", "[À renseigner]"],
    ["Entreprise(s) titulaire(s)", "[À renseigner]"],
    ["Référence de l'ordre de mission", "[À renseigner]"],
    ["Dates d'inspection", "17 et 18 août 2026"],
  ],
  // Gravité : CRITIQUE / MAJEUR / MINEUR
  synthese: {
    paras: [
      "La visite d'inspection effectuée les 17 et 18 août 2026 porte sur le bâtiment R+7 recevant du public qui accueille le nouveau siège du Groupe LGF Média à Bonfi (Conakry). L'ouvrage est en phase de second œuvre et de finitions : pose des menuiseries extérieures, des cloisons et des revêtements de sol.",
      "Bien que l'avancement global soit significatif, l'inspection révèle de multiples non-conformités, des malfaçons majeures et des manquements aux règles de l'art susceptibles de compromettre la durabilité de l'ouvrage, la salubrité des locaux et la sécurité des intervenants.",
      "Les points critiques à traiter en urgence s'articulent autour de six axes principaux :",
    ],
    axes: [
      ["Infiltrations d'eau généralisées et récurrentes", "locaux bas inondés, baies non étanches, toiture-terrasse défectueuse."],
      ["Manquements graves aux règles de sécurité", "escaliers sans garde-corps provisoires, câbles sous tension en milieu humide."],
      ["Atteintes à l'intégrité de la structure et des réseaux", "saignées trop profondes, trémies non rebouchées."],
      ["Insalubrité et risque d'incendie", "gaines techniques et voies de circulation encombrées de déchets."],
      ["Défauts de protection des soubassements", "terres rapportées directement contre la façade, sans drainage."],
      ["Non-conformités d'aspect et de qualité", "mélange de teintes des revêtements de sol."],
    ],
  },
  chapitres: [
    {
      n: "2", titre: "Étanchéité et gestion des infiltrations d'eau",
      intro: "Les désordres liés à l'eau constituent le point le plus alarmant du chantier. Leur répétition sur plusieurs niveaux révèle un défaut d'exécution systématique des détails d'étanchéité.",
      items: [
        {
          n: "2.1", titre: "Inondation critique en partie basse (rez-de-chaussée)", g: "CRITIQUE",
          constat: "Stagnation de plusieurs centimètres d'eau au sol du local. Les parois verticales et la sous-face des poutres présentent des coulures noires, des cloques et un décollement généralisé des enduits.",
          analyse: "Infiltration active provenant des niveaux supérieurs (défaut d'étanchéité de la toiture-terrasse ou rupture d'une canalisation d'évacuation EU/EP), aggravée par l'absence d'évacuation de secours au sol. Les traces noires de développement biologique confirment une exposition prolongée à des cycles répétés d'humidification et de séchage.",
          risques: [
            "Prolifération de moisissures toxiques (insalubrité).",
            "Corrosion prématurée des armatures du béton armé, favorisée par l'humidité permanente.",
            "Risque d'électrocution lors de la remise sous tension des circuits.",
          ],
          preco: [
            "Localiser et supprimer la source d'infiltration (mise en eau, inspection des réseaux).",
            "Mettre en place un pompage d'urgence et une ventilation mécanique pour assécher le local.",
            "Piocher intégralement les enduits dégradés, appliquer un traitement fongicide et assainir les supports.",
            "Créer un point de vidange (siphon de sol) raccordé au réseau.",
          ],
        },
        {
          n: "2.2", titre: "Infiltrations récurrentes au droit des baies vitrées", g: "CRITIQUE",
          constat: "Traces d'humidité, moisissures et décollement de l'enduit sur les tableaux, les linteaux et les angles supérieurs des menuiseries extérieures, constatés de façon identique dans plusieurs locaux.",
          analyse: "Rupture d'étanchéité à la jonction gros œuvre / menuiserie : absence probable de calfeutrement périphérique (compribande, mastic élastomère sur fond de joint) et rejingot absent ou mal conçu en appui de baie.",
          risques: [
            "Dégradation de la qualité de l'air intérieur.",
            "Ruine des doublages et des isolants intérieurs, décollement des peintures.",
          ],
          preco: [
            "Reprendre l'étanchéité périphérique extérieure de la totalité des baies (fond de joint et mastic élastomère de 1re catégorie).",
            "Vérifier les pentes et les rejingots de l'ensemble des appuis de fenêtre.",
            "Après séchage complet, purger les enduits intérieurs dégradés et réappliquer un système de finition perméable à la vapeur d'eau.",
          ],
        },
        {
          n: "2.3", titre: "Étanchéité de la toiture-terrasse et points singuliers", g: "MAJEUR",
          constat: "Application discontinue et irrégulière du complexe d'étanchéité bitumineux sur les relevés d'acrotère. Absence de pentes d'écoulement visibles et présence de zones de rétention d'eau.",
          analyse: "Forme de pente mal exécutée et traitement non conforme des points singuliers (relevés d'étanchéité, entrées d'eaux pluviales).",
          risques: [
            "Infiltrations importantes à travers la dalle vers les niveaux inférieurs.",
            "Dégradation du béton de structure par la stagnation d'eau.",
          ],
          preco: [
            "Confier à une entreprise spécialisée la révision intégrale de la membrane d'étanchéité et des relevés.",
            "Réaliser une épreuve d'étanchéité (mise en eau pendant 24 à 48 h) avant la pose de toute protection lourde ou de tout revêtement.",
          ],
        },
        {
          n: "2.4", titre: "Infiltrations en sous-face des coursives et balcons", g: "MAJEUR",
          constat: "Auréoles, efflorescences et coulures sombres visibles en sous-face de la dalle de la coursive extérieure.",
          analyse: "Pénétration des eaux de pluie à travers la dalle, faute de larmier (goutte d'eau) en nez de dalle et d'étanchéité efficace sur la face supérieure.",
          risques: [
            "Carbonatation du béton et corrosion des armatures.",
            "Décollement des enduits de sous-face.",
          ],
          preco: [
            "Créer ou reprendre le larmier en sous-face du nez de coursive et de balcon.",
            "Appliquer un système d'étanchéité liquide (SEL) ou un revêtement imperméable sur la face supérieure des coursives.",
          ],
        },
      ],
    },
    {
      n: "3", titre: "Gros œuvre, maçonnerie et réseaux encastrés",
      items: [
        {
          n: "3.1", titre: "Saignées murales non conformes et non rebouchées", g: "MAJEUR",
          constat: "Saignées verticales excessivement profondes dans les voiles et les maçonneries. Les câbles et fourreaux électriques sont laissés apparents, sans rebouchage.",
          analyse: "Non-respect du DTU 20.1 et des règles de l'art : la profondeur dépasse les limites admises et réduit la section résistante du mur. Dans les voiles en béton armé, aucune saignée ne doit être réalisée sans l'accord du bureau d'études structure.",
          risques: [
            "Fissuration du support et affaiblissement de la structure.",
            "Baisse de la résistance au feu.",
            "Risque de percement ultérieur des conduits non protégés.",
          ],
          preco: [
            "Soumettre les saignées existantes à la validation du bureau d'études techniques (BET structure).",
            "Reboucher soigneusement sur toute la profondeur au mortier hydraulique à faible retrait.",
          ],
        },
        {
          n: "3.2", titre: "Trémies et réservations non rebouchées dans les dalles", g: "MAJEUR",
          constat: "Percements bruts dans les dalles et plafonds pour le passage des canalisations, sans rebouchage. Armatures parfois sectionnées ou laissées à nu.",
          analyse: "Rupture du compartimentage coupe-feu et de l'isolement acoustique entre niveaux.",
          risques: [
            "Propagation d'un incendie d'un niveau à l'autre.",
            "Transmission des bruits entre niveaux.",
            "Corrosion des armatures.",
          ],
          preco: [
            "Faire vérifier par le BET structure les zones où des armatures ont été sectionnées.",
            "Brosser et traiter les armatures apparentes avec un passivant anticorrosion.",
            "Réaliser au droit de chaque trémie un calfeutrement coupe-feu réglementaire (mortier coupe-feu ou mastic intumescent sous avis technique).",
          ],
        },
      ],
    },
    {
      n: "4", titre: "Sécurité du chantier et prévention des risques",
      items: [
        {
          n: "4.1", titre: "Absence de protections collectives dans les escaliers", g: "CRITIQUE",
          constat: "Circulation du personnel dans la cage d'escalier principale en béton brut, totalement dépourvue de garde-corps provisoires ou définitifs.",
          analyse: "Manquement grave aux règles de sécurité du chantier relatives à la prévention des chutes de hauteur.",
          risques: ["Chute mortelle ou accident grave du travail."],
          preco: [
            "Interdire immédiatement l'accès à la cage d'escalier non protégée.",
            "Installer sans délai des garde-corps provisoires conformes (lisse, sous-lisse, plinthe) ou les garde-corps définitifs.",
          ],
        },
        {
          n: "4.2", titre: "Câbles électriques sous tension apparents et exposés à l'humidité", g: "CRITIQUE",
          constat: "Faisceaux électriques dénudés et pendants le long des murs, parfois à proximité de zones d'eau stagnante.",
          analyse: "Câbles non protégés (ni conduit ni goulotte) et circuits non consignés.",
          risques: ["Électrocution ou électrisation des intervenants.", "Départ d'incendie."],
          preco: [
            "Consigner immédiatement l'armoire électrique de chantier.",
            "Isoler les extrémités par des connecteurs (type Wago) et placer tous les câbles en attente dans des boîtes de dérivation.",
          ],
        },
        {
          n: "4.3", titre: "Encombrement des circulations et des dégagements", g: "MAJEUR",
          constat: "Paliers et couloirs obstrués par des gravats, des débris de matériaux et des flaques d'eau.",
          analyse: "Défaut d'organisation générale du chantier et absence de plan d'évacuation des déchets.",
          risques: ["Chutes de plain-pied.", "Évacuation bloquée en cas d'urgence."],
          preco: ["Dégager immédiatement les passages et assurer un nettoyage quotidien des circulations."],
        },
      ],
    },
    {
      n: "5", titre: "Hygiène, propreté et gestion des déchets",
      items: [
        {
          n: "5.1", titre: "Engorgement des gaines techniques", g: "MAJEUR",
          constat: "Les gaines techniques verticales servent de zones de stockage et de dépotoirs pour les matériaux usagés et les ordures ménagères.",
          analyse: "Absence d'obturateurs provisoires sur les ouvertures des gaines.",
          risques: [
            "Risque d'incendie très élevé (forte charge combustible dans un conduit vertical).",
            "Prolifération de nuisibles.",
          ],
          preco: [
            "Vider et nettoyer intégralement toutes les gaines techniques du bâtiment.",
            "Condamner provisoirement l'accès aux gaines par des panneaux ou des portes verrouillées.",
          ],
        },
        {
          n: "5.2", titre: "Accumulation de débris et d'ordures en pied de façade", g: "MINEUR",
          constat: "Accumulation de déchets de chantier et d'ordures au pied des façades.",
          analyse: "Absence d'aire délimitée pour le tri et le stockage des déchets.",
          risques: ["Nuisances pour l'environnement et le voisinage.", "Dégradation de l'image du projet."],
          preco: ["Aménager aux abords du chantier une zone clôturée de tri et de bennes."],
        },
      ],
    },
    {
      n: "6", titre: "Terrassements, abords et drainage",
      items: [
        {
          n: "6.1", titre: "Terres meubles adossées à la structure", g: "MAJEUR",
          constat: "Talus de terre meuble directement au contact des murs de façade, en partie basse.",
          analyse: "Absence de protection du soubassement (membrane à excroissances de type Delta-MS) et absence de drainage périphérique.",
          risques: ["Remontées capillaires et infiltrations directes.", "Détérioration du revêtement de façade."],
          preco: [
            "Dégager les terres sur une largeur d'au moins 50 cm le long de la façade.",
            "Appliquer une étanchéité de soubassement et poser un drain périphérique raccordé au réseau d'eaux pluviales.",
          ],
        },
      ],
    },
    {
      n: "7", titre: "Second œuvre et qualité des finitions",
      items: [
        {
          n: "7.1", titre: "Panachage non conforme des revêtements de sol", g: "MINEUR",
          constat: "Lames de revêtement de sol (stratifié ou PVC) de bains ou de teintes visiblement différents posées côte à côte dans les mêmes pièces et couloirs.",
          analyse: "Absence de contrôle des lots à la livraison, ou stock initial épuisé et complété par une référence approchante.",
          risques: ["Non-conformité d'aspect.", "Refus à la réception par le maître d'ouvrage."],
          preco: ["Déposer les parties non conformes et réapprovisionner un lot unique pour harmoniser l'ensemble."],
        },
        {
          n: "7.2", titre: "Contrôle dimensionnel de la cage d'escalier", g: "MINEUR",
          constat: "Mesures des hauteurs de marche et des girons en cours par les équipes sur site.",
          analyse: "Contrôle préventif avant la pose du revêtement définitif.",
          risques: [
            "Risque de trébuchement si la relation de Blondel (2 h + g compris entre 60 et 64 cm) et la régularité des hauteurs ne sont pas respectées à chaque marche. Pour un établissement recevant du public, viser h ≤ 16 cm et g ≥ 28 cm.",
          ],
          preco: [
            "Renseigner une fiche d'autocontrôle pour chaque volée et corriger les écarts au mortier de ragréage adapté avant la pose de la finition.",
          ],
        },
      ],
    },
  ],
  plan: [
    {
      p: "Priorité 1", delai: "Urgence absolue – sous 8 jours",
      actions: [
        ["Sécurité", "Poser des garde-corps provisoires rigides dans toute la cage d'escalier.", "4.1"],
        ["Sécurité", "Consigner, sécuriser et isoler les câbles électriques dénudés ou pendants.", "4.2"],
        ["Pérennité", "Assécher le local inondé du rez-de-chaussée et supprimer la fuite.", "2.1"],
        ["Salubrité", "Dégager les coursives et les circulations.", "4.3"],
        ["Incendie", "Vider les gaines techniques et en condamner l'accès.", "5.1"],
      ],
    },
    {
      p: "Priorité 2", delai: "Traitement technique – sous 4 à 6 semaines",
      actions: [
        ["Étanchéité", "Reprendre les joints de calfeutrement périphériques de toutes les menuiseries extérieures.", "2.2"],
        ["Étanchéité", "Reprendre les relevés de la toiture-terrasse, puis réaliser l'épreuve de mise en eau.", "2.3"],
        ["Étanchéité", "Créer les larmiers et étancher la face supérieure des coursives.", "2.4"],
        ["Gros œuvre", "Calfeutrer les trémies avec des matériaux coupe-feu et reboucher les saignées.", "3.1 – 3.2"],
        ["Abords", "Dégager le remblai en pied de façade et poser le drain de soubassement.", "6.1"],
      ],
    },
    {
      p: "Priorité 3", delai: "Finitions et conformité – avant réception",
      actions: [
        ["Finitions", "Uniformiser les teintes des revêtements de sol.", "7.1"],
        ["Finitions", "Valider le carnet de cotes de l'escalier (relation de Blondel).", "7.2"],
        ["Propreté", "Aménager la zone de tri clôturée et évacuer l'ensemble des déchets.", "5.2"],
      ],
    },
  ],
  recommandation: [
    "Compte tenu de la récurrence des désordres d'étanchéité observés au droit des menuiseries extérieures dans plusieurs locaux, il est fortement déconseillé d'engager des réparations au cas par cas.",
    "Il est préconisé au maître d'ouvrage d'exiger immédiatement du maître d'œuvre et du bureau de contrôle un audit complet du carnet de détails d'exécution (coupes de principe appui / tableau / linteau). Ce mode opératoire doit être révisé et validé formellement avant toute reprise sur l'ouvrage et avant l'achèvement des locaux restants.",
  ],
  fait: "Fait à Conakry, le 18 août 2026",
  signataire: ["Lucien Bakole GUILAVOGUI", "Architecte"],
};
