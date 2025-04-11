import React, { useState } from 'react';
import './App.css';

const sampleResponses = [
  "I found a delicious chicken pasta recipe for you! It takes about 30 minutes to make.",
  "Here are 3 vegetarian dinner ideas based on what you have in your fridge.",
  "Let me walk you through making chocolate cake step by step."
];

const recipeData = [
  {
    title: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1628556820645-63ba5f90e6a2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Vegetarian",
    time: "10 min",
    description: "A simple yet delicious breakfast with creamy avocado on toasted bread.",
    servings: "1 serving",
    difficulty: "Easy",
    ingredients: [
      "2 slices of whole grain bread",
      "1 ripe avocado",
      "1/2 lemon, juiced",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "2 eggs (optional)",
      "Microgreens for garnish (optional)"
    ],
    instructions: [
      "Toast the bread until golden and crisp.",
      "Cut and mash the avocado with lemon juice, salt, and pepper.",
      "Spread mixture, top with egg and garnish as desired."
    ]
  },
  {
    title: "Fresh Vegetable Salad",
    image: "https://images.unsplash.com/photo-1738486511470-471be341a1e3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Lunch",
    time: "15 min",
    description: "A refreshing mix of seasonal vegetables with a light vinaigrette.",
    servings: "2 servings",
    difficulty: "Easy",
    ingredients: [
      "Mixed salad greens",
      "Cucumber, cherry tomatoes",
      "Red onion, bell pepper",
      "Feta cheese, olive oil, balsamic vinegar",
      "Honey, salt, pepper"
    ],
    instructions: [
      "Chop vegetables, whisk dressing ingredients.",
      "Toss salad and top with feta."
    ]
  },
  {
    title: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Dinner",
    time: "25 min",
    description: "Classic pasta with eggs, cheese, pancetta, and pepper.",
    servings: "2 servings",
    difficulty: "Medium",
    ingredients: [
      "Spaghetti",
      "2 eggs, grated parmesan",
      "Pancetta or bacon",
      "Black pepper, salt"
    ],
    instructions: [
      "Cook pasta. Fry pancetta. Mix eggs and cheese.",
      "Toss pasta with pancetta and egg mix (off heat).",
      "Season and serve immediately."
    ]
  },
  {
    title: "Homemade Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Lunch",
    time: "1 hr",
    description: "Make your own pizza with your favorite toppings and fresh dough.",
    servings: "4 servings",
    difficulty: "Hard",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Mozzarella cheese",
      "Toppings of choice (pepperoni, veggies, etc.)"
    ],
    instructions: [
      "Preheat oven. Roll out dough.",
      "Spread sauce, add cheese and toppings.",
      "Bake until golden brown."
    ]
  },
  {
    title: "Banana Pancakes",
    image: "https://images.unsplash.com/photo-1606149186228-4e5ac94a742e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Breakfast",
    time: "20 min",
    description: "Fluffy pancakes with a hint of banana sweetness.",
    servings: "3 servings",
    difficulty: "Easy",
    ingredients: [
      "2 ripe bananas",
      "1 cup flour",
      "1 egg, 1 cup milk",
      "1 tsp baking powder, pinch of salt"
    ],
    instructions: [
      "Mash bananas. Mix all ingredients into batter.",
      "Cook on greased pan until golden.",
      "Serve with syrup or berries."
    ]
  },
  {
    title: "Vegan Buddha Bowl",
    image: "https://plus.unsplash.com/premium_photo-1664648005742-0c360f4910b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Vegetarian",
    time: "30 min",
    description: "A nourishing bowl with grains, veggies, and tahini dressing.",
    servings: "2 bowls",
    difficulty: "Medium",
    ingredients: [
      "Cooked quinoa or brown rice",
      "Roasted sweet potatoes, chickpeas",
      "Avocado, cucumber, red cabbage",
      "Tahini, lemon, garlic"
    ],
    instructions: [
      "Roast veggies and chickpeas.",
      "Assemble bowl with base, toppings, and drizzle dressing."
    ]
  }
];


export default function App() {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVoiceCard, setActiveVoiceCard] = useState(null);
  const [modalAssistantActive, setModalAssistantActive] = useState(false);

  const handleVoicePress = () => {
    setListening(true);
    setResponse('');
  };

  const handleVoiceRelease = () => {
    setListening(false);
    const newResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
    setResponse(newResponse);
  };

  const handleCardVoiceStart = (recipeTitle, inModal = false) => {
    setResponse(`Let me walk you through ${recipeTitle}!`);
    setListening(true);
    setActiveVoiceCard(recipeTitle);
  
    if (inModal) setModalAssistantActive(true);
  
    setTimeout(() => {
      setListening(false);
      setActiveVoiceCard(null);
      setModalAssistantActive(false);
    }, 3000);
  };
  
  

  const toggleFavorite = (title) => {
    setFavorites((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };
  
  const isFavorite = (title) => favorites.includes(title);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-indigo-600 text-white p-3 rounded-full mr-4">
            <i className="fas fa-utensils text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">ChefMate</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
            <i className="fas fa-user mr-2"></i>
            <span>Sign In</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row gap-8">
        {/* Voice Assistant Section */}
        <div className="lg:w-1/3 bg-white rounded-xl shadow-md p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Voice Assistant</h2>

          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center">
                <i className="fas fa-robot text-5xl text-indigo-600"></i>
              </div>
              {listening && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center pulse-animation">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>

            {response && (
              <div className="speech-bubble p-4 mb-6 w-full max-w-md fade-in">
                <p className="text-gray-700">{response}</p>
              </div>
            )}

            <button
              id="voice-btn"
              onMouseDown={handleVoicePress}
              onMouseUp={handleVoiceRelease}
              className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition transform hover:scale-105"
            >
              <i className="fas fa-microphone text-2xl"></i>
            </button>
            <p className="text-gray-500 mt-4 text-sm">Press and hold to speak</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Try saying:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><i className="fas fa-chevron-right text-indigo-500 mr-2"></i>"Find me a chicken pasta recipe"</li>
              <li><i className="fas fa-chevron-right text-indigo-500 mr-2"></i>"What can I make with eggs and cheese?"</li>
              <li><i className="fas fa-chevron-right text-indigo-500 mr-2"></i>"Show me vegetarian dinner ideas"</li>
              <li><i className="fas fa-chevron-right text-indigo-500 mr-2"></i>"How do I make chocolate cake?"</li>
            </ul>
          </div>
        </div>

        {/* Recipes Section */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recommended Recipes</h2>
            <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab("All")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "All"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              All Recipes
            </button>
            <button
              onClick={() => setActiveTab("Favorites")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "Favorites"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Favorites
            </button>
          </div>


            
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Breakfast", "Lunch", "Dinner", "Vegetarian", "Desserts"].map((label) => (
              <button
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  activeFilter === label
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipeData
            .filter((recipe) => {
              const matchFilter = activeFilter === "All" || recipe.category === activeFilter;
              const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
              const isFav = favorites.includes(recipe.title);
              return (activeTab === "All" ? matchFilter : isFav && matchFilter) && matchesSearch;
            })
            .map((recipe, i) => (
              <div key={i} className="relative group">
                {/* Overlay bubble */}
                {activeVoiceCard === recipe.title && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20 rounded-xl">
                    <div className="bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 animate-fade-in">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-robot text-indigo-600 text-lg"></i>
                      </div>
                      <span className="text-sm text-gray-800 max-w-xs">
                        Let me walk you through {recipe.title}!
                      </span>
                    </div>
                  </div>
                )}

                {/* Recipe Card */}
                <div
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`recipe-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300 cursor-pointer ${activeVoiceCard === recipe.title ? "opacity-70" : ""}`}
                >
                  <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{recipe.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${recipe.category === 'Vegetarian' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {recipe.category}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(recipe.title);
                          }}
                          className="text-xl text-red-500 hover:text-red-600 focus:outline-none"
                          title={isFavorite(recipe.title) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <i className={`fas ${isFavorite(recipe.title) ? 'fa-heart' : 'fa-heart-circle-plus'}`}></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500"><i className="fas fa-clock mr-1"></i>{recipe.time}</span>
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium">View</button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardVoiceStart(recipe.title);
                        }}
                        className="text-sm text-indigo-600 hover:text-indigo-800 ml-2"
                      >
                        <i className="fas fa-volume-up mr-1"></i> Voice Assist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          ))}
          </div>
        </div>
      </main>
            {/* Recipe Modal */}
            {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedRecipe.title}</h3>
              <button onClick={() => setSelectedRecipe(null)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />
              <div className="flex items-center space-x-4 mb-4 text-gray-600">
                <span><i className="fas fa-clock mr-1"></i>{selectedRecipe.time}</span>
                <span><i className="fas fa-utensils mr-1"></i>{selectedRecipe.servings}</span>
                <span><i className="fas fa-signal mr-1"></i>{selectedRecipe.difficulty}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-1">
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <ul className="space-y-2 list-disc list-inside text-sm">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-2">Instructions</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>


              {modalAssistantActive && (
                <div className="mt-6 flex items-center gap-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl animate-fade-in">
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full animate-ping bg-indigo-200 opacity-70"></div>
                    <div className="relative w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center z-10">
                      <i className="fas fa-robot text-indigo-600 text-2xl"></i>
                    </div>
                  </div>
                  <div className="text-sm text-gray-800 font-medium">
                    Let me walk you through <span className="font-semibold">{selectedRecipe.title}</span>!
                  </div>
                </div>
              )}



              <div className="flex justify-end space-x-3">
              <button
                onClick={() => handleCardVoiceStart(selectedRecipe.title, true)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                <i className="fas fa-volume-up mr-2"></i> Voice Assist
              </button>

                <button
                  onClick={() => toggleFavorite(selectedRecipe.title)}
                  className={`px-4 py-2 rounded-lg transition ${
                    isFavorite(selectedRecipe.title)
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <i className={`fas ${isFavorite(selectedRecipe.title) ? "fa-heart" : "fa-heart-circle-plus"} mr-2`}></i>
                  {isFavorite(selectedRecipe.title) ? "Favorited" : "Add to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div> // end of container
  );
}

