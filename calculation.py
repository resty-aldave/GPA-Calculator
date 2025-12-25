P1_Grades = []
P2_Grades = []
P3_Grades = []

print("\nWelcome to GPA calculator!\n")
print("Do you already have the average each periodical?\n")
response = input("Type Y/N: ")

while True:
    if response.upper() == "Y":
        P1_Average = float(input("\nInput your P1 average (use comma to separate): "))
        P2_Average = float(input("Input your P2 average (use comma to separate): "))
        P3_Average = float(input("Input your P3 average (use comma to separate): "))

        Sem_Average = (P1_Average + P2_Average + P3_Average) / 3

        if Sem_Average >= 94.8:
            GPA = 1.00
        elif Sem_Average >= 89.2:
            GPA = 1.25
        elif Sem_Average >= 83.6:
            GPA = 1.50
        elif Sem_Average >= 78.0:
            GPA = 1.75
        elif Sem_Average >= 72.4:
            GPA = 2.00
        elif Sem_Average >= 66.8:
            GPA = 2.25
        elif Sem_Average >= 61.2:
            GPA = 2.50
        elif Sem_Average >= 55.6:
            GPA = 2.75
        elif Sem_Average >= 50.0:
            GPA = 3.00
        else:
            GPA = 4.00

        print(f"\nYour semester average is {Sem_Average:.2f} or {GPA:.2f}\n")
        break

    elif response.upper() == "N":

        P1 = input("\nInput all your P1 grades (use comma to separate): ")
        P2 = input("Input all your P2 grades (use comma to separate): ")
        P3 = input("Input all your P3 grades (use comma to separate): ")

        P1_Grades = [float(x) for x in P1.split(",") if float(x) != 0]
        P2_Grades = [float(x) for x in P2.split(",") if float(x) != 0]
        P3_Grades = [float(x) for x in P3.split(",") if float(x) != 0]

        P1_Average = sum(P1_Grades) / len(P1_Grades)
        P2_Average = sum(P2_Grades) / len(P2_Grades)
        P3_Average = sum(P3_Grades) / len(P3_Grades)

        Sem_Average = (P1_Average + P2_Average + P3_Average) / 3

        if Sem_Average >= 94.8:
            GPA = 1.00
        elif Sem_Average >= 89.2:
            GPA = 1.25
        elif Sem_Average >= 83.6:
            GPA = 1.50
        elif Sem_Average >= 78.0:
            GPA = 1.75
        elif Sem_Average >= 72.4:
            GPA = 2.00
        elif Sem_Average >= 66.8:
            GPA = 2.25
        elif Sem_Average >= 61.2:
            GPA = 2.50
        elif Sem_Average >= 55.6:
            GPA = 2.75
        elif Sem_Average >= 50.0:
            GPA = 3.00
        else:
            GPA = 4.00

        print(f"\nP1 Average: {P1_Average:.2f}")
        print(f"P2 Average: {P2_Average:.2f}")
        print(f"P3 Average: {P3_Average:.2f}")
        print(f"\nYour semester average is {Sem_Average:.2f} or {GPA:.2f}\n")
        break

    else:
        print("\nInvalid Response! Please type Y or N.")
        response = input("\nType Y/N: ")
