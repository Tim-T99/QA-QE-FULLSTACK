import bcrypt from "bcrypt";

// Create a function called verifyPassword
// ○ Purpose: This function will compare the user’s input password with the stored
// hashed password.
// ○ Input: User’s entered password, hashed password from the system.
// ○ Output: Returns true if the passwords match, otherwise returns false

function verifyPassword(inputPassword, storedHashedPassword){
    if (bcrypt.compare(inputPassword, storedHashedPassword)){
        return true
    }else{
        return false
    }
}

// Create a function called verifyMFA
// ● Purpose: This function will compare the MFA code entered by the user with the correct
// code stored in the system.
// ● Input: User’s entered MFA code, correct MFA code.
// ● Output: Returns true if the codes match, otherwise returns false

function verifyMFA(inputMfaCode, correctMfaCode){
    if(inputMfaCode == correctMfaCode){
        return true;
    }else{
        return false;
    }
}

// Create a function called checkBalance
// ● Purpose: This function will verify whether the user has sufficient balance in their account
// to proceed with the withdrawal.
// ● Input: The withdrawal amount, the user’s current balance.
// ● Output: Returns true if the balance is sufficient, otherwise returns false

function checkBalance(balance, withdrawalAmount){
    if(balance >= withdrawalAmount){
        return true
    }else{
        return false
    }
}

// Create a function called checkDailyLimit
// ● Purpose: This function will ensure that the withdrawal amount does not exceed the daily
// withdrawal limit.
// ● Input: The withdrawal amount, the daily transaction limit.
// ● Output: Returns true if the withdrawal is within the limit, otherwise returns false.

function checkDailyLimit(withdrawalAmount, dailyLimit){
    if(withdrawalAmount <= dailyLimit){
        return true
    }else{
        return false
    }
}

// Create a function called processWithdrawal
// ● Purpose: This is the main function that will process the withdrawal by checking all the
// conditions sequentially.
// ● Input: User’s entered password, MFA code, withdrawal amount, actual MFA code,
// user’s balance, daily limit, and stored password hash.
// ● Output: Returns success message if all conditions pass, otherwise returns an error
// message.

function processWithdrawal(user, inputPassword, inputMfaCode, balance, withdrawalAmount){
    if(verifyPassword(inputPassword, storedHashedPassword) == false){
        return "Transaction Failed: Incorrect password"
    }
    if(!verifyMFA(inputMfaCode, user.correctMfaCode)){
        return "Transaction Failed: MFA failed"
    }
    if(!checkBalance(user.balance, withdrawalAmount)){
        return "Transaction Failed: Insufficient balance"
    }
    if(!checkDailyLimit(withdrawalAmount, dailyLimit)){
        return "Transaction Failed: Amount exceeds daily limit."
    }
    user.balance -= withdrawalAmount
    return "Transaction Successful! New Balance; " + user.balance
}

// 1. Password Authentication:
// ○ Why is it important to store passwords in a hashed format? What security
// advantage does this provide over plain text passwords?

// Hashed password are encrypted hence they restrict unwarranted access without proper credentials.

// 2. Multi-Factor Authentication (MFA):
// ○ How does implementing MFA enhance the security of the transaction process?
// What types of attacks does it help prevent?

// MFA prevents DDOS and brute force attacks ensuring the resource is always available to intended users.

// 3. Balance Verification:
// ○ Why is it necessary to check the account balance before allowing a withdrawal?
// What risks are involved if this step is skipped?

// Checking the account balance before withdrawal ensures the funds being sought are available and prevents overdraws.

// 4. Daily Transaction Limit:
// ○ What purpose does the daily transaction limit serve? How does it help in
// preventing fraudulent or excessive withdrawals?

// Daily transaction limits are a security measure which help prevent theft for instance in the case of identity thefts.

// 5. Improvement:
// ○ If you were to add extra features, such as fraud detection (e.g., detecting
// abnormal withdrawal patterns), how would you go about doing this? What
// additional data would you track to detect fraud?

// Adding extra features would include employing Artificial Intelligence to monitor not only withdrawal patterns but also deposit patterns to prevent illegal activities such as money laundering.