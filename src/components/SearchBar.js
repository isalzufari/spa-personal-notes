import React from 'react';

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       keyword: props.defaultKeyword || '',
//     }

//     this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//   }

//   onKeywordChangeHandler(e) {
//     this.setState(() => {
//       return {
//         keyword: e.target.value,
//       }
//     });

//     this.props.keywordChange(this.state.keyword);
//   }

//   render() {
//     return (
//       <section className='search-bar'>
//         <input type="text" placeholder='Cari berdasarkan judul ... ' value={this.state.keyword} onChange={this.onKeywordChangeHandler} />
//       </section>
//     )
//   }
// }

function SearchBar({ keyword, keywordChange }) {
  return (
    <section className='search-bar'>
      <input type="text" placeholder='Cari berdasarkan judul ... ' value={keyword} onChange={(e) => keywordChange(e.target.value)} />
    </section>
  )
}

export default SearchBar;