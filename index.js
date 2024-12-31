$("document").ready(function(){
    startSnakeGame()
})

const startSnakeGame = () => {
    const mainWrapper = $(".wrapper");
    const wrapperWidth = mainWrapper.width();
    const wrapperHeight = mainWrapper.height();

    let snakeInterval = 0;
    let moveDistance = 20; // Distance the snake moves per step
    let snake = [{ left: 0, top: 0 }]; // Snake's body segments, initially 1 segment
    let direction = "right"; // Initial direction
    let foodPosition = { left: 0, top: 0 };

    // Generate random position for food
    const generateFoodPosition = () => {
        foodPosition.left = Math.floor(Math.random() * (wrapperWidth / moveDistance)) * moveDistance;
        foodPosition.top = Math.floor(Math.random() * (wrapperHeight / moveDistance)) * moveDistance;
        $(".food").css("left", `${foodPosition.left}px`);
        $(".food").css("top", `${foodPosition.top}px`);
    };

    // Check if the snake has collided with itself or walls
    const hasCollision = (newHead) => {
        // Check wall collision
        if (newHead.left < 0 || newHead.left >= wrapperWidth || newHead.top < 0 || newHead.top >= wrapperHeight) {
            return true;
        }
        // Check self-collision
        for (let i = 0; i < snake.length; i++) {
            if (newHead.left === snake[i].left && newHead.top === snake[i].top) {
                return true;
            }
        }
        return false;
    };

    // Move the snake and check for collisions and food
    const moveSnake = () => {
        // Calculate new head position based on current direction
        const head = { ...snake[0] };
        if (direction === "right") head.left += moveDistance;
        else if (direction === "left") head.left -= moveDistance;
        else if (direction === "up") head.top -= moveDistance;
        else if (direction === "down") head.top += moveDistance;

        
        // Check for collisions
        if (hasCollision(head)) {
            clearInterval(snakeInterval);
            alert("Game over! Snake collided.");
            return;
        }

        // Add the new head to the front of the snake
        snake.unshift(head);
        console.log(head, moveDistance);

        // Check if the snake eats the food
        if (head.left === foodPosition.left && head.top === foodPosition.top) {
            generateFoodPosition(); // Generate new food
        } else {
            snake.pop(); // Remove the tail (if not eating food)
        }

        // Render the snake on the screen
        renderSnake();
    };

    // Render the snake
    const renderSnake = () => {
        $(".snake").remove(); // Remove all snake segments from DOM
        snake.forEach(segment => {
            const snakeSegment = $("<div>").addClass("snake");
            $(snakeSegment).css("left", `${segment.left}px`);
            $(snakeSegment).css("top", `${segment.top}px`);
            $(".wrapper").append(snakeSegment);
        });
    };

    // Start the game with food generation and movement
    generateFoodPosition();
    snakeInterval = setInterval(moveSnake, 200);

    // Listen for arrow key presses to change direction
    $(document).on("keydown", (e) => {
        if (e.key === "ArrowRight" && direction !== "left") {
            direction = "right";
        } else if (e.key === "ArrowLeft" && direction !== "right") {
            direction = "left";
        } else if (e.key === "ArrowUp" && direction !== "down") {
            direction = "up";
        } else if (e.key === "ArrowDown" && direction !== "up") {
            direction = "down";
        }
    });
};

// Attach the start game function to the button
$("#startBtn").on("click", startSnakeGame);
