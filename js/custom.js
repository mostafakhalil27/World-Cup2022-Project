const token = "b593afa6995347e7b22964fe3c8d5a30";
let baseUrl = "https://api.football-data.org/v4/competitions/2000"

    function getStandings()
    {
        const url = `${baseUrl}/standings`

        axios.get(url, {
            headers: {
                "X-Auth-Token": token
            }
        })
        .then((response) => {

            const standings = response.data.standings

            document.getElementById("groups").innerHTML = "     "

            for(standing of standings){

                let tableContent = ` `

            
                for(row of standing.table){

                    tableContent += `
                    <tbody>
                        <tr>
                            <td><img src="`+ row.team.crest + `" class="flag d-inline border border-2" style="object-fit: cover;" ><p class="d-inline team-word">`  + row.team.tla +  `</p></td>
                            <td> ` + row.won  +  `</td>
                            <td>` + row.lost  +  ` </td>
                            <td>  ` + row.draw  +  ` </td>
                            <td>` + row.points  +  `</td>
                        </tr>
                    </tbody>
                    `
                }

                const content = `
                <div class="left shadow ">
                <div class="text-center group-stage"  >
                    <p class="mb-0">` + standing.group +  `</p>
                </div>
                  <table class="mt-0 text-center">
                    <thead>
                        <tr>
                            <th>team</th>
                            <th>W</th>
                            <th>L</th>
                            <th>D</th>
                            <th>Pts</th>
                            ` + tableContent + `
                        </tr>
                    </thead>
                  </table>
            </div>
                `
                document.getElementById("groups").innerHTML += content
            
            }

        })
    }
    getStandings()





    function getMatches()
    {
        const url = `${baseUrl}/matches`
        axios.get(url, {
            headers: {
                "X-Auth-Token": token
            }
        })
        .then((response) => {
            const matches = response.data.matches 
            document.getElementById("matches").innerHTML = ""
            
            for( match of matches){
                const homeTeam = match.homeTeam 
                const awayTeam = match.awayTeam

                const utcDate = match.utcDate
                const matchTime = new Date(utcDate)
                const dateString = matchTime.getUTCFullYear() +"/"+ (matchTime.getUTCMonth()+1) +"/"+ matchTime.getUTCDate() + " " + matchTime.getUTCHours() + ":" + matchTime.getUTCMinutes() + ":" + matchTime.getUTCSeconds()
            const content = `
           
            <div id="matches">
              <div class="forth-section d-flex mt-5">
                    <div class="same left-div text-center " style= "height:110px;">
                        <img src=" ` + homeTeam.crest + ` " class="flag"><p class="team-name">${homeTeam.tla}</p>
                    </div>
                    <!-- VERSUS COL -->
                    <div class="col-lg-6 border border-2" style="text-align: center; height:110px;">
                        <div class="row">
                            <div class="col-lg-4" style="margin: auto 0px">
                                <h3>
                                    ${match.score.fullTime.home ?? '-'}
                                </h3>
                            </div>

                            <div class="col-lg-4">
                                <h6>${match.stage}</h6>
                                <h1>X</h1>                                        
                                <h6>${dateString}</h6>
                            </div>

                            <div class="col-lg-4" style="margin: auto 0px">
                                <h3>
                                    ${match.score.fullTime.away ?? '-'}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <!--// VERSUS COL //-->
                    <div class="same right-div text-center" style=" margin: 0 10px 0 0; height:110px;">
                        <img src="${awayTeam.crest}" class="flag"><p class="team-name">${awayTeam.tla}</p> 
                    </div>
                </div>
            </div>    
                `
                document.getElementById("matches").innerHTML += content
            }
        })
    }
    getMatches()



        
       
        
    