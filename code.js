	function calculateTimeOnSite() {
            var endTime = new Date();
            var timeSpent = endTime - startTime; // Time in milliseconds

            // Convert milliseconds to seconds
            var timeSpentSeconds = Math.floor(timeSpent / 1000);

            return timeSpentSeconds;
    }
	
	function getSpecificQueryParams() {
        let params = {};
        let queryString = window.location.search.substring(1);
        let regex = /([^&=]+)=([^&]*)/g;
        let m;
        let desiredParams = ['PROLIFIC_PID', 'QUALTRICS_ID', 'STUDY_ID', 'SESSION_ID', 'GROUP'];
        while (m = regex.exec(queryString)) {
            let paramName = decodeURIComponent(m[1]);
            if (desiredParams.includes(paramName)) {
                params[paramName] = decodeURIComponent(m[2]);
            }
        }
        return params;
    }

	function redirectToQualtrics() {
		if (typeof startTime !== 'undefined') {
			let params = getSpecificQueryParams();
			let baseUrl = 'https://neuchatel.eu.qualtrics.com/jfe/form/SV_a8Iy0axKqHN0vMq';
			let timeSpent = calculateTimeOnSite();
			if (timeSpent > 10){
				params['timeSpent'] = timeSpent;
				// Add hover data to the params
				let queryString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
				let url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
				window.location.href = url;
			}else{
				alert('Please spend more time onsite.');
			}
		} else {
			alert('Please spend more time onsite.');
		}
    }