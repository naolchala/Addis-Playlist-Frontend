import facepaint from "facepaint";
export const buttonSizes = {
	xl: {
		padding: "1rem 3rem",
		fontSize: "1.2rem",
		iconBtnSize: "3rem",
	},
	lg: { padding: ".9rem 2rem", fontSize: "1.1rem", iconBtnSize: "2.7em" },
	md: { padding: ".8rem 1.5rem", fontSize: "1rem", iconBtnSize: "2.5em" },
	sm: {
		padding: ".6rem 1rem",
		fontSize: ".9rem",
		iconBtnSize: "1.5em",
	},
	xs: {
		padding: ".5rem 1rem",
		fontSize: ".8rem",
		iconBtnSize: "1em",
	},
};

export const textFieldSizes = {
	xl: {
		fontSize: "1.3em",
		padding: "15px",
	},
	lg: {
		fontSize: "1.1em",
		padding: "10px",
	},
	md: {
		fontSize: "1em",
		padding: "10px",
	},
	sm: {
		fontSize: ".9em",
		padding: "10px",
	},
};

export const cardSizes = {
	playlistCard: "240px",
};

export const breakpoints = [576, 768, 992, 1200];

export const mediaQuery = facepaint(
	breakpoints.map((bq) => `@media (min-width: ${bq}px)`)
);
