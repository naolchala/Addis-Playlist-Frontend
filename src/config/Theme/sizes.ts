import facepaint from "facepaint";
export const buttonSizes = {
	xl: {
		padding: "1rem 3rem",
		fontSize: "1.2rem",
	},
	lg: { padding: ".9rem 2rem", fontSize: "1.1rem" },
	md: { padding: ".8rem 1.5rem", fontSize: "1rem" },
	sm: {
		padding: ".6rem 1rem",
		fontSize: ".9rem",
	},
};

export const cardSizes = {
	playlistCard: "240px",
};

export const breakpoints = [576, 768, 992, 1200];

export const mediaQuery = facepaint(
	breakpoints.map((bq) => `@media (min-width: ${bq}px)`)
);
