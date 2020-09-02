import React from 'react';


export default function BlockList() {

    return (
        <>
        <h1>Block List</h1>
        <button>back</button>
        <div className="blocked-user-name">
        <img></img>
        <p>Eduardo</p><button>Unblock</button>
        </div>
        <div className="blocked-user-name">
        <img></img>
        <p>Philippe</p><button>Unblock</button>
        </div>
        <img></img>
        <div className="blocked-user-name">
        <p>Florian</p><button>Unblock</button>
        </div>   
        <div className="blocked-user-name">
        <p>Vincent</p><button>Unblock</button>
        </div>  
        <div className="blocked-user-name">
        <p>Tomoyuki</p><button>Unblock</button>
        </div>   
        </>
    )
}