// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}

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