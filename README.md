This project is built using HTML, CSS, and Javascript. The project will build a visual push/fold range chart with slider/wheel scroll event to interact with the chart.

<table id="bloch_jam">
					<tr>
						<td class="pair">AA</td>
						<td class="suited">AKs</td>
						<td class="unsuited">AKo</td>
						<td class="pair">KK</td>
						<td class="suited">A4s</td>
						<td class="suited">A5s</td>
						<td class="pair">QQ</td>
						<td class="suited">AQs</td>
						<td class="pair">JJ</td>
						<td class="pair">TT</td>
						<td class="suited">AJs</td>
						<td class="suited">KQs</td>
						<td class="unsuited">AQo</td>
					</tr>
					<tr>
						<td class="suited">ATs</td>
						<td class="suited">KJs</td>
						<td class="suited">QJs</td>
						<td class="suited">KTs</td>
						<td class="pair">99</td>
						<td class="suited">QTs</td>
						<td class="pair">88</td>
						<td class="unsuited">AJo</td>
						<td class="suited">JTs</td>
						<td class="pair">66</td>
						<td class="pair">77</td>
						<td class="pair">55</td>
						<td class="suited">A9s</td>
					</tr>
					<tr>
						<td class="unsuited">KQo</td>
						<td class="suited">K9s</td>
						<td class="pair">44</td>
						<td class="suited">T9s</td>
						<td class="suited">A8s</td>
						<td class="suited">J9s</td>
						<td class="suited">Q9s</td>
						<td class="unsuited">KJo</td>
						<td class="pair">33</td>
						<td class="unsuited">ATo</td>
						<td class="suited">A7s</td>
						<td class="suited">K8s</td>
						<td class="suited">A3s</td>
					</tr>
					<tr>
						<td class="suited">T8s</td>
						<td class="suited">98s</td>
						<td class="pair">22</td>
						<td class="suited">A6s</td>
						<td class="suited">Q8s</td>
						<td class="unsuited">QJo</td>
						<td class="suited">J8s</td>
						<td class="suited">K7s</td>
						<td class="suited">A2s</td>
						<td class="unsuited">A9o</td>
						<td class="unsuited">A8o</td>
						<td class="suited">87s</td>
						<td class="unsuited">A7o</td>
					</tr>
					<tr>
						<td class="unsuited">QTo</td>
						<td class="unsuited">JTo</td>
						<td class="unsuited">KTo</td>
						<td class="unsuited">A5o</td>
						<td class="suited">K6s</td>
						<td class="suited">T7s</td>
						<td class="suited">97s</td>
						<td class="suited">76s</td>
						<td class="unsuited">A4o</td>
						<td class="unsuited">A6o</td>
						<td class="suited">K5s</td>
						<td class="suited">J7s</td>
						<td class="suited">86s</td>
					</tr>
					<tr>
						<td class="unsuited">A3o</td>
						<td class="unsuited">A2o</td>
						<td class="suited">65s</td>
						<td class="suited">Q6s</td>
						<td class="unsuited">T9o</td>
						<td class="suited">96s</td>
						<td class="suited">Q7s</td>
						<td class="suited">K4s</td>
						<td class="unsuited">K9o</td>
						<td class="unsuited">J9o</td>
						<td class="suited">75s</td>
						<td class="suited">54s</td>
						<td class="unsuited">Q9o</td>
					</tr>
					<tr>
						<td class="suited">T6s</td>
						<td class="suited">K3s</td>
						<td class="suited">Q5s</td>
						<td class="unsuited">98o</td>
						<td class="suited">K2s</td>
						<td class="suited">J6s</td>
						<td class="suited">85s</td>
						<td class="unsuited">K8o</td>
						<td class="unsuited">K7o</td>
						<td class="unsuited">T8o</td>
						<td class="suited">64s</td>
						<td class="unsuited">K6o</td>
						<td class="suited">Q4s</td>
					</tr>
					<tr>
						<td class="suited">J5s</td>
						<td class="unsuited">K5o</td>
						<td class="suited">Q3s</td>
						<td class="suited">J4s</td>
						<td class="suited">95s</td>
						<td class="unsuited">87o</td>
						<td class="unsuited">Q8o</td>
						<td class="unsuited">K4o</td>
						<td class="unsuited">J8o</td>
						<td class="unsuited">K3o</td>
						<td class="unsuited">K2o</td>
						<td class="suited">Q2s</td>
						<td class="suited">74s</td>
					</tr>
					<tr>
						<td class="suited">J3s</td>
						<td class="suited">T5s</td>
						<td class="suited">T4s</td>
						<td class="unsuited">97o</td>
						<td class="unsuited">Q7o</td>
						<td class="unsuited">Q6o</td>
						<td class="unsuited">76o</td>
						<td class="unsuited">Q5o</td>
						<td class="unsuited">T7o</td>
						<td class="unsuited">J7o</td>
						<td class="suited">J2s</td>
						<td class="unsuited">Q4o</td>
						<td class="suited">84s</td>
					</tr>
					<tr>
						<td class="unsuited">Q3o</td>
						<td class="suited">T3s</td>
						<td class="unsuited">86o</td>
						<td class="unsuited">J6o</td>
						<td class="unsuited">J5o</td>
						<td class="suited">T2s</td>
						<td class="suited">94s</td>
						<td class="unsuited">J4o</td>
						<td class="unsuited">T6o</td>
						<td class="unsuited">J3o</td>
						<td class="unsuited">96o</td>
						<td class="unsuited">J2o</td>
						<td class="suited">93s</td>
					</tr>
					<tr>
						<td class="unsuited">T5o</td>
						<td class="unsuited">T4o</td>
						<td class="unsuited">95o</td>
						<td class="unsuited">T3o</td>
						<td class="suited">92s</td>
						<td class="unsuited">T2o</td>
						<td class="unsuited">85o</td>
						<td class="suited">83s</td>
						<td class="unsuited">75o</td>
						<td class="suited">82s</td>
						<td class="unsuited">94o</td>
						<td class="unsuited">93o</td>
						<td class="unsuited">65o</td>
					</tr>
					<tr>
						<td class="suited">73s</td>
						<td class="suited">53s</td>
						<td class="suited">63s</td>
						<td class="unsuited">84o</td>
						<td class="suited">43s</td>
						<td class="unsuited">74o</td>
						<td class="unsuited">54o</td>
						<td class="suited">72s</td>
						<td class="unsuited">64o</td>
						<td class="suited">52s</td>
						<td class="unsuited">92o</td>
						<td class="suited">62s</td>
						<td class="unsuited">83o</td>
					</tr>
					<tr>
						<td class="suited">42s</td>
						<td class="unsuited">82o</td>
						<td class="unsuited">73o</td>
						<td class="unsuited">53o</td>
						<td class="unsuited">63o</td>
						<td class="suited">32s</td>
						<td class="unsuited">43o</td>
						<td class="unsuited">72o</td>
						<td class="unsuited">52o</td>
						<td class="unsuited">62o</td>
						<td class="unsuited">42o</td>
						<td class="unsuited">32o</td>
						<td class="unsuited">Q2o</td>
					</tr>
				</table>

        <table id="bloch_call">
    				<tr>
    					<td class="pair">AA</td>
    					<td class="pair">KK</td>
    					<td class="suited">AKs</td>
    					<td class="pair">QQ</td>
    					<td class="unsuited">AKo</td>
    					<td class="pair">JJ</td>
    					<td class="pair">TT</td>
    					<td class="suited">AQs</td>
    					<td class="pair">99</td>
    					<td class="unsuited">AQo</td>
    					<td class="pair">88</td>
    					<td class="suited">AJs</td>
    					<td class="pair">77</td>
    				</tr>
    				<tr>
    					<td class="suited">ATs</td>
    					<td class="unsuited">AJo</td>
    					<td class="pair">66</td>
    					<td class="suited">KQs</td>
    					<td class="unsuited">ATo</td>
    					<td class="suited">A9s</td>
    					<td class="suited">KJs</td>
    					<td class="suited">A8s</td>
    					<td class="pair">55</td>
    					<td class="unsuited">KQo</td>
    					<td class="unsuited">A9o</td>
    					<td class="suited">A7s</td>
    					<td class="unsuited">A8o</td>
    				</tr>
    				<tr>
    					<td class="suited">KTs</td>
    					<td class="suited">A6s</td>
    					<td class="pair">44</td>
    					<td class="suited">A5s</td>
    					<td class="unsuited">A7o</td>
    					<td class="suited">QJs</td>
    					<td class="suited">A4s</td>
    					<td class="unsuited">KJo</td>
    					<td class="suited">A3s</td>
    					<td class="suited">A2s</td>
    					<td class="suited">K9s</td>
    					<td class="unsuited">KTo</td>
    					<td class="pair">33</td>
    				</tr>
    				<tr>
    					<td class="suited">QTs</td>
    					<td class="unsuited">A5o</td>
    					<td class="unsuited">A6o</td>
    					<td class="unsuited">QJo</td>
    					<td class="suited">K8s</td>
    					<td class="suited">JTs</td>
    					<td class="unsuited">A4o</td>
    					<td class="unsuited">K9o</td>
    					<td class="unsuited">A3o</td>
    					<td class="suited">Q9s</td>
    					<td class="unsuited">A2o</td>
    					<td class="suited">K7s</td>
    					<td class="unsuited">QTo</td>
    				</tr>
    				<tr>
    					<td class="pair">22</td>
    					<td class="suited">K6s</td>
    					<td class="unsuited">K8o</td>
    					<td class="suited">Q8s</td>
    					<td class="suited">K5s</td>
    					<td class="suited">J9s</td>
    					<td class="unsuited">K7o</td>
    					<td class="unsuited">JTo</td>
    					<td class="unsuited">Q9o</td>
    					<td class="suited">K4s</td>
    					<td class="suited">K3s</td>
    					<td class="suited">T9s</td>
    					<td class="unsuited">K6o</td>
    				</tr>
    				<tr>
    					<td class="suited">Q7s</td>
    					<td class="suited">J8s</td>
    					<td class="suited">K2s</td>
    					<td class="unsuited">Q8o</td>
    					<td class="suited">Q6s</td>
    					<td class="unsuited">K5o</td>
    					<td class="unsuited">J9o</td>
    					<td class="suited">T8s</td>
    					<td class="suited">Q5s</td>
    					<td class="unsuited">K4o</td>
    					<td class="suited">J7s</td>
    					<td class="unsuited">K3o</td>
    					<td class="suited">Q4s</td>
    				</tr>
    				<tr>
    					<td class="unsuited">T9o</td>
    					<td class="suited">98s</td>
    					<td class="unsuited">Q7o</td>
    					<td class="suited">Q3s</td>
    					<td class="unsuited">K2o</td>
    					<td class="suited">J3s</td>
    					<td class="unsuited">J8o</td>
    					<td class="unsuited">Q6o</td>
    					<td class="suited">T7s</td>
    					<td class="suited">Q2s</td>
    					<td class="suited">J6s</td>
    					<td class="unsuited">Q5o</td>
    					<td class="suited">J5s</td>
    				</tr>
    				<tr>
    					<td class="suited">97s</td>
    					<td class="suited">87s</td>
    					<td class="unsuited">T8o</td>
    					<td class="unsuited">J7o</td>
    					<td class="unsuited">Q4o</td>
    					<td class="suited">T6s</td>
    					<td class="suited">J4s</td>
    					<td class="unsuited">Q3o</td>
    					<td class="unsuited">98o</td>
    					<td class="suited">96s</td>
    					<td class="suited">86s</td>
    					<td class="unsuited">T7o</td>
    					<td class="unsuited">J6o</td>
    				</tr>
    				<tr>
    					<td class="unsuited">Q2o</td>
    					<td class="suited">J2s</td>
    					<td class="suited">T5s</td>
    					<td class="suited">76s</td>
    					<td class="unsuited">J5o</td>
    					<td class="suited">T4s</td>
    					<td class="unsuited">97o</td>
    					<td class="unsuited">J4o</td>
    					<td class="suited">95s</td>
    					<td class="suited">T3s</td>
    					<td class="suited">65s</td>
    					<td class="unsuited">87o</td>
    					<td class="suited">85s</td>
    				</tr>
    				<tr>
    					<td class="suited">75s</td>
    					<td class="suited">54s</td>
    					<td class="unsuited">T6o</td>
    					<td class="unsuited">J3o</td>
    					<td class="suited">T2s</td>
    					<td class="suited">94s</td>
    					<td class="unsuited">96o</td>
    					<td class="suited">64s</td>
    					<td class="suited">84s</td>
    					<td class="suited">74s</td>
    					<td class="unsuited">86o</td>
    					<td class="unsuited">76o</td>
    					<td class="suited">53s</td>
    				</tr>
    				<tr>
    					<td class="unsuited">J2o</td>
    					<td class="unsuited">T5o</td>
    					<td class="unsuited">T4o</td>
    					<td class="suited">93s</td>
    					<td class="unsuited">95o</td>
    					<td class="suited">92s</td>
    					<td class="suited">43s</td>
    					<td class="suited">63s</td>
    					<td class="suited">83s</td>
    					<td class="unsuited">65o</td>
    					<td class="suited">73s</td>
    					<td class="unsuited">85o</td>
    					<td class="unsuited">75o</td>
    				</tr>
    				<tr>
    					<td class="suited">82s</td>
    					<td class="suited">52s</td>
    					<td class="unsuited">T3o</td>
    					<td class="unsuited">T2o</td>
    					<td class="unsuited">94o</td>
    					<td class="unsuited">54o</td>
    					<td class="suited">42s</td>
    					<td class="suited">62s</td>
    					<td class="suited">72s</td>
    					<td class="unsuited">64o</td>
    					<td class="suited">32s</td>
    					<td class="unsuited">84o</td>
    					<td class="unsuited">74o</td>
    				</tr>
    				<tr>
    					<td class="unsuited">53o</td>
    					<td class="unsuited">43o</td>
    					<td class="unsuited">93o</td>
    					<td class="unsuited">92o</td>
    					<td class="unsuited">63o</td>
    					<td class="unsuited">83o</td>
    					<td class="unsuited">82o</td>
    					<td class="unsuited">73o</td>
    					<td class="unsuited">52o</td>
    					<td class="unsuited">42o</td>
    					<td class="unsuited">72o</td>
    					<td class="unsuited">62o</td>
    					<td class="unsuited">32o</td>
    				</tr>
    			</table>
