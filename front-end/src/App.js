import React, { Component } from "react";
import axios from "axios";
import Map from "./components/Map";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Chart1 from "./components/BarChart";
import Chart2 from "./components/BarChart2";
import Chart3 from "./components/BarChart3";
import Chart4 from "./components/BarChart4";
import Chart5 from "./components/BarChart5";

import "./App.css";

const initialState = {
  colors: [
    "rgba(5, 155, 247, 0.7)",
    "rgba(233,30,99,0.7)",
    "rgba(53,211,156,0.7)",
    "rgba(257,234,13,0.7)"
  ],
  states_data: [],
  data_loaded: false,
  fields: ["sentiment_score", "tweet_counts","median_house_price","unemployed_rate", "weekly_household_income","average_monthly_mortgage","median_personal_income"],
  query: "sentiment_score",
};
class App extends Component {
  state = initialState;

  componentDidMount() {
    this.fetchStateData();
  }

  fetchStateData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/front_end/output/out_data.json",
      });
      console.log(response)
      const states_data = this.processData(response.data);
 
      this.setState({
        states_data,
        data_loaded: true,
      });
    } catch (e) {
      console.log("unable to retrieve data", e);
    }
  };

  processData = (data) => {
    let processed = [];

    for (const d of data) {
      let obj = {
        sa4_name:d.sa4_name_2016,
        sentiment_score: d.sentiment_score[0],
        tweet_counts: d.tweet_counts[0],
        unemployed_rate: d.unemployed_rate[0],
        median_house_price: d.median_house_price[0],
        weekly_household_income: d.equivalised_total_household_income_census_median_weekly[0],
        average_monthly_mortgage: d.rent_mortgage_payments_census_average_monthly_household_payment[0],
        median_personal_income:d.median_aud[0],
        sentiment_score_std: d.sentiment_score[1],
        tweet_counts_std: d.tweet_counts[1],
        unemployed_rate_std: d.unemployed_rate[1],
        median_house_price_std: d.median_house_price[1],
        weekly_household_income_std: d.equivalised_total_household_income_census_median_weekly[1],
        average_monthly_mortgage_std: d.rent_mortgage_payments_census_average_monthly_household_payment[1],
        median_personal_income_std:d.median_aud[1],
        coordinates:d.centroid
      };
      processed.push(obj);
    }

    return processed;
  };


  handleSetQuery = (query) => {
    this.setState({
      query,
    });
  };

  render() {
    const { colors, states_data, data_loaded, fields, query} = this.state;

    return data_loaded ? (
      
      <div className="root">
        <BrowserRouter>
        <Switch>
        <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/map">
      <Map
          colors={colors}
          data={states_data}
          fields={fields}
          query={query}
        />
      </Route>
      <Route exact path="/personal_income">
        <Chart1 
        data={states_data}
          />
      </Route>
      <Route exact path="/unemployment_rate">
        <Chart2
        data={states_data}
          />
      </Route>
      <Route exact path="/house_price">
        <Chart3
        data={states_data}
          />
      </Route>
      <Route exact path="/average_monthly_morgage">
        <Chart4
        data={states_data}
          />
      </Route>
      <Route exact path="/weekly_household_income">
        <Chart5
        data={states_data}
          />
      </Route>
      <Route component={NotFound} />
         </Switch>
        </BrowserRouter>
      </div>
    ) : null;
  }
}

export default App;

/*
REFERENCES

Ansible 2021, Loops, viewed 1st May 2021, 
<https://docs.ansible.com/ansible/latest/user_guide/playbooks_loops.html#iterating-over-a-simple-list>.

Ansible 2021, os_security_group_rule - Add/Delete rule from an existing security group, viewed 1st May 2021, 
<https://docs.ansible.com/ansible/2.5/modules/os_security_group_rule_module.html>.

Ansible 2021, os_server - Create/Delete Compute Instances from Openstack, viewed 25th April 2021, <https://docs.ansible.com/ansible/2.4/os_server_module.html>.

Ansible 2021, Tags, viewed 25th April 2021, 
<https://docs.ansible.com/ansible/latest/user_guide/playbooks_tags.html>.

Apache Software Foundation 2021, 2.2/ Cluster Setup, viewed 1st May 2021,
<https://docs.couchdb.org/en/stable/setup/cluster.html>.

AURIN 2018, comp90024 Code snippets for the Cloud Computing Course, viewed 23 April 2021, <https://github.com/AURIN/comp90024>.

AURIN 2021, Australian Urban Research Infrastructure Network Portal, viewed 11 May 2021, 
<https://portal.aurin.org.au/>.

Australian Bureau of Statistics 2016, Main Structure and Greater Capital City Statistical Areas -  Australian Statistical Geography Standard (ASGS): Volume 1, viewed 8th May 2021,
<https://www.abs.gov.au/ausstats/abs@.nsf/mf/1270.0.55.001>.

Eisenkot, G 2020, Security challenges and risks with infrastructure as code, viewed 21st May 2021,
<https://bridgecrew.io/blog/security-challenges-and-risks-with-infrastructure-as-code/>.

Harrower, M. and Bloch, M., 2006. MapShaper. org: A map generalization web service. IEEE Computer Graphics and Applications, 26(4), pp.22-27.

Internet Assigned Numbers Authority 2021, Service Name and Transport Protocol Port Number Registry, viewed 1st May 2021, <https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=http>.

JGraph 2021, diagrams.net, viewed 1st April 2021, 
<https://www.diagrams.net>.

Nielsen, FÅ 2017. afinn project, Technical University of Denmark, Kongens Lyngby, viewed 25th April 2021, <http://www2.imm.dtu.dk/pubdb/edoc/imm6975.pdf>.

Pan, A 2021, Workshop 9-10 Ansible, The University of Melbourne, Parkville, viewed 24th April 2021, <https://canvas.lms.unimelb.edu.au/courses/105440/files/7077574/download?download_frd=1>.

Pan, A 2021, Workshop 9-10 Ansible Code, The University of Melbourne, Parkville, viewed 24th April 2021, <https://canvas.lms.unimelb.edu.au/files/7112800/download?download_frd=1>.

The University of Melbourne 2021, Melbourne Research Cloud, viewed 23rd April 2021, <https://dashboard.cloud.unimelb.edu.au/auth/login/>.

The University of Melbourne 2021, Re:Cite, viewed 21st May 2021, 
<https://library.unimelb.edu.au/recite>.

Tinati, R., Halford, S., Carr, L. and Pope, C., 2014. Big data: methodological challenges and approaches for sociological analysis. Sociology, 48(4), pp.663-681. Viewed 21st May 2021,
<https://www.jstor.org/stable/24433725>.

Tutorials Point 2021, YAML - Comments, viewed 1st May 2021, 
<https://www.tutorialspoint.com/yaml/yaml_comments.htm>.

Vasiljevic, S 2020, Infrastructure As Code Demystified: IaC Benefits, Challenges and Best Practices, viewed 21st May 2021, 
<https://superadmins.com/infrastructure-as-code-demystified-iac-benefits-challenges-best-practices/>.
*/