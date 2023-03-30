import '../css/card.css'

export default function Card ({pokemon}) {
  return (
    <>
      <div className="card">
        <div className="card-img">
          <img src="" />
        </div>
        <div className="desc">
          <h6 className="primary-text custom-bold">{pokemon.name.toUpperCase()}</h6>
        </div>
        <button className="primary-text button-custom">View Repository</button>
      </div>
    </>
  );
};
