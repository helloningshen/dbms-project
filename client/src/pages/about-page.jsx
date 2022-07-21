import React from 'react'
import "./css/about.css"
import style from "./css/header.module.css"
import Section from "./components/about/section"
import ContainerCard from './components/container-card/container-card'
import Nav from './components/nav/nav'


const About = () => {
  return (
    <div>
      <header className={`${style.header} flex justify-content-center`}>
        <ContainerCard className="flex flex-column">
          <div className={style["blur-circle-shape"]}></div>
          <Nav />
        </ContainerCard>
      </header>

      <Section>
        <div className='container'>
          <div class="right">
            <div class="right-container">
              <div class="d-flex-gap">
                <div class="subject"><ul>Team Member</ul></div>
                <ul className="member">
                  <li>Richard Kullu(34)</li>
                  <li>Anitesh Minj</li>
                  <li>Ningyao Ningshen(29)</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className='container'>
          <div class="wrapper">
            <div class="left">
              <div class="left-container">
                <div class="img-title">
                  <div class="photo">
                    <figure>
                      <img
                        className='img'
                        src="https://i.postimg.cc/ZRC1MVvH/sebastian-svenson-Lpby-DENb-QQg-unsplash.jpg"
                        alt="react-img"
                      />
                    </figure>
                  </div>
                  <div class="title">
                    <div class="header">
                      <span class="span-bold">About the Project.</span>
                    </div>
                    <div class="main">
                      <span class="span-light">MCSC-203 (DATABASE MANAGEMENT ASSIGNMENT)</span>
                    </div>
                    <div class="footer">
                      <p class="p-light">
                        Book Gallery for storing Books.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>


          </div>
        </div>
      </Section>

      <Section>
        <div className='container'>

          <div class="wrapper">
            <div class="left">
              <div class="left-container">
                <div class="img-title">
                  <div class="photo">
                    <figure>
                      <img
                        src="https://i.postimg.cc/13H8RdHP/Course-Image.png"
                        alt="react-img"
                      />
                    </figure>
                  </div>
                  <div class="title">
                    <div class="header">
                      <span class="span-bold">Front-End</span>
                    </div>
                    <div class="main">
                      <span class="span-light">Tools & Technologies for front-end</span>
                    </div>
                    <div class="footer">
                      <ul>
                        <li>
                          React - JS Framework
                        </li>
                        <br />
                        <li>
                          Redux - State Management
                        </li>
                        <br />
                        <li>HTML - Front End Markup Language</li>
                        <br />
                        <li>CSS - Cascading StyleSheet</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className='container'>

          <div class="wrapper">
            <div class="left">
              <div class="left-container">
                <div class="img-title">
                  <div class="photo">
                    <figure>
                      <img
                        className='img'
                        src="https://i.postimg.cc/SQBc9N6R/nodejs.png"
                        alt="react-img"
                      />
                    </figure>
                  </div>
                  <div class="title">
                    <div class="header">
                      <span class="span-bold">Back-End</span>
                    </div>
                    <div class="main">
                      <span class="span-light">Tools & Technologies for Back-End</span>
                    </div>
                    <div class="footer">
                      <ul>
                        <li>
                          Express.js - Node JS Framework
                        </li>
                        <br />
                        <li>
                          MYSQL - Database
                        </li>
                        <br />
                        <li>
                          S3 - AWS
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Section>
      <br />

      <div style={{ display: "flex", flexDirection: "row", marginTop: "200", justifyContent: "center", rowGap: "10", marginBottom: 20 }}>
        <Section>
          <div class="right" style={{ background: "red", marginRight: 5 }}>
            <div class="right-container">
              <div class="d-flex-gap">
                <div class="subject"><ul>Number of Pages (features)</ul></div>
                <ul className="member">
                  <li>Dashboard - View all uploaded Contents</li>
                  <li>Archive - View Content That is related to our MSC-CS</li>
                  <li>About - Show misc information about the site.</li>
                  <li>Register - allows user to register</li>
                  <li>Sign Up - allows user to sign in</li>
                </ul>
              </div>

            </div>
          </div>

          <div class="right" style={{ marginRight: 5, background: "purple" }}>
            <div class="right-container">
              <div class="d-flex-gap">
                <div class="subject"><ul>Actions</ul></div>
                <ul className="member">
                  <li>Upload Actions: Send upload request to the server for storing</li>
                  <li>Retrieve all: Send get request to the server for fetching all files.</li>
                  <li>Retrive one: Send get to request to retrieve one item by ID.</li>
                  <li>Save Info: Send post request to save information about the file.</li>
                  <li>Delete one: Send delete request to delete item by ID.</li>
                  <li>auth: Send post request to register and signin</li>
                </ul>
              </div>

            </div>
          </div>


          <div class="right" style={{ background: "brown" }}>
            <div class="right-container">
              <div class="d-flex-gap">
                <div class="subject"><ul>Misc features.</ul></div>
                <ul className="member">
                  <li>Allows user to maintain the logged state until s/he explicitly logs out - implemented through localStorage.</li>
                  <li>Allows user to read pdf directly on the web.</li>
                </ul>
              </div>

            </div>
          </div>

        </Section>
      </div>
    </div>
  )
}


export default About;