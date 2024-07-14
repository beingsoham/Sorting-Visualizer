#include <stdio.h>
#include <stdlib.h>

// Function prototypes
void menu();
void create_account();
void deposit_money();
void withdraw_money();
void check_balance();
void save_account();
void load_account();

char name[20];
int dip_amt, amt = 10000, acc_no;

int main() {
    int choice;
    
    // Load existing account or create new account
    load_account();
    
    menu();
    printf("Enter your choice: ");
    scanf("%d", &choice);

    switch (choice) {
        case 1:
            deposit_money();
            break;
        case 2:
            withdraw_money();
            break;
        case 3:
            check_balance();
            break;
        case 4:
            save_account();
            exit(0);
        default:
            printf("Invalid choice\n");
            break;
    }

    return 0;
}

void menu() {
    printf("MAIN MENU\n");
    printf("1. Deposit Money\n");
    printf("2. Withdraw Money\n");
    printf("3. Check Bank Balance\n");
    printf("4. Save and Exit\n");
}

void deposit_money() {
    printf("DEPOSITING MONEY\n");
    printf("Enter the amount to be deposited: ");
    scanf("%d", &dip_amt);
    amt = amt + dip_amt;
    printf("Amount deposited successfully\n");
    printf("Your current balance is: %d\n", amt);
}

void withdraw_money() {
    printf("WITHDRAWING MONEY\n");
    printf("Enter the amount to be withdrawn: ");
    scanf("%d", &dip_amt);
    if (dip_amt > amt) {
        printf("Insufficient balance\n");
    } else {
        amt = amt - dip_amt;
        printf("Amount withdrawn successfully\n");
        printf("Your current balance is: %d\n", amt);
    }
}

void check_balance() {
    printf("CHECKING BANK BALANCE\n");
    printf("Your current balance is: %d\n", amt);
}

void save_account() {
    FILE *file;
    file = fopen("account.txt", "w");
    if (file == NULL) {
        printf("Error opening file\n");
        exit(1);
    }
    fprintf(file, "%s\n%d\n%d\n", name, acc_no, amt);
    fclose(file);
    printf("Account details saved successfully\n");
}

void load_account() {
    FILE *file;
    file = fopen("account.txt", "r");
    if (file == NULL) {
        printf("No existing account found. Creating new account.\n");
        create_account();
    } else {
        fscanf(file, "%s%d%d", name, &acc_no, &amt);
        fclose(file);
        printf("Account loaded successfully\n");
    }
}

void create_account() {
    

    printf("Enter your name: ");
    scanf("%s", name);
    printf("Enter your account no.: ");
    scanf("%d", &acc_no);
    printf("Enter initial deposit amount: ");
    scanf("%d", &amt);
    printf("Account created successfully\n");
}

