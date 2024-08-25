import React from 'react'
import Logo from "../assets/a.logo.png";

//code imported from Figma
function Card() {
  return (
    <div className="card">
      <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: 5, overflow: 'hidden', border: '1px #9747FF dotted' }}>
        <div style={{ width: 62, height: 51, left: 20, top: 20, position: 'absolute' }}>
          <div style={{ width: 62, height: 51, left: 0, top: 0, position: 'absolute', background: 'white' }}>
            <div style={{ width: 61.56, height: 50.58, left: 62, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0' }}>
              <div style={{ width: 61.56, height: 50.58, left: 0, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', background: '#CECECE', borderRadius: 2 }} />
              <div style={{ width: 55, left: -58, top: 10, position: 'absolute', textAlign: 'center', color: '#6E6E6E', fontSize: 4, fontFamily: 'Inter', fontWeight: '500', lineHeight: 4.80, wordWrap: 'break-word' }}>Requisite: This course has similarities to INFT2009. If you have successfully completed INFT2009 you can’t enrol in this course.<br />Assumed knowledge: SENG1110 or INFT1004</div>
              <div style={{ width: 9, height: 8, left: -52, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0' }}>
                <img style={{ width: 9, height: 8, left: 0, top: 0, position: 'absolute' }} src={Logo} alt="uon" />
              </div>
            </div>
          </div>
          <div style={{ width: 62, height: 51, left: 0, top: 0, position: 'absolute', background: 'white' }}>
            <div style={{ width: 62, height: 50.58, left: 0, top: 0, position: 'absolute' }}>
              <div style={{ width: 61.56, height: 50.58, left: 0, top: 0, position: 'absolute', background: '#DADADA', borderRadius: 2 }} />
              <div style={{ width: 57.98, height: 8.55, left: 1.43, top: 36.48, position: 'absolute', textAlign: 'center', color: '#1E1E1E', fontSize: 7, fontFamily: 'Inter', fontWeight: '500', lineHeight: 10.50, wordWrap: 'break-word' }}>CORE</div>
              <div style={{ width: 61, height: 13, left: 1, top: 20, position: 'absolute', textAlign: 'center', color: '#6E6E6E', fontSize: 5, fontFamily: 'Inter', fontWeight: '500', lineHeight: 6, wordWrap: 'break-word' }}>Systems Analysis and Design</div>
              <div style={{ width: 57.98, height: 8.55, left: 1.43, top: 8.55, position: 'absolute' }}>
                <div style={{ width: 57.98, height: 8.55, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#007BE5', fontSize: 8, fontFamily: 'Inter', fontWeight: '600', textDecoration: 'underline', lineHeight: 12, wordWrap: 'break-word' }}>SENG2130</div>
              </div>
              <div style={{ width: 9, height: 8, left: 1, top: 3, position: 'absolute' }}>
                <img style={{ width: 9, height: 8, left: 0, top: 0, position: 'absolute' }} src={Logo} alt="uon" />
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: 62, height: 51, left: 20, top: 84, position: 'absolute' }}>
          <div style={{ width: 62, height: 51, left: 0, top: 0, position: 'absolute', background: 'white' }}>
            <div style={{ width: 62, height: 50.58, left: 0, top: 0, position: 'absolute' }}>
              <div style={{ width: 61.56, height: 50.58, left: 0, top: 0, position: 'absolute', background: '#DADADA', borderRadius: 2 }} />
              <div style={{ width: 57.98, height: 8.55, left: 1.43, top: 36.48, position: 'absolute', textAlign: 'center', color: '#1E1E1E', fontSize: 7, fontFamily: 'Inter', fontWeight: '500', lineHeight: 10.50, wordWrap: 'break-word' }}>CORE</div>
              <div style={{ width: 61, height: 13, left: 1, top: 20, position: 'absolute', textAlign: 'center', color: '#6E6E6E', fontSize: 5, fontFamily: 'Inter', fontWeight: '500', lineHeight: 6, wordWrap: 'break-word' }}>Systems Analysis and Design</div>
              <div style={{ width: 57.98, height: 8.55, left: 1.43, top: 8.55, position: 'absolute' }}>
                <div style={{ width: 57.98, height: 8.55, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#007BE5', fontSize: 8, fontFamily: 'Inter', fontWeight: '600', textDecoration: 'underline', lineHeight: 12, wordWrap: 'break-word' }}>SENG2130</div>
              </div>
              <div style={{ width: 9, height: 8, left: 50, top: 2, position: 'absolute' }}>
                <img style={{ width: 9, height: 8, left: 0, top: 0, position: 'absolute' }} src={Logo} alt="uon" />
              </div>
            </div>
          </div>
          <div style={{ width: 62, height: 51, left: 0, top: 0, position: 'absolute', background: 'white' }}>
            <div style={{ width: 61.56, height: 50.58, left: 62, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0' }}>
              <div style={{ width: 61.56, height: 50.58, left: 0, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', background: '#CECECE', borderRadius: 2 }} />
              <div style={{ width: 55, left: -58, top: 12, position: 'absolute', textAlign: 'center' }}>
                {/* <span style="color: '#6E6E6E', fontSize: 5, fontFamily: 'Inter', fontWeight: '500', lineHeight: 6, wordWrap: 'break-word'">Assumed knowledge: </span><span style="color: '#6E6E6E', fontSize: 6, fontFamily: 'Inter', fontWeight: '500', lineHeight: 7.20, wordWrap: 'break-word'">SENG1110 or INFT1004<br /></span> */}
                {/*  <span style="color: '#6E6E6E', fontSize: 4, fontFamily: 'Inter', fontWeight: '500', lineHeight: 4.80, wordWrap: 'break-word'"><br />Offered Semester 1</span>*/}
              </div>
              <div style={{ width: 9, height: 8, left: -51, top: 2, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0' }}>
                <img style={{ width: 9, height: 8, left: 0, top: 0, position: 'absolute' }} src={Logo} alt="uon" />
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>


  )
}

export default Card



