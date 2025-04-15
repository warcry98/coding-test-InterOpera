class BuildSummary:
    def __init__(self, data):
        self.data = data

    def summary(self):
        if self.data:
            summary_lines = []
            for rep in self.data["salesReps"]:
                sales_summary = f"{rep['name']} ({rep['role']}, {rep['region']})"
                skills_summary = f"Skills: {', '.join(rep['skills'])}"
                deals_text = ", ".join(
                    [f"{deal['client']} (${deal['value']}, {deal['status']})" for deal in rep["deals"]]
                )
                client_text = ", ".join(
                    [f"{client['name']} ({client['industry']}, {client['contact']})" for client in rep["clients"]]
                )
                summary_lines.append(f"{sales_summary} - {skills_summary}. Deals: {deals_text}. Clients: {client_text}")

            summary = "\n".join(summary_lines)
            return summary
        else:
            return None
