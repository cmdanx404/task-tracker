import turtle
import time

# Global variables
score_a = 0
score_b = 0
max_score = 32
rally_hits = 0
pause_a_used = False
pause_b_used = False
paused = False
start_time = 0
timer_pen = turtle.Turtle()

# Screen setup
win = turtle.Screen()
win.title("Pong by Daniel Madjus")
win.bgcolor("black")
win.setup(width=800, height=600)
win.tracer(0)

# Game objects
paddle_a = turtle.Turtle()
paddle_b = turtle.Turtle()
ball = turtle.Turtle()
pen = turtle.Turtle()
menu_text = turtle.Turtle()

# Scoreboard setup
def setup_pen():
    pen.speed(0)
    pen.color("white")
    pen.penup()
    pen.hideturtle()
    pen.goto(0, 260)
    pen.clear()
    pen.write("Player A: 0  Player B: 0", align="center", font=("Courier", 24, "normal"))

def setup_timer_pen():
    timer_pen.speed(0)
    timer_pen.color("orange")
    timer_pen.penup()
    timer_pen.hideturtle()
    timer_pen.goto(0, 230)

def update_timer():
    if not paused:
        elapsed = int(time.time() - start_time)
        mins = elapsed // 60
        secs = elapsed % 60
        timer_pen.clear()
        timer_pen.write(f"Time: {mins:02d}:{secs:02d}", align="center", font=("Courier", 16, "normal"))

def setup_game_objects():
    paddle_a.speed(0)
    paddle_a.shape("square")
    paddle_a.color("cyan")
    paddle_a.shapesize(stretch_wid=6, stretch_len=1)
    paddle_a.penup()
    paddle_a.goto(-350, 0)

    paddle_b.speed(0)
    paddle_b.shape("square")
    paddle_b.color("magenta")
    paddle_b.shapesize(stretch_wid=6, stretch_len=1)
    paddle_b.penup()
    paddle_b.goto(350, 0)

    ball.speed(0)
    ball.shape("circle")
    ball.color("white")
    ball.penup()
    ball.goto(0, 0)
    ball.dx = 2
    ball.dy = 2


# Paddle movement
def paddle_a_up(): paddle_a.sety(min(250, paddle_a.ycor() + 20))
def paddle_a_down(): paddle_a.sety(max(-240, paddle_a.ycor() - 20))
def paddle_b_up(): paddle_b.sety(min(250, paddle_b.ycor() + 20))
def paddle_b_down(): paddle_b.sety(max(-240, paddle_b.ycor() - 20))

def bind_keys():
    win.listen()
    win.onkeypress(paddle_a_up, "w")
    win.onkeypress(paddle_a_down, "s")
    win.onkeypress(paddle_b_up, "Up")
    win.onkeypress(paddle_b_down, "Down")
    win.onkeypress(pause_by_a, "p")
    win.onkeypress(pause_by_b, "l")

def update_score():
    pen.clear()
    pen.write(f"Player A: {score_a}  Player B: {score_b}", align="center", font=("Courier", 24, "normal"))

def reset_ball():
    ball.goto(0, 0)
    ball.dx = -2 if ball.dx < 0 else 2
    ball.dy = -2 if ball.dy < 0 else 2

def show_start_menu():
    menu_text.clear()
    menu_text.speed(0)
    menu_text.color("white")
    menu_text.penup()
    menu_text.hideturtle()
    menu_text.goto(0, 50)
    menu_text.write("Classic Pong", align="center", font=("Courier", 36, "bold"))
    menu_text.goto(0, -20)
    menu_text.write("Press SPACE to Start", align="center", font=("Courier", 24, "normal"))
    win.listen()
    win.onkeypress(start_game, "space")

def show_serve_menu():
    menu_text.clear()
    menu_text.goto(0, 0)
    menu_text.write("Press SPACE to Serve", align="center", font=("Courier", 20, "normal"))
    win.listen()
    win.onkeypress(serve_ball, "space")

def show_game_over():
    pen.clear()
    message = "Player A Wins!" if score_a == max_score else "Player B Wins!"
    pen.goto(0, 0)
    pen.write(message, align="center", font=("Courier", 30, "bold"))
    pen.goto(0, -40)
    pen.write("Press SPACE to Play Again or ESC to Exit", align="center", font=("Courier", 18, "normal"))
    win.listen()
    win.onkeypress(start_game, "space")
    win.onkeypress(lambda: win.bye(), "Escape")

def serve_ball():
    global paused
    menu_text.clear()
    paused = False
    play_round()

def pause_by_a():
    global paused, pause_a_used
    if not paused and not pause_a_used:
        paused = True
        pause_a_used = True
        show_pause_message("Player A paused the game")

def pause_by_b():
    global paused, pause_b_used
    if not paused and not pause_b_used:
        paused = True
        pause_b_used = True
        show_pause_message("Player B paused the game")

def show_pause_message(message):
    menu_text.clear()
    menu_text.goto(0, 0)
    menu_text.write(f"{message}\nPress SPACE to Resume", align="center", font=("Courier", 18, "normal"))
    win.onkeypress(resume_game, "space")

def resume_game():
    global paused
    paused = False
    menu_text.clear()

def play_round():
    global rally_hits, score_a, score_b
    rally_hits = 0
    reset_ball()

    while True:
        win.update()
        time.sleep(0.01)
        update_timer()

        if paused:
            continue

        ball.setx(ball.xcor() + ball.dx)
        ball.sety(ball.ycor() + ball.dy)

        if ball.ycor() > 290:
            ball.sety(290)
            ball.dy *= -1
        if ball.ycor() < -290:
            ball.sety(-290)
            ball.dy *= -1

        if ball.xcor() > 390:
            score_a += 1
            update_score()
            break

        if ball.xcor() < -390:
            score_b += 1
            update_score()
            break

        if (340 < ball.xcor() < 350) and (paddle_b.ycor() - 50 < ball.ycor() < paddle_b.ycor() + 50):
            ball.setx(340)
            ball.dx *= -1
            rally_hits += 1

        if (-350 < ball.xcor() < -340) and (paddle_a.ycor() - 50 < ball.ycor() < paddle_a.ycor() + 50):
            ball.setx(-340)
            ball.dx *= -1
            rally_hits += 1

        if rally_hits >= 2:
            ball.dx *= 1.03
            ball.dy *= 1.03
            rally_hits = 0

    if score_a == max_score or score_b == max_score:
        show_game_over()
    else:
        show_serve_menu()

def start_game():
    global score_a, score_b, pause_a_used, pause_b_used, start_time, paused
    score_a = 0
    score_b = 0
    pause_a_used = False
    pause_b_used = False
    paused = False
    menu_text.clear()
    setup_game_objects()
    setup_pen()
    setup_timer_pen()
    bind_keys()
    update_score()
    start_time = time.time()
    show_serve_menu()

# Run the game
show_start_menu()
win.mainloop()
