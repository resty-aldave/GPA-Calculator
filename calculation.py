
print("\nWelcome to GPA calculator!\n")

def get_gpa(sem_avg):
    if sem_avg >= 94.8: return 1.00
    if sem_avg >= 89.2: return 1.25
    if sem_avg >= 83.6: return 1.50
    if sem_avg >= 78.0: return 1.75
    if sem_avg >= 72.4: return 2.00
    if sem_avg >= 66.8: return 2.25
    if sem_avg >= 61.2: return 2.50
    if sem_avg >= 55.6: return 2.75
    if sem_avg >= 50.0: return 3.00
    return 4.00

Semester_GPAs = []
Semester_Number = 1

while True:
    print(f"\n--- Semester {Semester_Number} ---")
    print("Do you already have the average each periodical?\n")
    response = input("Type Y/N: ")

    Sem_Average = 0
    
    if response.upper() == "Y":
        P1_Average = float(input("\nInput your P1 average (use comma to separate): "))
        P2_Average = float(input("Input your P2 average (use comma to separate): "))
        P3_Average = float(input("Input your P3 average (use comma to separate): "))

        Sem_Average = (P1_Average + P2_Average + P3_Average) / 3

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
        
        print(f"\nP1 Average: {P1_Average:.2f}")
        print(f"P2 Average: {P2_Average:.2f}")
        print(f"P3 Average: {P3_Average:.2f}")

    else:
        print("\nInvalid Response! Please type Y or N.")
        continue # Restart loop for this semester input

    GPA = get_gpa(Sem_Average)
    Semester_GPAs.append(GPA)
    
    print(f"\nYour semester average is {Sem_Average:.2f} or {GPA:.2f}")
    
    # Ask for next semester
    add_next = input("\nDo you want to add another semester? (Y/N): ")
    if add_next.upper() == "Y":
        Semester_Number += 1
    else:
        break

# Calculate CGPA
if Semester_GPAs:
    CGPA = sum(Semester_GPAs) / len(Semester_GPAs)
    print(f"\n{'='*30}")
    print(f"Cumulative GPA (CGPA): {CGPA:.2f}")
    print(f"{'='*30}\n")
    
    if CGPA <= 3.0:
        if CGPA <= 1.5:
            print("Excellent Work! First Class Standing!")
        else:
            print("Good Standing! Passed!")
    else:
        print("Needs Improvement.")
