const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Link Shortner",
			version: "1.0.0",
			description: "Generate a shortened version of longer links",
		},
		servers: [
			// {
			// 	url: "https://dpay-api.herokuapp.com/",
			// },
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

module.exports = options;