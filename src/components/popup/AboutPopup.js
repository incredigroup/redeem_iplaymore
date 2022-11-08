import { useContext } from "react";
import { context } from "@/src/hooks/context";
import Modal from "./Modal";

const AboutPopup = ({ open, close, aboutData }) => {
  const colorContext = useContext(context);
  const navContext = useContext(context);
  const { nav, changeNav } = navContext;
  const { color } = colorContext;

  const handleSignup = () => {
    changeNav("register");
    close();
  };

  return (
    <Modal open={open} close={close}>
      <div className="about_popup_details">
        <div className="right">
          <div className="right_inner">
            <div className="biography">
              <div className="about_title">
                <h3>
                  <span>
                    What is THUNDER!©?
                  </span>
                </h3>
              </div>
              <div className="text">
                <p>
                  Have you ever longed to play a match-based team FPS hero shooter where you can take a third-person RPG break by exploring a massive open world full of quests, stories, and rich lore? One where you can actually make money by buying, renting, and selling unique game gear? That&apos;s the dream that drove us to make THUNDER!© for you.
                </p>
                <br />
                  <p>
                    Our game first emerged in 2005 when IMU Studios began development on a project called ‘Prince of THUNDER’. This first foray into the games market eventually became dormant after the 2008 economic crisis hit. Yet, while touring live gaming events our compelling concepts inspired people and influenced fresh designs, keeping our game alive. Currently, gaming technology continues to reach even greater heights and THUNDER!© has become better than ever.
                  </p>
                <br />
                <p>
                  Our work reflects the love we have of fast-paced action, original game design, and true player freedom. From conception through the ever-expanding lore, our character-driven multiplayer gameplay is designed to provide players with endless ways to engage with the open world we have created. With 16 unique characters to choose from, our core gameplay loop revolves around a streamlined combat system as players drop into any of our 14 outdoor arenas to control territory. While battling, players can utilize a combination of our 9 combat devices and 16 elemental-powered scepters to dominate their foes. 
                </p>
                <br />
                <p>
                   One of our goals is to connect you to valuable Game Gear. No other game has this depth and variety.
                </p>
                <p>
                  Throne Wars = Outdoor arenas
                  Bonfire Stories = Immersive in-game experience
                  Quests = Learn by exploring  
                  Recipes = Collect raw ingredients and craft valuables
                  Marketplace = Sell your items as they increase in rarity and value
                </p>
                <br /> <p>
Players can fly freely with their own unique set of wings for each character, which can be upgraded as higher levels are achieved. Players can dive into the depths of the oceans, cross vast wilderness, and even visit unexplored islands. We’ve spent years developing our gameplay model to provide an experience that&apos;s fair and fun for players of every skill level.
</p>  
                <br />

                <p>
By including Game Gear that increases its value to players in real life, THUNDER!© stands out from other games by pioneering our proprietary ‘better than free-to-play’ gameplay model. Here’s how it works: the owner’s digital gear resides in the common marketplace, allowing other players to rent, use, and level up the Game Gear owned while you are offline. This enables players to make money by increasing your item’s value as it levels up. A design that balances competitiveness with growing collaboration. A whole new world of possibilities, specifically designed to have gamers as the heartbeat and the lifeblood, to become the most valuable assets of our community.

</p>
                <br />
                <p>
One company, one dream, one goal: making games that are all in, for you! 
</p>
                <br />

          <div className="edrea_tm_button"> 
            <a href='#register' className="a" style={{width:'50%', marginTop: '20px'}} onClick={handleSignup}>Sign Up Play Early!</a>
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default AboutPopup;
