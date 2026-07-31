package com.examportal.backend.config;

import com.examportal.backend.entity.Question;

import com.examportal.backend.repository.QuestionRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public void run(String... args) throws Exception {

        if (questionRepository.count() == 0) {

            List<Question> questions = new ArrayList<>();

            questions.add(Question.builder()
                    .questionTitle("What is the value of pi to two decimal places?")
                    .optionA("3.12").optionB("3.14").optionC("3.16").optionD("3.18")
                    .correctAnswer("B").subject("Mathematics").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Solve for x: 2x + 7 = 15.")
                    .optionA("3").optionB("4").optionC("5").optionD("6")
                    .correctAnswer("B").subject("Mathematics").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the derivative of x^2?")
                    .optionA("x").optionB("2").optionC("2x").optionD("x^3")
                    .correctAnswer("C").subject("Mathematics").difficultyLevel(Question.DifficultyLevel.MEDIUM)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the square root of 144?")
                    .optionA("10").optionB("11").optionC("12").optionD("13")
                    .correctAnswer("C").subject("Mathematics").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the sum of angles in a triangle?")
                    .optionA("90 degrees").optionB("180 degrees").optionC("270 degrees").optionD("360 degrees")
                    .correctAnswer("B").subject("Mathematics").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());

            questions.add(Question.builder()
                    .questionTitle("What is the chemical symbol for water?")
                    .optionA("H2O").optionB("CO2").optionC("NaCl").optionD("O2")
                    .correctAnswer("A").subject("Science").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Which planet is known as the Red Planet?")
                    .optionA("Earth").optionB("Mars").optionC("Jupiter").optionD("Saturn")
                    .correctAnswer("B").subject("Science").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the powerhouse of the cell?")
                    .optionA("Nucleus").optionB("Ribosome").optionC("Mitochondria").optionD("Lysosome")
                    .correctAnswer("C").subject("Science").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What gas do plants absorb during photosynthesis?")
                    .optionA("Oxygen").optionB("Nitrogen").optionC("Carbon Dioxide").optionD("Helium")
                    .correctAnswer("C").subject("Science").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the boiling point of water in Celsius?")
                    .optionA("90 C").optionB("100 C").optionC("110 C").optionD("120 C")
                    .correctAnswer("B").subject("Science").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());

            questions.add(Question.builder()
                    .questionTitle("Identify the noun in the sentence: 'The dog barked loudly.'")
                    .optionA("barked").optionB("loudly").optionC("dog").optionD("The")
                    .correctAnswer("C").subject("English").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is a synonym for 'Happy'?")
                    .optionA("Sad").optionB("Joyful").optionC("Angry").optionD("Tired")
                    .correctAnswer("B").subject("English").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Which of the following is a pronoun?")
                    .optionA("Run").optionB("Quickly").optionC("She").optionD("Blue")
                    .correctAnswer("C").subject("English").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the past tense of 'run'?")
                    .optionA("running").optionB("ran").optionC("runs").optionD("runned")
                    .correctAnswer("B").subject("English").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Which word is an adjective?")
                    .optionA("Eat").optionB("Soft").optionC("Slowly").optionD("Table")
                    .correctAnswer("B").subject("English").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());

            questions.add(Question.builder()
                    .questionTitle("Who was the first President of the United States?")
                    .optionA("Thomas Jefferson").optionB("Abraham Lincoln").optionC("George Washington").optionD("John Adams")
                    .correctAnswer("C").subject("History").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("In which year did World War II end?")
                    .optionA("1918").optionB("1939").optionC("1945").optionD("1950")
                    .correctAnswer("C").subject("History").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Who painted the Mona Lisa?")
                    .optionA("Vincent van Gogh").optionB("Leonardo da Vinci").optionC("Pablo Picasso").optionD("Michelangelo")
                    .correctAnswer("B").subject("History").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Which empire built the Colosseum in Rome?")
                    .optionA("Greek Empire").optionB("Roman Empire").optionC("Ottoman Empire").optionD("Persian Empire")
                    .correctAnswer("B").subject("History").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("The Titanic sank in which year?")
                    .optionA("1905").optionB("1912").optionC("1918").optionD("1925")
                    .correctAnswer("B").subject("History").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());

            questions.add(Question.builder()
                    .questionTitle("What does CPU stand for?")
                    .optionA("Computer Processing Unit").optionB("Central Processing Unit").optionC("Control Processing Unit").optionD("Core Processing Unit")
                    .correctAnswer("B").subject("Computer Science").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Which programming language is primarily used for Android App development?")
                    .optionA("Swift").optionB("Kotlin").optionC("Python").optionD("C#")
                    .correctAnswer("B").subject("Computer Science").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the binary representation of decimal number 5?")
                    .optionA("100").optionB("101").optionC("110").optionD("111")
                    .correctAnswer("B").subject("Computer Science").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Which of the following is NOT an operating system?")
                    .optionA("Windows").optionB("Linux").optionC("Chrome").optionD("Oracle")
                    .correctAnswer("D").subject("Computer Science").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the main function of an IP address?")
                    .optionA("Identify a user's name").optionB("Identify a device on a network").optionC("Store cache data").optionD("Encryption")
                    .correctAnswer("B").subject("Computer Science").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());

            questions.add(Question.builder()
                    .questionTitle("What is the value of acceleration due to gravity on Earth?")
                    .optionA("8.9 m/s^2").optionB("9.8 m/s^2").optionC("10.2 m/s^2").optionD("12.0 m/s^2")
                    .correctAnswer("B").subject("Physics").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the unit of electric resistance?")
                    .optionA("Ampere").optionB("Volt").optionC("Ohm").optionD("Watt")
                    .correctAnswer("C").subject("Physics").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Who formulated the three laws of motion?")
                    .optionA("Albert Einstein").optionB("Isaac Newton").optionC("Galileo Galilei").optionD("Nikola Tesla")
                    .correctAnswer("B").subject("Physics").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the speed of light in a vacuum?")
                    .optionA("150,000 km/s").optionB("300,000 km/s").optionC("450,000 km/s").optionD("600,000 km/s")
                    .correctAnswer("B").subject("Physics").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What state of matter has a definite volume but no definite shape?")
                    .optionA("Solid").optionB("Liquid").optionC("Gas").optionD("Plasma")
                    .correctAnswer("B").subject("Physics").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());

            questions.add(Question.builder()
                    .questionTitle("What is the pH of pure water?")
                    .optionA("5").optionB("6").optionC("7").optionD("8")
                    .correctAnswer("C").subject("Chemistry").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the lightest chemical element?")
                    .optionA("Helium").optionB("Hydrogen").optionC("Oxygen").optionD("Lithium")
                    .correctAnswer("B").subject("Chemistry").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Which gas is commonly known as laughing gas?")
                    .optionA("Nitrous oxide").optionB("Carbon monoxide").optionC("Sulfur dioxide").optionD("Nitrogen dioxide")
                    .correctAnswer("A").subject("Chemistry").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the chemical formula for table salt?")
                    .optionA("HCl").optionB("NaCl").optionC("NaOH").optionD("NaHCO3")
                    .correctAnswer("B").subject("Chemistry").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What type of bond involves sharing of electrons?")
                    .optionA("Ionic bond").optionB("Covalent bond").optionC("Hydrogen bond").optionD("Metallic bond")
                    .correctAnswer("B").subject("Chemistry").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());

            questions.add(Question.builder()
                    .questionTitle("What is the primary pigment used by plants to absorb light?")
                    .optionA("Carotenoid").optionB("Chlorophyll").optionC("Anthocyanin").optionD("Hemoglobin")
                    .correctAnswer("B").subject("Biology").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("How many bones are there in an adult human body?")
                    .optionA("106").optionB("206").optionC("306").optionD("406")
                    .correctAnswer("B").subject("Biology").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("Which blood type is known as the universal donor?")
                    .optionA("A+").optionB("B-").optionC("AB+").optionD("O-")
                    .correctAnswer("D").subject("Biology").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What organ is responsible for pumping blood through the body?")
                    .optionA("Lungs").optionB("Brain").optionC("Heart").optionD("Liver")
                    .correctAnswer("C").subject("Biology").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());
            questions.add(Question.builder()
                    .questionTitle("What is the main source of energy for most cell processes?")
                    .optionA("DNA").optionB("Glucose").optionC("ATP").optionD("Protein")
                    .correctAnswer("C").subject("Biology").difficultyLevel(Question.DifficultyLevel.EASY)
                    .build());

            questionRepository.saveAll(questions);
            System.out.println(">> [DataInitializer] Seeded 40 default questions across 8 subjects!");
        }
    }
}
