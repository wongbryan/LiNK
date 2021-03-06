const SHADERS = {

	monochrome: {

		uniforms: {

	        "tDiffuse": { value: null },
	        "magnitude": { value: 1. },
	        "darkness": { value: .33 },
	        "delta" : { value : null },

	    },

		vertexShader: [

			"varying highp vec2 vUv;",

			"void main(){",

				"vUv = uv;",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}",

		].join('\n'),

		fragmentShader: [

			"uniform float darkness;",
			"uniform float magnitude;",
			"uniform sampler2D tDiffuse;",

			"varying highp vec2 vUv;",

			"void main(){",

				"vec3 color = texture2D(tDiffuse, vUv).rgb;",
				"vec3 amt = vec3(0.3, .11, 0.59);",
				"vec3 gray = vec3(dot(amt, color));",

				"gl_FragColor = vec4(mix(color, gray, magnitude)-darkness, 1.0);",

			"}",

		].join('\n'),

	},

}