import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Text from '../components/Text';
import Button from '../components/Button';
import Link from '../components/Link';
import { useNavigate } from 'react-router-dom';

const GeneratePlan = () => {
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the generated plan based on user's selections
        const fetchPlan = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3001/api/plan/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // Assuming we need to send some data; adjust as needed
                    body: JSON.stringify({ /* user selections or inputs */ }),
                });
                const data = await response.json();
                setPlan(data.plan || []);
            } catch (error) {
                console.error('Error fetching plan:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, []);

    const handleEditPlan = () => {
        navigate('/view-planner'); // Navigate to the page where users can edit the plan
    };

    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <Text type="h1">Generated Plan</Text>
                {loading ? (
                    <Text type="p">Loading your plan...</Text>
                ) : (
                    <>
                        {plan ? (
                            <div>
                                <Text type="h2">Your Plan</Text>
                                <Text type="p">{plan}</Text> {/* Display the plan details */}
                                <Button onClick={handleEditPlan} text="Edit Plan" />
                            </div>
                        ) : (
                            <Text type="p">No plan available. Please make sure you have selected all necessary options.</Text>
                        )}
                    </>
                )}
                <Link to="/profile" text="Profile" />
                <Link to="/create-new-planner" text="Create New Planner" />
                <Link to="/view-planner" text="View or Edit Planner" />
                <Link to="/logout" text="Logout" />
                <Link to="/help" text="Help" />
                <Link to="https://askuon.newcastle.edu.au/" text="Ask Uon" external />
            </div>
        </div>
    );
};

export default GeneratePlan;
