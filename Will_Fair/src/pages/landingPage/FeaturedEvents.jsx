import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FeaturedEvents.css"; // optional, for styling similar to your cards

function FeaturedEvents() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/events")
            .then((res) => {
                setEvents(res.data.events || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch events");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading events...</div>;
    if (error) return <div className="error">{error}</div>;

    // For now, show the first 3 approved events
    const featuredList = events.slice(0, 3);

    return (
        <section className="featured-events-section">
            <div className="featured-events-grid">
                {featuredList.map((event) => {
                    const volunteersSigned = event.volunteers_signed || 0;
                    const volunteersNeeded = event.volunteers_needed || 0;
                    const progress = volunteersNeeded ? (volunteersSigned / volunteersNeeded) * 100 : 0;

                    return (
                        <div 
                            key={event.event_id} 
                            className="event-card"
                            onClick={() => {
                                sessionStorage.setItem('eventsScroll', window.scrollY);
                                navigate(`/Events/${event.event_id}`, { state: { event } });
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="event-card-image"
                                style={{ backgroundImage: `url(${event.image_url || "/default-event.jpg"})` }}
                            ></div>



                            
                            <div className="event-card-content">
                                <h3>{event.title}</h3>

                                <div className="progress-bar-container">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ 
                                                width: `${progress}%`,
                                                background: 'linear-gradient(90deg, #4CAF50, #8BC34A)'
                                            }}
                                        ></div>
                                    </div>
                                    <div className="funding-info">
                                        <div>
                                            <div className="funding-label">Volunteers Signed:</div>
                                            <div className="funding-amount">{volunteersSigned}</div>
                                        </div>
                                        <div>
                                            <div className="funding-label">Volunteers Needed:</div>
                                            <div className="funding-amount">{volunteersNeeded}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>

        </section>
    );
}

export default FeaturedEvents;
