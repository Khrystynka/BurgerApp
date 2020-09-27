import React from "react";
import NavigationItems from "./NavigationItems";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItem from "./NavigationItem/NavigationItem";
configure({ adapter: new Adapter() });
describe("<NAvigationItems/>", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("should render two <navigationItem> components if the user is not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <navigationItem> components if the user is authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("should render three <navigationItem> components if the user is authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
