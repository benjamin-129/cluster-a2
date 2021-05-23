/**
 * A basic 404 page for invalid routes.
 */

import React from "react";
import { Button } from "reactstrap";

export default function NotFound() {
  return (
    <div id="notfound">
      <div className="text-center">
        <div className="col">
          <h1>
            {" "}
            4
            <span role="img" aria-label="oh">
              😲
            </span>
            4.{" "}
          </h1>
          <h3> Hmm, we couldn't find that page.</h3>
          <br />
          <br />
          <Button type="button" color="primary" href="/">
            {" "}
            Go Home Instead?
          </Button>
        </div>
      </div>
    </div>
  );
}
