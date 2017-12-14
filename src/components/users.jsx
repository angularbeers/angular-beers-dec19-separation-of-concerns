import { h, Component } from "preact";
import { renderOnRoute, Link } from "preact-routlet";
import { http } from "../advices";
import { beforeMethod, beforeInstance } from "kaop-ts";
import AxiosProvider from "../axios-provider";
import { inject } from "kaop";

@renderOnRoute("/users")
@beforeInstance(inject.assign({ axios: AxiosProvider }))
export default class UserComponent extends Component {

  componentWillMount() {
    this.setState({ users: [] });
  }

  componentDidMount() {
    this.getResource({});
  }

  @beforeMethod(http("/users"))
  getResource(params, res) {
    this.setState({ users: res.data });
  }

  render() {
    return (
      <section>
        <h2>User list</h2>
        <ul>
          {this.state.users.map(user => (
            <li>
              <Link href={`/user/${user.username}/${user.id}/posts`}>
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}
