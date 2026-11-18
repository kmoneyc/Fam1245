class KingdomRankImporter:
    def parse_rows(self, rows):
        players=[]
        for row in rows:
            players.append({
                "rank": row.get("rank"),
                "name": row.get("name"),
                "alliance": row.get("alliance"),
                "power": row.get("power")
            })
        return players
