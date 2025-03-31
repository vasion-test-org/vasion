"use client";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import media from "@/styles/media";
import text from "@/styles/text";
import colors from "@/styles/colors";
import gsap from "gsap";
import getMedia from "@/functions/getMedia";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);

  const filteredJobs = jobs.filter((job) => {
    const location = `${job.city != "" ? job.city : ""} ${
      job.state != "" ? job.state : ""
    } ${job.country}`;

    const locationMatch =
      selectedLocation === "" ||
      location
        .trim()
        .toLowerCase()
        .includes(selectedLocation.trim().toLowerCase());

    const departmentMatch =
      selectedDepartment === "" ||
      job.department.toLowerCase() === selectedDepartment.toLowerCase();

    const titleMatch =
      searchKeyword === "" ||
      job.title.toLowerCase().includes(searchKeyword.toLowerCase());

    const remoteMatch = !isOn || job.telecommuting;

    return locationMatch && departmentMatch && titleMatch && remoteMatch;
  });

  filteredJobs.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    return dateB - dateA;
  });

  function calculateDaysAgo(createdDate) {
    const currentDate = new Date();
    const postedDate = new Date(createdDate);

    const timeDifference = currentDate - postedDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysAgo === 0) {
      return "Posted Today";
    } else if (daysAgo === 1) {
      return "Posted Yesterday";
    } else if (daysAgo <= 30) {
      return `Posted ${daysAgo} days ago`;
    } else {
      const monthsAgo = Math.floor(daysAgo / 30);
      return `Posted ${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
    }
  }

  const toggleSwitch = () => {
    setIsOn((prevIsOn) => !prevIsOn);
    const xValue = getMedia("30px", "2.083vw", "2.93vw", "7.009vw");
    const target = document.querySelector(".toggle-button-workable-slider");

    if (!isOn) {
      const toggleForward = gsap.timeline().to(target, { left: xValue });
      toggleForward.play();
    } else {
      const toggleBack = gsap.timeline().to(target, { left: 0 });
      toggleBack.play();
    }
  };
  function jsonp(url, callbackName) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        url + (url.indexOf("?") >= 0 ? "&" : "?") + `callback=${callbackName}`;
      script.async = true;
      script.onload = () => {
        resolve();
        document.body.removeChild(script);
      };
      script.onerror = (error) => {
        reject(error);
        document.body.removeChild(script);
      };
      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    const apiUrl = "https://www.workable.com/api/accounts/vasion?details=true";
    const callbackName = "jsonpCallback";

    window[callbackName] = (data) => {
      setJobs(data.jobs);

      const uniqueLocations = new Set();
      const uniqueDepartments = new Set();

      data.jobs.forEach((job) => {
        if (job.city !== "") {
          const location = job.city + ` ${job.state}` + ` ${job.country}`;
          uniqueLocations.add(location);
        } else {
          uniqueLocations.add(`${job.country}`);
        }
        uniqueDepartments.add(job.department);
      });

      setAllLocations([...uniqueLocations]);
      setAllDepartments([...uniqueDepartments]);

      setLoading(false);
      delete window[callbackName];
    };

    jsonp(apiUrl, callbackName).catch((error) => {
      setLoading(false);
    });

    return () => {
      delete window[callbackName];
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  let content;
  if (filteredJobs.length === 0) {
    content = `Sorry! We currently not hiring in that location or department at this time!`;
  } else {
    content = (
      <Results>
        {filteredJobs.map((job) => {
          return (
            <JobItem key={job.url}>
              <ColumnContainer>
                <HeadingLink
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <JobTitle key={job.id}>{job.title}</JobTitle>
                </HeadingLink>
                <p>{calculateDaysAgo(job.created_at)}</p>
              </ColumnContainer>
              <JobType>
                {job.telecommuting && job.city === ""
                  ? "Remote"
                  : job.telecommuting && job.city != ""
                    ? "Hybrid"
                    : "On-Site"}
              </JobType>
              <Location>
                {job?.city && job?.state ? job.city + "," : job.city}
                {job?.state && job.country ? job.state + "," : job.countryCode}
                {job.country}
              </Location>
              <Department>{job.function}</Department>
              <Link href={job.url} target="_blank">
                Apply Now &#8250;
              </Link>
            </JobItem>
          );
        })}
      </Results>
    );
  }
  const getLocations = allLocations.map((location, index) => (
    <SelectOption key={location + index} value={location}>
      {location}
    </SelectOption>
  ));
  const getDepartments = allDepartments.map((department, index) => (
    <SelectOption key={department + index} value={department}>
      {department}
    </SelectOption>
  ));
  return (
    <Wrapper>
      <JobContainer>
        <Heading>Job Openings</Heading>
        <SearchInput
          type="text"
          placeholder="Search Jobs..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        ></SearchInput>
        <FilterDiv>
          {allLocations && (
            <SelectFilter
              name="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <SelectOption value="">Location</SelectOption>
              {getLocations}
            </SelectFilter>
          )}
          {
            <SelectFilter
              name="Department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <SelectOption value="">Departments</SelectOption>
              {getDepartments}
            </SelectFilter>
          }

          <ToggleContainer
            className="toggle-button-workable"
            onClick={toggleSwitch}
            isOn={isOn}
          >
            <ToggleButton
              className="toggle-button-workable-slider"
              isOn={isOn}
            />
          </ToggleContainer>
          <ToggleText>Remote Only</ToggleText>
        </FilterDiv>
        {content}
      </JobContainer>
    </Wrapper>
  );
}

const TESTBUTTON = styled.button``;
const JobContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.389vw;
  align-items: center;
  width: 90vw;
  font-family: "Archivo", sans-serif;

  ${media.fullWidth} {
    width: 1440px;
    gap: 20px;
  }

  ${media.tablet} {
    width: 90vw;
    gap: 1.953vw;
  }

  ${media.mobile} {
    width: 90vw;
    gap: 4.673vw;
  }
`;
const Heading = styled.h3`
  ${text.h3};
`;
const SearchInput = styled.input`
  width: 90vw;
  ${text.bodyLg};
  border-radius: 0.347vw;
  border: ${colors.grey200} 0.069vw solid;

  ${media.fullWidth} {
    width: 1440px;
    border-radius: 5px;
    border: ${colors.grey200} 1px solid;
  }

  ${media.tablet} {
    width: 90vw;
    border-radius: 0.488vw;
    border: ${colors.grey200} 0.098vw solid;
  }

  ${media.mobile} {
    width: 90vw;
    border-radius: 5px;
    border: ${colors.grey200} 1px solid;
  }
`;
const FilterDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.389vw;
  justify-content: center;
  align-items: center;
  width: 90vw;

  ${media.fullWidth} {
    width: 1440px;
    gap: 20px;
  }

  ${media.tablet} {
    width: 90vw;
    gap: 1.953vw;
  }

  ${media.mobile} {
    flex-direction: column;
    width: 90vw;
    gap: 4.673vw;
  }
`;
const SelectFilter = styled.select`
  width: 37.5vw;
  ${text.bodyLg};
  border-radius: 0.347vw;
  border: ${colors.grey200} 0.069vw solid;
  color: ${colors.grey500};
  padding: 0.486vw 0;

  ${media.fullWidth} {
    width: 620px;
    border-radius: 5px;
    border: ${colors.grey200} 1px solid;
    padding: 7px 0;
  }

  ${media.tablet} {
    width: 40.734vw;
    border-radius: 0.488vw;
    border: ${colors.grey200} 0.098vw solid;
    padding: 0.684vw 0;
  }

  ${media.mobile} {
    width: 90vw;
    border-radius: 1.168vw;
    border: ${colors.grey200} 0.234vw solid;
    padding: 1.636vw 0;
  }
`;
const ToggleText = styled.p`
  ${text.bodySm}
  text-wrap:nowrap;
`;
const ToggleContainer = styled.div`
  display: inline-block;
  width: 4.167vw;
  height: 2.083vw;
  border-radius: 1.042vw;
  background-color: ${(props) =>
    props.isOn ? `${colors.primaryOrange}` : `${colors.grey100}`};
  position: relative;
  cursor: pointer;

  ${media.fullWidth} {
    width: 60px;
    height: 30px;
    border-radius: 15px;
  }

  ${media.tablet} {
    width: 5.859vw;
    height: 2.13vw;
    border-radius: 1.465vw;
  }

  ${media.mobile} {
    width: 14.019vw;
    height: 7.009vw;
    border-radius: 3.505vw;
  }
`;

const ToggleButton = styled.div`
  width: 2.083vw;
  height: 2.083vw;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 0;
  border: 1px solid ${colors.grey200};
  /* left: ${(props) => (props.isOn ? "2.083vw" : "0")};
  transition: left 0.3s ease-in-out; */

  ${media.fullWidth} {
    width: 30px;
    height: 30px;
    /* left: ${(props) => (props.isOn ? "30px" : "0")}; */
  }

  ${media.tablet} {
    width: 2.13vw;
    height: 2.13vw;
    /* left: ${(props) => (props.isOn ? "2.93vw" : "0")}; */
  }

  ${media.mobile} {
    width: 7.009vw;
    height: 7.009vw;
    /* left: ${(props) => (props.isOn ? "7.009vw" : "0")}; */
  }
`;
const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  width: 90vw;

  ${media.fullWidth} {
    width: 1440px;
  }

  ${media.tablet} {
    width: 90vw;
  }

  ${media.mobile} {
    width: 90vw;
  }
`;
const JobItem = styled.div`
  font-family: "Archivo", sans-serif;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 0.069vw solid ${colors.grey200};
  padding: 1.042vw 0;

  ${media.fullWidth} {
    border-bottom: 1px solid ${colors.grey200};
    padding: 15px 0;
  }

  ${media.tablet} {
    border-bottom: 0.098vw solid ${colors.grey200};
    padding: 1.465vw 0;
  }

  ${media.mobile} {
    flex-direction: column;
    justify-content: flex-start;
    padding: 3.505vw 0;
    align-items: flex-start;
    gap: 3.505vw;
  }
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 22.5vw;
  gap: 10px;

  ${media.fullWidth} {
    gap: 10px;
    width: 324px;
  }

  ${media.tablet} {
    gap: 0.977vw;
    width: 25.641vw;
  }

  ${media.mobile} {
    width: 90vw;
    gap: 2.336vw;
  }
`;
const SelectOption = styled.option``;

const HeadingLink = styled.a`
  color: ${colors.primaryPurple};
  width: 17.361vw;
  ${media.fullWidth} {
    width: 250px;
  }
  ${media.tablet} {
    width: 24.414vw;
  }
  ${media.mobile} {
    width: 90vw;
  }

  ${media.hover} {
    &:hover {
      text-decoration: underline;
    }
  }
`;
const JobTitle = styled.h4`
  ${text.h4};
`;
const JobType = styled.p`
  text-align: center;
  background-color: ${colors.orange200};
  border-radius: 1.389vw;
  padding: 0.417vw 0.694vw;
  width: 4.861vw ${media.fullWidth} {
    border-radius: 20px;
    padding: 5px;
    width: 70px;
  }

  ${media.tablet} {
    border-radius: 1.953vw;
    padding: 0.586vw 0.977vw;
    width: 10.836vw;
  }

  ${media.mobile} {
    border-radius: 4.673vw;
    padding: 1.402vw 3.336vw;
    width: 24.355vw;
  }
`;

const Department = styled.p`
  width: 22.5vw;
  text-align: left;

  ${media.fullWidth} {
    width: 324px;
  }

  ${media.tablet} {
    width: 20.641vw;
  }

  ${media.mobile} {
    width: 90vw;
  }
`;
const Location = styled.p`
  width: 22.5vw;
  text-align: left;

  ${media.fullWidth} {
    width: 324px;
  }

  ${media.tablet} {
    width: 0.641vw;
  }

  ${media.mobile} {
    width: 90vw;
  }
`;
const Link = styled.a`
  color: ${colors.primaryOrange};
  ${media.hover} {
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-self: center;
`;
export default JobList;
