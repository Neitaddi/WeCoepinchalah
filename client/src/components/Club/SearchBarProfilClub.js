import React from "react";

const SearchBarProfilClub = () => {
  return (
    <div id="cover">
      <form method="get" action="">
        <div class="tb">
          <div class="td">
            <input type="text" placeholder="Search" required />
          </div>
          <div class="td" id="s-cover">
            <button type="submit">
              <div id="s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBarProfilClub;