import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Tooltip from "./Tooltip";



const TOKEN =
  "pk.eyJ1Ijoiam9udGF5eXciLCJhIjoiY2s4aXcwbnA0MGFqYjNscDZicm9haXA3cCJ9.rI3D6Y4ZETQnYukX9RCOow";

const initialState = {
  map_data: [],
  tooltip: null,
  viewport: {
    width: "100%",
    height: "100%",
    latitude: -25,
    longitude: 130,
    zoom: 3,
  },
};
class Map extends Component {
  state = initialState;

  componentDidMount() {
    this.prepareData();
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;
    if (query !== prevProps.query) {
      this.prepareData();
    }
  }

  prepareData = () => {
    const { colors, data, query } = this.props;

    const map_data = data.filter((f) => f[query] > 0);
    const counts = map_data.map((e) => e[query]);
    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);
    const diff = maxCount - minCount;
    const div = diff * 0.2;
    const div2 = diff * 0.8;

    for (const d of map_data) {
      if (d[query] >= div2) {
        d.size = 55;
      } else if (d[query] < div2 && d[query] >= div) {
        d.size = 35;
      } else {
        d.size = 15;
      }
      switch (query) {
        case "sa4_name":
          d.color = colors[1];
          break;
       
        default:
          d.color = colors[0];
      }

    }

    this.setState({
      map_data,
    });
  };

  handleCloseTooltip = () => {
    this.setState({ tooltip: null });
  };

  render() {
    const { map_data, tooltip, viewport } = this.state;
    const { fields } = this.props;
 

    return (
      
   
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
            <div className="footer">Data source:Twitter API, Afinn, Aurin</div>
        {map_data.map((country, index) => {
      
          const latitude = Number(country.coordinates[1]);
          const longitude = Number(country.coordinates[0]);
          return (
            <Marker key={index} longitude={longitude} latitude={latitude}>
              <div
                className="map-marker"
                style={{
                  backgroundColor: country.color,
                  height:"12px",
                  width:"12px",
                  size:country.size
                  
                }}
                 onClick={() => this.setState({ tooltip: country })}
              />
            </Marker>
          );
        })}

        {tooltip && (
          <Tooltip
            details={tooltip}
            fields={fields}
            handleCloseTooltip={this.handleCloseTooltip}
          />
        )}

   
      </ReactMapGL>
      
    );
  }
}

export default Map;

/*
REFERENCES

Ansible 2021, Loops, viewed 1st May 2021, 
<https://docs.ansible.com/ansible/latest/user_guide/playbooks_loops.html#iterating-over-a-simple-list>

Ansible 2021, os_security_group_rule - Add/Delete rule from an existing security group, viewed 1st May 2021, 
<https://docs.ansible.com/ansible/2.5/modules/os_security_group_rule_module.html>

Ansible 2021, os_server - Create/Delete Compute Instances from Openstack, viewed 25th April 2021, <https://docs.ansible.com/ansible/2.4/os_server_module.html>

Ansible 2021, Tags, viewed 25th April 2021, 
<https://docs.ansible.com/ansible/latest/user_guide/playbooks_tags.html>.

Apache Software Foundation 2021, 2.2/ Cluster Setup, viewed 1st May 2021,
<https://docs.couchdb.org/en/stable/setup/cluster.html>.

AURIN 2021, Australian Urban Research Infrastructure Network Portal, viewed 11 May 2021, 
<https://portal.aurin.org.au/>

Australian Bureau of Statistics 2016, Main Structure and Greater Capital City Statistical Areas -  Australian Statistical Geography Standard (ASGS): Volume 1, viewed 8th May 2021,
<https://www.abs.gov.au/ausstats/abs@.nsf/mf/1270.0.55.001> 

Eisenkot, G 2020, Security challenges and risks with infrastructure as code, viewed 21st May 2021,
<https://bridgecrew.io/blog/security-challenges-and-risks-with-infrastructure-as-code/>

Harrower, M. and Bloch, M., 2006. MapShaper. org: A map generalization web service. IEEE Computer Graphics and Applications, 26(4), pp.22-27.

Internet Assigned Numbers Authority 2021, Service Name and Transport Protocol Port Number Registry, viewed 1st May 2021, <https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=http>.

JGraph 2021, diagrams.net, viewed 1st April 2021, 
<https://www.diagrams.net>.

Nielsen, FÅ 2017. afinn project, Technical University of Denmark, Kongens Lyngby, viewed 25th April 2021, <http://www2.imm.dtu.dk/pubdb/edoc/imm6975.pdf>

Pan, A 2021, Workshop 9-10 Ansible, The University of Melbourne, Parkville, viewed 24th April 2021, <https://canvas.lms.unimelb.edu.au/courses/105440/files/7077574/download?download_frd=1>.

Pan, A 2021, Workshop 9-10 Ansible Code, The University of Melbourne, Parkville, viewed 24th April 2021, <https://canvas.lms.unimelb.edu.au/files/7112800/download?download_frd=1>.

The University of Melbourne 2021, Melbourne Research Cloud, viewed 23rd April 2021, <https://dashboard.cloud.unimelb.edu.au/auth/login/>

The University of Melbourne 2021, Re:Cite, viewed 21st May 2021, 
<https://library.unimelb.edu.au/recite>.

Tinati, R., Halford, S., Carr, L. and Pope, C., 2014. Big data: methodological challenges and approaches for sociological analysis. Sociology, 48(4), pp.663-681. Viewed 21st May 2021,
<https://www.jstor.org/stable/24433725>

Tutorials Point 2021, YAML - Comments, viewed 1st May 2021, 
<https://www.tutorialspoint.com/yaml/yaml_comments.htm>.

Vasiljevic, S 2020, Infrastructure As Code Demystified: IaC Benefits, Challenges and Best Practices, viewed 21st May 2021, 
<https://superadmins.com/infrastructure-as-code-demystified-iac-benefits-challenges-best-practices/>
*/